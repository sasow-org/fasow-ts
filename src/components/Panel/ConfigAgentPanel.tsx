import {Grid, MenuItem, Slider, TextField} from "@mui/material";
import {ChangeEvent} from "react";
import Box from "@mui/material/Box";
import {useAgentConfigContext} from "../../context/AgentConfigProvider";
import {AgentReducerTypes} from "../../context/reducer/types/AgentReducerTypes";

export default function ConfigAgentPanel(){

    const {agentConfig, agentDispatch} = useAgentConfigContext();

    //todo to fix hardocing you need to add class of agents on the below array
    const typesArray = ['TwitterAgent', 'FacebookAgent']
    //function to handle the max and min value in percentages
    const evaluateValue = (newValue) => {
        if(newValue < 0.001 && newValue > 0 ){
            return 0.001;
        }else if(newValue > 100){
            return 100;
        }
        return newValue;
    }

    // Agent Type, remember this is for select the class was need to instantiate. //todo check this hardcoding
    //Function to handle the changes in the
    const handleChangeSelectAgentType = (event: ChangeEvent<HTMLInputElement>) => {
        agentDispatch({
            type: AgentReducerTypes.setAgentType,
            value: event.target.value
        })
    }

    // Config Name
    const handleChangeConfigName = (event: ChangeEvent<HTMLInputElement>) => {
        agentDispatch({
            type: AgentReducerTypes.setConfigName,
            value: event.target.value
        })
    }

    // Initial State
    const handleChangeInitialState = (event: ChangeEvent<HTMLInputElement>) => {
        //Todo esta parte se puede mejorar mostrando el nombre de la variable de estado, una cosa asi.
        agentDispatch({
            type: AgentReducerTypes.setInitialState,
            value: event.target.value
        })
        //todo resolver el problema de no introducir valores equivocados.
    }

    // Followers Percentage
    const sliderHandleChangeFollowersPercentage = (event: Event, auxValue: number | number[]) => {
        const newValue : number = evaluateValue(auxValue);
        agentDispatch({
            type: AgentReducerTypes.setPercentageFollowers,
            value: newValue
        })
    }
    const handleChangeFollowersPercentage = (event: ChangeEvent<HTMLInputElement>) => {
        let newValue : number = evaluateValue(parseFloat(event.target.value));
        agentDispatch({
            type: AgentReducerTypes.setPercentageFollowers,
            value: newValue
        })
    }

    // Followings Percentage
    const sliderHandleChangeFollowingsPercentage = (event: Event, auxValue: number | number[]) => {
        const newValue : number = evaluateValue(auxValue);
        agentDispatch({
            type: AgentReducerTypes.setPercentageFollowings,
            value: newValue as number
        })
    }
    const handleChangeFollowingsPercentage = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue : number = evaluateValue(parseFloat(event.target.value));
        agentDispatch({
            type: AgentReducerTypes.setPercentageFollowings,
            value: newValue
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Config Name"
                    value={agentConfig.configName}
                    onChange={handleChangeConfigName}
                    variant={"outlined"}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Initial State"
                    value={agentConfig.initialState}
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
                                value={agentConfig.percentageFollowers}
                                variant={"outlined"}
                                onChange={handleChangeFollowersPercentage}
                                type={"number"}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Slider
                                value={agentConfig.percentageFollowers}
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
                                value={agentConfig.percentageFollowings}
                                onChange={handleChangeFollowingsPercentage}
                                variant={"outlined"}
                                type={"number"}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Slider
                                value={agentConfig.percentageFollowings}
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
                    value={agentConfig.agentType}
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