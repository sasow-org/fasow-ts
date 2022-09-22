import {
    Card,
    Grid,
} from "@mui/material";
import ModalNewAgentConfig from "../../Modals/ModalNewAgentConfig";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {DataGrid} from "@mui/x-data-grid";

import AgentConfigProvider from "../../../context/AgentConfigProvider";
import DataGridAgent from "../../DataGrid/DataGridAgents";

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
                    <DataGridAgent/>
                </Grid>
            </Grid>
        </AgentConfigProvider>
    </Card>
}