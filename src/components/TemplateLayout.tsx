import * as React from 'react';
import ExperimentsOptionsCard from "./Cards/ExperimentsOptionsCard/ExperimentsOptionsCard";
import ExperimentInputCard from "./Cards/ExperimentInputCard/ExperimentInputCard";
import ConfigurationCard from "./Cards/ConfigurationCard/ConfigurationCard";
import {Grid} from "@mui/material";
import DataHandlerOptionsCard from "./Cards/DataHandlerOptionsCard/DataHandlerOptionsCard";
import OutputIterationsCard from "./Cards/OutputIterationsCard/OutputIterationsCard";
import Box from "@mui/material/Box";

export default function TemplateLayout(){

    return (
        <Box mt={2} maxHeight={1000} height={1000} style={{backgroundColor: "darkgray",
        }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <ExperimentsOptionsCard/>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={6}>
                        <ExperimentInputCard/>
                    </Grid>
                    <Grid item xs={6}>
                        <ConfigurationCard/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <DataHandlerOptionsCard/>
                </Grid>
                <Grid item xs={12}>
                    <OutputIterationsCard/>
                </Grid>
            </Grid>
        </Box>
    )
}