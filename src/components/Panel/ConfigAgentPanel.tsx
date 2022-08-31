import {Card, Grid, MenuItem, Slider, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ExperimentConfigContext} from "../../App";
import Box from "@mui/material/Box";
import {agentConfigContext} from "../Modals/ModalNewAgentConfig";

export default function ConfigAgentPanel(agentConfig2){

    const experimentConfig = useContext(ExperimentConfigContext)

    const agentConfig = useContext(agentConfigContext)

    const [stateConfig, setStateConfig] = useState(agentConfig);

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
        //setStateConfig(stateConfig => ({
        //    ...stateConfig,
        //    ...event.target.value
        //}));
        agentConfig.agentType = event.target.value;
    }

    useEffect(() => {
        /*if(agentConfig.agentType === ""){
            if(experimentConfig.experimentType === "TwitterConfig"){
                setSelectedAgentType('TwitterAgent');
            }else{//Si el modo es otra que no sea twitter (por ahora solo existe facebook)
                setSelectedAgentType('FacebookAgent');
            }
        }

         */
    }, [])

    // Config Name
    const [configName, setConfigName] = useState(agentConfig.configName)
    const handleChangeConfigName = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Pre config ---> ", agentConfig)
        console.log("State config --->", stateConfig)
        console.log("Value --> ", event.target.value)
        setConfigName(event.target.value);
        stateConfig.configName = event.target.value
        console.log("ExperimentConfig Now is --------> ", experimentConfig)

        //agentConfig.configName = event.target.value;
        //console.log("Post Config ---> ", agentConfig)
    }

    // Initial State
    const [initialState, setInitialState] = useState(agentConfig.initialState)
    const handleChangeInitialState = (event: React.ChangeEvent<HTMLInputElement>) => {
        //Todo esta parte se puede mejorar mostrando el nombre de la variable de estado, una cosa asi.
        setInitialState(Number.parseInt(event.target.value));
        agentConfig.initialState = Number.parseInt(event.target.value);
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
        agentConfig.percentageFollowers = newValue as number;
    }
    const handleChangeFollowersPercentage = (event) => {
        let newValue : number = evaluateValue(parseFloat(event.target.value));
        setFollowersPercentage(newValue);
        agentConfig.percentageFollowers = newValue;
    }

    // Followings Percentage
    const [followingsPercentage, setFollowingsPercentage] = useState(agentConfig.percentageFollowings);
    const sliderHandleChangeFollowingsPercentage = (event: Event, newValue: number | number[]) => {
        setFollowingsPercentage(newValue as number);
        agentConfig.percentageFollowings = newValue as number
    }
    const handleChangeFollowingsPercentage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : number = evaluateValue(parseFloat(event.target.value));
        setFollowingsPercentage(newValue)
        agentConfig.percentageFollowings = newValue;
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