import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Button, Slider, Switch, TextField} from "@mui/material";
import ModalEditAgentConfig from "../Modals/ModalEditAgentConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import {useExperimentConfigContext} from "../../context/ExperimentConfigProvider";
import {useState} from "react";


export default function DataGridAgent() {
    const {experimentConfig, experimentDispatch} = useExperimentConfigContext()

    console.log("Printing Agents")
    console.log(experimentConfig.agentsConfigs)

    //handle the seed agent mode with from switch
    const handleSeedAgent = (event: React.ChangeEvent<HTMLInputElement>, index) => {
        //console.log("agentsConfig[index].isSeed: ", agentsConfig[index].isSeed);
        //console.log("event.target.checked: ", event.target.checked)
        //console.log("Pre change --> ", experimentConfig.seedSize)

        //agentsConfig[index].isSeed = event.target.checked;

        //let newSeedSize = 0;
        //agentsConfig.forEach((ac) => {
        //    if(ac.isSeed){
        //        newSeedSize+=ac.percentageAgent*experimentConfig.networkSize/100;
        //    }
        //})
        //experimentConfig.seedSize = newSeedSize;

        //console.log("Post change --> ", experimentConfig.seedSize)
    }

    const handleChangePercentage = (event, index) => {
        //console.log("on handleChange percentage, event.target.value = ",event.target.value)
        //agentsConfig[index].percentageAgent = Number(event.target.value);
    }

    const columns2: GridColDef[] = [
        {
            field: 'configName',
            headerName: 'Config Name',
            minWidth: 130,
        },
        {
            field: 'percentageAgent',
            headerName: 'Percentage Agent (%)',
            width: 160,
            editable:true
        },
        {
            field: 'isSeed',
            headerName: 'isSeed',
            width: 70,
            /*
            renderCell: (cellParam) => {

                const handleChangePercentage = (event, index) => {
                    //console.log("on handleChange percentage, event.target.value = ",event.target.value)
                    agentsConfig[index].percentageAgent = Number(event.target.value);
                }
                //handle the seed agent mode with from switch
                const handleSeedAgent = (event: React.ChangeEvent<HTMLInputElement>, index) => {
                    console.log("agentsConfig[index].isSeed: ", agentsConfig[index].isSeed);
                    console.log("event.target.checked: ", event.target.checked)
                    console.log("Pre change --> ", experimentConfig.seedSize)

                    agentsConfig[index].isSeed = event.target.checked;

                    let newSeedSize = 0;
                    agentsConfig.forEach((ac) => {
                        if(ac.isSeed){
                            newSeedSize+=ac.percentageAgent*experimentConfig.networkSize/100;
                        }
                    })
                    experimentConfig.seedSize = newSeedSize;

                    console.log("Post change --> ", experimentConfig.seedSize)
                }
                //console.log("CellParam --> ", cellParam.row.id);
                return (
                    //<Switch checked={agentsConfig[cellParam.row.id].isSeed}  onChange={(e) => handleSeedAgent(e,cellParam.row.id)}/>
                    <Switch checked={agentsConfig[cellParam.row.id].isSeed} />
                );
            },*/
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 80,
            /*
            renderCell: (cellParam) => {
                //console.log("On Edit, CellParam: ",cellParam);
                //let agentConfig = agentsConfig[cellParam.row.id];
                const index = cellParam.row.id;
                return(
                    <ModalEditAgentConfig {...index} />
                );
            }

             */
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 80,
            renderCell: (cellParam) => {
                const handleDelete = (event) => {
                    //agentsConfig.splice(cellParam.row.id, 1)
                    //setRows(getRows(agentsConfig))
                }

                return (
                    <Button onClick={handleDelete}>
                        <DeleteIcon/>
                    </Button>
                );
            }
        },
    ];


    const columns: GridColDef[] = [
        {
            field: 'configName',
            headerName: 'Config Name',
            minWidth: 130,
        },
        {
            field: 'percentageAgent',
            headerName: 'Percentage Agent (%)',
            width: 160,
            editable:true
        },
        {
            field: 'isSeed',
            headerName: 'isSeed',
            width: 70,
            renderCell: (cellParam) => {
                //console.log("CellParam --> ", cellParam.row.id);
                return (
                    <Switch checked={experimentConfig.agentsConfigs[cellParam.row.id].isSeed}  onChange={(e) => handleSeedAgent(e,cellParam.row.id)}/>
                );
            },

        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 80,
            renderCell: (cellParam) => {
                //console.log("On Edit, CellParam: ",cellParam);
                //let agentConfig = agentsConfig[cellParam.row.id];
                const index = cellParam.row.id;
                return(
                    <ModalEditAgentConfig {...index} />
                );
            }
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 80,
            renderCell: (cellParam) => {

                return (
                    <Button>
                        <DeleteIcon/>
                    </Button>
                );
            }
        },
    ];

    function getRows(arrayToGet) {
        function getRow(row, id)  {
            return {
                id:id,
                configName: row.configName,
                percentageAgent: row.percentageAgent,
                isSeed: row.isSeed,
                edit: true,
                delete: true
            }
        }
        let array = [];
        let id = 0;
        arrayToGet.forEach( (agentConfig) => {
            array.push(getRow(agentConfig, id))
            id += 1;
        } )
        return array;
    }

    const [rows, setRows] = useState(experimentConfig.agentsConfigs)

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={150}
            headerHeight={70}
            autoHeight={true}
            experimentalFeatures={{newEditingApi: true}}
        />
    );
}