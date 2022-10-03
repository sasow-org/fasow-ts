import {Button, Grid, MenuItem, Slider, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ChangeEvent, useState} from "react";
import {
    DataGrid,
    GridColDef,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAgentConfigContext} from "../../context/AgentConfigProvider";
import {AgentReducerTypes} from "../../context/reducer/types/AgentReducerTypes";
import {handlePercentageValueRange} from "../../helper-functions/helper-funcs";

//Initialize actions array //TODO FIX THIS HARDCODING
const actionsArray = ['read', "share"];

export default function ActionsPanel(){

    //Load the context
    const {agentConfig, agentDispatch} = useAgentConfigContext();

    //Initialize state to select action Input
    const [selectedAction, setSelectedAction] = useState("read")
    //Handle change on select action
    const handleChangeSelectAction = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedAction(event.target.value);
    }

    //Return an action by the selected action value //todo check this other hardcoding ....
    const getAction = (i) => {
        if(selectedAction === "read"){
            return {id: i, actionName: "read", actionProbability: 0, actionType: "ActionRead"}
        }else{
            return {id: i, actionName: "share", actionProbability: 0, actionType: "ActionShare"}
        }
    }

    //Handle the event of click on add action button, and obviously add the action to the rows.
    const onClickAddAction = () => {
        agentDispatch({
            type: AgentReducerTypes.addAction,
            payload: getAction(agentConfig.actions.length)
        })
    }

    //Columns structure and functionality
    const columns: GridColDef[] = [
        {
            field: 'actionName',
            headerName: 'Action Name',
            width: 150,
        },
        {
            field: 'actionProbability',
            headerName: 'Action Probability (%)',
            width: 300,
            editable: true,
            renderCell: (cellParam) => {
                let actionAux = agentConfig.actions.filter(config => config.id === cellParam.row.id)[0];
                return actionAux.actionProbability;
            },
            renderEditCell: (cellParam) => {
                let actionAux = agentConfig.actions.filter(config => config.id === cellParam.row.id)[0];

                //Handle slider changes
                const sliderHandleChangeActionProbability = (event: Event, auxValue: number | number[]) => {
                    const newValue : number = handlePercentageValueRange(auxValue);//Evalua si el valor esta en un rango aceptable (es un %)
                    actionAux.actionProbability = newValue;
                    agentDispatch({
                        type: AgentReducerTypes.updateAction,
                        index: cellParam.row.id,
                        payload: actionAux
                    })
                }
                //Handle +-1 changes
                const handleChangeActionProbability = (e) => {
                    const newValue : number = handlePercentageValueRange(parseFloat(e.target.value));
                    actionAux.actionProbability = newValue;
                    agentDispatch({
                        type: AgentReducerTypes.updateAction,
                        index: cellParam.row.id,
                        payload: actionAux
                    })
                }

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Slider
                                value={actionAux.actionProbability}
                                onChange={sliderHandleChangeActionProbability}
                                step={0.0001}
                                min={0}
                                max={100}
                                sx={{
                                    marginLeft: '5px'
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                required
                                value={actionAux.actionProbability}
                                variant={"outlined"}
                                onChange={handleChangeActionProbability}
                                type={"number"}
                            />
                        </Grid>
                    </Grid>
                );
            },
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 80,
            renderCell: (cellParam) => {
                const handleDelete = () => {
                    agentDispatch({
                        type: AgentReducerTypes.deleteAction,
                        value: cellParam.row.id
                    })
                }

                return (
                    <Button onClick={handleDelete}>
                        <DeleteIcon/>
                    </Button>
                );
            },
        },
    ];
    return(
        <Grid container spacing={1} sx={{margin: "5px"}}>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    select
                    label="Action"
                    value={selectedAction}
                    onChange={handleChangeSelectAction}
                >
                    {actionsArray.map((option, i) => (
                        <MenuItem key={i} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={onClickAddAction} variant="contained">
                    <AddIcon/>
                </Button>
            </Grid>
            <Grid item xs={12}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={agentConfig.actions}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Grid>
        </Grid>
    );
}