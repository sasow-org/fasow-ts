import {Card, Grid, MenuItem, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ExperimentConfigContext} from "../../App";
import Box from "@mui/material/Box";

export default function ConfigAgentPanel(agentConfig){

    const experimentConfig = useContext(ExperimentConfigContext)

    const stateConfig = useState(agentConfig);

    console.log("Experiment Config is : ", experimentConfig);
    console.log("AgentConfig in ConfigAgent Panel for new Agent is: ", agentConfig)
    console.log("State config (AgentConfig) in ConfigAgentPanel for new Agent is: ",stateConfig);



    //todo to fix hardocing you need to add class of agents on the below array
    const typesArray = ['TwitterAgent', 'FacebookAgent']
    // Agent Type, remember this is for select the class was need to instantiate.
    const [selectedAgentType, setSelectedAgentType] = useState(agentConfig.agentType)//todo check this hardcoding

    //Function to handle the changes in the
    const handleChangeSelectAgentType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAgentType(event.target.value)
        agentConfig.agentType = event.target.value;
    }

    useEffect(() => {
        if(agentConfig.agentType === ""){
            if(experimentConfig.experimentType === "TwitterConfig"){
                setSelectedAgentType('TwitterAgent');
            }else{//Si el modo es otra que no sea twitter (por ahora solo existe facebook)
                setSelectedAgentType('FacebookAgent');
            }
        }
    })

    // Config Name
    const [configName, setConfigName] = useState(agentConfig.configName)
    const handleChangeConfigName = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Pre config ---> ", agentConfig)
        setConfigName(event.target.value);
        agentConfig.configName = event.target.value;
        console.log("Post Config ---> ", agentConfig)
    }

    // Initial State
    const [initialState, setInitialState] = useState(agentConfig.initialState)
    const handleChangeInitialState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInitialState(event.target.value);
    }

    // Followers Percentage
    const [followersPercentage, setFollowersPercentage] = useState(agentConfig.percentageFollowers);
    const handleChangeFollowersPercentage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFollowersPercentage(parseFloat(event.target.value))
        agentConfig.percentageFollowers = parseFloat(event.target.value);
    }

    // Followings Percentage
    const [followingsPercentage, setFollowingsPercentage] = useState(agentConfig.percentageFollowings);
    const handleChangeFollowingsPercentage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFollowingsPercentage(parseFloat(event.target.value))
        agentConfig.percentageFollowings = parseFloat(event.target.value);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Config Name"
                    value={configName}
                    onChange={handleChangeConfigName}
                    variant={"outlined"}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Initial State"
                    value={initialState}
                    onChange={handleChangeInitialState}
                    variant={"outlined"}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Followers Percentage"
                    value={followersPercentage}
                    onChange={handleChangeFollowersPercentage}
                    variant={"outlined"}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Followings Percentage"
                    value={followingsPercentage}
                    onChange={handleChangeFollowingsPercentage}
                    variant={"outlined"}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Agent Type"
                    value={selectedAgentType}
                    onChange={handleChangeSelectAgentType}
                    variant={"outlined"}
                >
                    {typesArray.map((option, i) => (
                        <MenuItem key={i} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    );
}