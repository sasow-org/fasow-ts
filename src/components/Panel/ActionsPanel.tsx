import {Button, Grid, MenuItem, Slider, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import {useContext, useState} from "react";
import {agentConfigContext} from "../Modals/ModalNewAgentConfig";
import {
    DataGrid,
    GridCellEditStopParams,
    GridCellEditStopReasons,
    GridColDef, GridRenderCellParams,
    GridValueSetterParams,
    MuiEvent, useGridApiContext
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActionsPanel(agentConfig2){
    //Load the context
    const agentConfig = useContext(agentConfigContext)

    //Initialice actions array
    const actionsArray = ['read', "share"];

    //Initialize state to select action Input
    const [selectedAction, setSelectedAction] = useState("read")
    //Handle change on select action
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
    //todo check this other hardcoding ....
    const getAction = (i) => {

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
            //console.log("On Slider Handler, event -->  \n", event)
            //console.log("On Slider Handler, auxValue --> \n", auxValue)
            //console.log("In Same Position, Cell Params --> \n", cellParam)
            const newValue : number = evaluateValue(auxValue);//Evalua si el valor esta en un rango aceptable (es un %)
            apiRef.current.setEditCellValue({id, field, value: newValue})
            const copyOfActions = arrayCopier(agentConfig.actions)//Copia la lista de acciones del agentConfig
            copyOfActions[cellParam.row.id].actionProbability = newValue;//Actualiza el nuevo valor para el arreglo copiado de acciones
            agentConfig.actions = copyOfActions; //la lista de acciones del agent config ahora es la copia que generaste antes
        }
        //Handle +-1 changes
        const handleChangeActionProbability = (e) => {
            let newValue : number = evaluateValue(parseFloat(e.target.value));
            apiRef.current.setEditCellValue({id, field, value: newValue})
            const copyOfActions = arrayCopier(agentConfig.actions)//Copia la lista de acciones del agentConfig
            copyOfActions[cellParam.row.id].actionProbability = newValue;//Actualiza el nuevo valor para el arreglo copiado de acciones
            agentConfig.actions = copyOfActions; //la lista de acciones del agent config ahora es la copia que generaste antes
        }

        return (
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <Slider
                        value={value}
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
                        value={value}
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

    //Sett the actions to
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
            renderEditCell: renderEditActionProbability,
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
                        rows={rows}
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