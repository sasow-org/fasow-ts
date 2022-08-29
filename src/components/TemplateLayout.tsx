import * as React from 'react';
import ExperimentInputCard from "./Cards/ExperimentInputCard/ExperimentInputCard";
import ConfigurationCard from "./Cards/ConfigurationCard/ConfigurationCard";
import {Grid} from "@mui/material";
import OutputIterationsCard from "./Cards/OutputIterationsCard/OutputIterationsCard";
import Box from "@mui/material/Box";
export default function TemplateLayout(){

    return (
        <Box mt={2} paddingX={"15px"} maxHeight={"max-content"} height={"max-content"} style={{backgroundColor: "darkgray",
        }}>
            <Grid container spacing={1}>
                <Grid item xs={6} md={5} sm={12}>
                    <ExperimentInputCard/>
                </Grid>
                <Grid item xs={6} md={7} sm={12}>
                    <ConfigurationCard/>
                </Grid>
                <Grid item xs={12}>
                    <OutputIterationsCard />
                </Grid>
            </Grid>
        </Box>
    )
}