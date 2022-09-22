import {Button, Grid, MenuItem, Slider, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {ChangeEvent, useState} from "react";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    useGridApiContext
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAgentConfigContext} from "../../context/AgentConfigProvider";
import {AgentReducerTypes} from "../../context/reducer/types/AgentReducerTypes";
import DataGridActions from "../DataGrid/DataGridActions";

//Initialice actions array //TODO FIX THIS HARDCODING
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

    //Handle the event of click on add action button, and obviusly add the action to the rows.
    const onClickAddAction = () => {
        agentDispatch({
            type: AgentReducerTypes.addAction,
            payload: getAction(agentConfig.actions.length)
        })
    }

    const [rows, setRows] = useState(agentConfig.actions);
    //Handle visualization and edit actionProbability
    const ActionProbabilityEditor = (cellParam: GridRenderCellParams) => {
        const apiRef = useGridApiContext();
        const {id, value, field} = cellParam

        //Handle new Probability Value
        const evaluateValue = (newValue) => {
            if(newValue < 0.001 && newValue > 0 ){
                return 0.001;
            }else if(newValue > 100){
                return 100;
            }
            return newValue;
        }

        //Handle slider changes
        const sliderHandleChangeActionProbability = (event: Event, auxValue: number | number[]) => {
            const newValue : number = evaluateValue(auxValue);//Evalua si el valor esta en un rango aceptable (es un %)
            apiRef.current.setEditCellValue({id, field, value: newValue})
        }
        //Handle +-1 changes
        const handleChangeActionProbability = (e) => {
            const newValue : number = evaluateValue(parseFloat(e.target.value));
            apiRef.current.setEditCellValue({id, field, value: newValue})
            agentDispatch({
                type: AgentReducerTypes.updateActionProbability,
                index: cellParam.row.id,
                value: cellParam.value
            })
        }

        return (
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Slider
                        value={cellParam.row.actionProbability}
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
                        value={cellParam.row.actionProbability}
                        variant={"outlined"}
                        onChange={handleChangeActionProbability}
                        type={"number"}
                    />
                </Grid>
            </Grid>
        );
    }

    //Call the ActionProbabilityEditor.
    const renderEditActionProbability: GridColDef['renderCell'] = (params) => {
        return <ActionProbabilityEditor {...params} />;
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
            renderEditCell: renderEditActionProbability,
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
                        experimentalFeatures={{newEditingApi: true}}
                    />
                </div>
            </Grid>
        </Grid>
    );
}