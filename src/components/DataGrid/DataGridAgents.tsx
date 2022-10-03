import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Button, Grid, Slider, Switch, TextField} from "@mui/material";
import ModalEditAgentConfig from "../Modals/ModalEditAgentConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import {useExperimentConfigContext} from "../../context/ExperimentConfigProvider";
import {ExperimentReducerTypes} from "../../context/reducer/types/ExperimentReducerTypes";
import {handlePercentageValueRange} from "../../helper-functions/helper-funcs";


export default function DataGridAgents() {
    const {experimentConfig, experimentDispatch} = useExperimentConfigContext()

    const updateSeedSize = () => {
        //todo: read all the agentConfigs array, calculate the new value to seedSize, set the new seed size
        let newSeedSize : number = 0;
        console.log("experimentConfig.networkSize: ", experimentConfig.networkSize)
        experimentConfig.agentsConfigs.forEach((ac) => {
            if(ac.isSeed){
                newSeedSize+=ac.percentageAgent*experimentConfig.networkSize/100;
            }
        })
        experimentDispatch({
            type: ExperimentReducerTypes.setSeedSize,
            value: newSeedSize
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'configName',
            headerName: 'Config Name',
            minWidth: 130,
        },
        {
            field: 'percentageAgent',
            headerName: 'Percentage Agent (%)',
            width: 250,
            editable:true,
            renderCell: (cellParam) => {
                let agentAux = experimentConfig.agentsConfigs.filter(config => config.id === cellParam.row.id)[0];
                return agentAux.percentageAgent;
            },
            renderEditCell: (cellParam) => {
                let agentAux = experimentConfig.agentsConfigs.filter(config => config.id === cellParam.row.id)[0];
                //Handle slider changes
                const sliderHandleChangePercentageConfig = (event: Event, auxValue: number | number[]) => {
                    const newValue : number = handlePercentageValueRange(auxValue);
                    agentAux.percentageAgent = newValue;
                    experimentDispatch({
                        type: ExperimentReducerTypes.updateAgentConfig,
                        index: cellParam.row.id,
                        payload: agentAux
                    })
                }
                //Handle +-1 changes
                const handleChangeActionProbability = (e) => {
                    const newValue : number = handlePercentageValueRange(parseFloat(e.target.value));
                    agentAux.percentageAgent = newValue;
                    experimentDispatch({
                        type: ExperimentReducerTypes.updateAgentConfig,
                        index: cellParam.row.id,
                        payload: agentAux
                    })
                }

                return (
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Slider
                                value={agentAux.percentageAgent}
                                onChange={sliderHandleChangePercentageConfig}
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
                                value={agentAux.percentageAgent}
                                variant={"outlined"}
                                onChange={handleChangeActionProbability}
                                type={"number"}
                            />
                        </Grid>
                    </Grid>
                );
            }
        },
        {
            field: 'isSeed',
            headerName: 'isSeed',
            width: 70,
            renderCell: (cellParam) => {
                let agentAux = experimentConfig.agentsConfigs.filter(config => config.id === cellParam.row.id)[0];
                const handleSeedAgent = (event: React.ChangeEvent<HTMLInputElement>) => {
                    /*
                    GET AGENT CONFIG BY ID
                    UPDATE IS SEED STATE
                    SET THE NEW AGENT WITH CHANGES IN THE SAME POSITION TO REMPLACE THEM
                     */
                    console.log("AGENT CONFIGS: ", experimentConfig.agentsConfigs)
                    agentAux.isSeed = event.target.checked;
                    console.log("Agent By id: ", agentAux)
                    experimentDispatch({
                        type: ExperimentReducerTypes.updateAgentConfig,
                        id: cellParam.row.id,
                        payload: agentAux
                    })
                    updateSeedSize();
                }

                return (
                    <Switch checked={agentAux.isSeed}  onChange={handleSeedAgent}/>
                );
            },
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 80,
            renderCell: (cellParam) => {
                const agentConfigIndex = cellParam.row.id;
                return(
                    <ModalEditAgentConfig props={agentConfigIndex}/>
                );
            }
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 80,
            renderCell: (cellParam) => {
                const handleDelete = (event) => {
                    experimentDispatch({
                        type: ExperimentReducerTypes.deleteAgentConfig,
                        id: cellParam.row.id
                    })
                }
                return (
                    <Button>
                        <DeleteIcon onClick={handleDelete}/>
                    </Button>
                );
            }
        },
    ];

    return (
        <div style={{minHeight:"400px"}} >
            <DataGrid
                rows={experimentConfig.agentsConfigs}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                rowHeight={150}
                headerHeight={70}
                autoHeight={true}
            />
        </div>
    );
}