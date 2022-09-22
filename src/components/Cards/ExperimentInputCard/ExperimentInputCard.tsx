import {Card, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useExperimentConfigContext} from "../../../context/ExperimentConfigProvider";
import {ExperimentReducerTypes} from "../../../context/reducer/types/ExperimentReducerTypes";
import {ChangeEvent} from "react";
import DataHandlerOptionsCard from "../DataHandlerOptionsCard/DataHandlerOptionsCard";
import NetworkSelector from "../../TextField/NetworkSelector";


export default function ExperimentInputCard() {

    const {experimentConfig, dispatch} = useExperimentConfigContext()

    const handleExperimentNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ExperimentReducerTypes.setExperimentName,
            value: event.target.value
        })
    };

    const handleRepetitionsChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ExperimentReducerTypes.setRepetitions,
            value: event.target.value
        })
    };

    const handleNetworkSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ExperimentReducerTypes.setNetworkSize,
            value: event.target.value
        })
    };

    const handlePeriodsChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ExperimentReducerTypes.setPeriods,
            value: event.target.value
        })
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ExperimentReducerTypes.setDescription,
            value: event.target.value
        })
    };




    return <Card sx={{
        padding:"15px"
    }}>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <DataHandlerOptionsCard/>
            </Grid>
            <Grid item xs ={12}>
                <NetworkSelector/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h5'}>
                    Experiment Configurator
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Experiment Name"
                    value={experimentConfig.experimentName}
                    onChange={handleExperimentNameChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Repetitions"
                    value={experimentConfig.repetitions}
                    onChange={handleRepetitionsChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Network Size"
                    value={experimentConfig.networkSize}
                    onChange={handleNetworkSizeChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    label="Periods"
                    value={experimentConfig.periods}
                    onChange={handlePeriodsChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Description"
                    multiline
                    maxRows={4}
                    value={experimentConfig.description}
                    onChange={handleDescriptionChange}
                />
            </Grid>
        </Grid>
    </Card>
}