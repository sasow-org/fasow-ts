import {
    Card,
    Grid,
} from "@mui/material";
import ModalNewAgentConfig from "../../Modals/ModalNewAgentConfig";
import Typography from "@mui/material/Typography";
import * as React from "react";

import AgentConfigProvider from "../../../context/AgentConfigProvider";
import DataGridAgents from "../../DataGrid/DataGridAgents";

export default function ConfigurationCard() {
    return <Card style={{
        padding:"15px",
    }} >
        <AgentConfigProvider>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <Typography variant={'h5'}>
                        Agents Configurator
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <ModalNewAgentConfig/>
                </Grid>
                <Grid item xs={12}>
                    <DataGridAgents/>
                </Grid>
            </Grid>
        </AgentConfigProvider>
    </Card>
}