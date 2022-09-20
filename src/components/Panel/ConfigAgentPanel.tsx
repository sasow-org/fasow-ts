import {Card, Grid, MenuItem, Slider, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ExperimentConfigContext} from "../../App";
import Box from "@mui/material/Box";
import {agentConfigContext} from "../Modals/ModalNewAgentConfig";

export default function ConfigAgentPanel(agentConfig2){

    const experimentConfig = useContext(ExperimentConfigContext)

    const agentConfig = useContext(agentConfigContext)//agentConfig2//useContext(agentConfigContext)

    //const [agentConfig, setAgentConfig] = useState(agentConfig2);

    //console.log("Experiment Config is : ", experimentConfig);
    //console.log("AgentConfig in ConfigAgent Panel for new Agent is: ", agentConfig)



    //todo to fix hardocing you need to add class of agents on the below array
    const typesArray = ['TwitterAgent', 'FacebookAgent']
    // Agent Type, remember this is for select the class was need to instantiate.
    const [selectedAgentType, setSelectedAgentType] = useState(agentConfig.agentType)//todo check this hardcoding
    //Function to handle the changes in the
    const handleChangeSelectAgentType = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log("after setting value: \n", agentConfig)
        setSelectedAgentType(event.target.value)
        //setStateConfig(stateConfig => ({
        //    ...stateConfig,
        //    ...event.target.value
        //}));
        //agentConfig.agentType = event.target.value;
        //const newValue = {"agentType": event.target.value};
        //setAgentConfig(agentConfig => ({...agentConfig, ...newValue}))
        //console.log("Before Setting value: \n",agentConfig)
    }

    // Config Name
    const [configName, setConfigName] = useState(agentConfig.configName)
    const handleChangeConfigName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfigName(event.target.value);
        //const newValue = {"configName": event.target.value};
        //setAgentConfig(agentConfig => ({...agentConfig, ...newValue}))
    }

    // Initial State
    const [initialState, setInitialState] = useState(agentConfig.initialState)
    const handleChangeInitialState = (event: React.ChangeEvent<HTMLInputElement>) => {
        //Todo esta parte se puede mejorar mostrando el nombre de la variable de estado, una cosa asi.
        setInitialState(Number.parseInt(event.target.value));
        //const newValue = {"initialState": Number.parseInt(event.target.value)};
        //setAgentConfig(agentConfig => ({...agentConfig, ...newValue}))
        //todo resolver el problema de no introducir valores equivocados.
    }

    // Followers Percentage
    const evaluateValue = (newValue) => {
        if(newValue < 0.001 && newValue > 0 ){
            return 0.001;
        }else if(newValue > 100){
            return 100;
        }
        return newValue;
    }
    const [followersPercentage, setFollowersPercentage] = useState(agentConfig.percentageFollowers);
    const sliderHandleChangeFollowersPercentage = (event: Event, auxValue: number | number[]) => {
        const newValue : number = evaluateValue(auxValue);
        setFollowersPercentage(newValue as number)
        //const newValue2 = {"percentageFollowers": newValue as number};
        //setAgentConfig(agentConfig => ({...agentConfig, ...newValue2}))
        //agentConfig.percentageFollowers = newValue as number;
    }
    const handleChangeFollowersPercentage = (event) => {
        let newValue : number = evaluateValue(parseFloat(event.target.value));
        setFollowersPercentage(newValue);
        //const newValue2 = {"percentageFollowers": newValue};
        //setAgentConfig(agentConfig => ({...agentConfig, ...newValue2}))
    }

    // Followings Percentage
    const [followingsPercentage, setFollowingsPercentage] = useState(agentConfig.percentageFollowings);
    const sliderHandleChangeFollowingsPercentage = (event: Event, newValue: number | number[]) => {
        setFollowingsPercentage(newValue as number);
        //const newValue2 = {"percentageFollowings": newValue as number};
        //setAgentConfig(agentConfig => ({...agentConfig, ...newValue2}))
    }
    const handleChangeFollowingsPercentage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : number = evaluateValue(parseFloat(event.target.value));
        setFollowingsPercentage(newValue)
        //const newValue2 = {"percentageFollowings": newValue};
        //setAgentConfig(agentConfig => ({...agentConfig, ...newValue2}))
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
                    type={"number"}
                />
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                required
                                label="Followers Percentage"
                                value={followersPercentage}
                                variant={"outlined"}
                                onChange={handleChangeFollowersPercentage}
                                type={"number"}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Slider
                                value={followersPercentage}
                                onChange={sliderHandleChangeFollowersPercentage}
                                step={0.0001}
                                min={0}
                                max={100}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                required
                                label="Followings Percentage"
                                value={followingsPercentage}
                                onChange={handleChangeFollowingsPercentage}
                                variant={"outlined"}
                                type={"number"}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Slider
                                value={followingsPercentage}
                                onChange={sliderHandleChangeFollowingsPercentage}
                                step={0.0001}
                                min={0}
                                max={100}
                            />
                        </Grid>
                    </Grid>
                </Box>
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