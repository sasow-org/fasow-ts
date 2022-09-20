import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useContext, useState} from "react";
import {ExperimentConfigContext} from "../../App";
import {Button, Slider, Switch, TextField} from "@mui/material";
import ModalEditAgentConfig from "../Modals/ModalEditAgentConfig";
import DeleteIcon from "@mui/icons-material/Delete";


export default function DataGridAgent() {
    const experimentConfig = useContext(ExperimentConfigContext);
    const agentsConfig = experimentConfig.agentsConfigs;
    console.log("Printing Agents")
    console.log(agentsConfig)

    //handle the seed agent mode with from switch
    const handleSeedAgent = (event: React.ChangeEvent<HTMLInputElement>, index) => {
        //console.log("agentsConfig[index].isSeed: ", agentsConfig[index].isSeed);
        //console.log("event.target.checked: ", event.target.checked)
        //console.log("Pre change --> ", experimentConfig.seedSize)

        agentsConfig[index].isSeed = event.target.checked;

        let newSeedSize = 0;
        agentsConfig.forEach((ac) => {
            if(ac.isSeed){
                newSeedSize+=ac.percentageAgent*experimentConfig.networkSize/100;
            }
        })
        experimentConfig.seedSize = newSeedSize;

        //console.log("Post change --> ", experimentConfig.seedSize)
    }

    const handleChangePercentage = (event, index) => {
        //console.log("on handleChange percentage, event.target.value = ",event.target.value)
        agentsConfig[index].percentageAgent = Number(event.target.value);
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
                    <Switch checked={agentsConfig[cellParam.row.id].isSeed}  onChange={(e) => handleSeedAgent(e,cellParam.row.id)}/>
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

    function getRows() {
        let array = [];
        let id = 0;
        agentsConfig.forEach( (agentConfig) => {
            array.push(getRow(agentConfig, id))
            id += 1;
        } )
        return array;
    }

    let rows = getRows();

    console.log("Rows ==> ",rows)

    const updateAgentConfig = (selected,event) => {
        //console.log("A:>>>>> ",a.target.value)
        //console.log("oN Update Agent COnfig",e);
        //console.log("agentsConfig[e.row.id]: ",agentsConfig[e.row.id])
        //console.log("rows--> ", rows)
        rows[selected.row.id].percentageAgent = event.target.value;
        agentsConfig[selected.row.id].percentageAgent = event.target.value;
    }

    return (
        <DataGrid
            onCellEditStop={(selected,event)=>updateAgentConfig(selected, event)}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={150}
            headerHeight={70}
            autoHeight={true}
        />
    );
}