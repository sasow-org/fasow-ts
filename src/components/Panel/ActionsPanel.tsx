import {Button, Grid, MenuItem, Slider, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {useContext, useState} from "react";
import {agentConfigContext} from "../Modals/ModalNewAgentConfig";
import {DataGrid, GridCellEditStopParams, GridCellEditStopReasons, GridColDef, MuiEvent} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActionsPanel(agentConfig2){
    //console.log("Agent Config on actions panel: ", agentConfig);

    const agentConfig = useContext(agentConfigContext)
    const actionsArray = ['read', "share"];
    const [selectedAction, setSelectedAction] = useState("read")

    const handleChangeSelectAction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAction(event.target.value);
    }

    //Return a copy of the param array
    const arrayCopier = (array) => {
        let newArray = []
        array.forEach( (e,i) => {
            newArray.push(
                {
                    id: i,
                    actionName: e.actionName,
                    actionProbability: e.actionProbability,
                    actionType: e.actionType
                }
            )
        })

        return newArray;
    }
    //Return an action by the selected action value
    const getAction = (i) => {
        //todo check this other hardcoding ....
        if(selectedAction === "read"){
            return {id: i, actionName: "read", actionProbability: 0, actionType: "ActionRead"}
        }else{
            return {id: i, actionName: "share", actionProbability: 0, actionType: "ActionShare"}
        }

    }
    //Handle the event of click on add action button, and obviusly add the action to the rows.
    const onClickAddAction = () => {
        const copyOfActions = arrayCopier(agentConfig.actions)
        copyOfActions.push(getAction(copyOfActions.length))
        agentConfig.actions = copyOfActions;
        setRows(agentConfig.actions)
    }

    console.log("On Actions Panel : ", agentConfig)

    const [rows, setRows] = useState(agentConfig.actions)

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
            renderEditCell: (cellParam) => {

                const evaluateValue = (newValue) => {
                    if(newValue < 0.001 && newValue > 0 ){
                        return 0.001;
                    }else if(newValue > 100){
                        return 100;
                    }
                    return newValue;
                }

                const sliderHandleChangeActionProbability = (event: Event, auxValue: number | number[]) => {
                    console.log("On Slider Handler, event --> ", event)
                    console.log("On Slider Handler, auxValue --> ", auxValue)
                    console.log("In Same Position, Cell Params --> ", cellParam)
                    const newValue : number = evaluateValue(auxValue);
                    const copyOfActions = arrayCopier(agentConfig.actions)
                    copyOfActions[cellParam.row.id].actionProbability = newValue;
                    agentConfig.actions = copyOfActions;
                    setRows(agentConfig.actions)
                    cellParam.row.actionProbability = newValue;
                }

                const handleChangeActionProbability = (e) => {
                    let newValue : number = evaluateValue(parseFloat(e.target.value));
                    const copyOfActions = arrayCopier(agentConfig.actions)
                    copyOfActions[cellParam.row.id].actionProbability = newValue;
                    agentConfig.actions = copyOfActions;
                    setRows(agentConfig.actions)
                    cellParam.row.actionProbability = newValue;
                }

                return (
                    <Grid container spacing={1}>
                        <Grid item xs={7}>
                            <Slider
                                value={cellParam.row.actionProbability}
                                onChange={sliderHandleChangeActionProbability}
                                step={0.0001}
                                min={0}
                                max={100}
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
            },
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 80,
            renderCell: (cellParam) => {
                //console.log("CellParam --> ", cellParam.row.id);

                const handleDelete = (event) => {
                    const copyOfActions = arrayCopier(agentConfig.actions)
                    copyOfActions.splice(cellParam.row.id,1)
                    agentConfig.actions = copyOfActions;
                    setRows(agentConfig.actions)
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
        <Grid container spacing={1}>
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
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Grid>
        </Grid>
    );
}