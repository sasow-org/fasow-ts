import {DataGrid, GridColDef, GridRenderCellParams, useGridApiContext} from "@mui/x-data-grid";
import {AgentReducerTypes} from "../../context/reducer/types/AgentReducerTypes";
import {Button, Grid, Slider, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAgentConfigContext} from "../../context/AgentConfigProvider";
import {useState} from "react";

export default function DataGridActions() {
    //Load the context
    const {agentConfig, agentDispatch} = useAgentConfigContext();

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

    //const [rows, setRows] = useState(agentConfig.actions);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={agentConfig.actions}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{newEditingApi: true}}
            />
        </div>
    );
}