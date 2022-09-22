import { Card, FormControlLabel, Grid, Switch} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useExperimentConfigContext} from "../../../context/ExperimentConfigProvider";
import {ExperimentReducerTypes} from "../../../context/reducer/types/ExperimentReducerTypes";
import {ChangeEvent} from "react";

export default function DataHandlerOptionsCard() {

    const {experimentConfig, dispatch} = useExperimentConfigContext()

    const handleDetailedChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ExperimentReducerTypes.setDetailedData,
            value: event.target.checked
        })
    };

    return <Card>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant={'h5'}>
                    DataHandler Configurator
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={experimentConfig.essentialData} />} label="Essential Data" />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={experimentConfig.detailedData}  onChange={handleDetailedChange}/>} label="Detailed Data" />
            </Grid>
        </Grid>
    </Card>
}