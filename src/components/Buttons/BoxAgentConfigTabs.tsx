import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ActionsPanel from "../Panel/ActionsPanel";
import ConfigAgentPanel from "../Panel/ConfigAgentPanel";
import {ExperimentConfigContext} from "../../App";
import {useContext} from "react";
import {GenericExperiment} from "../../model/environments/GenericExperiment";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "whitesmoke",
    border: '2px solid #000',
    minWidth: "440px",
    boxShadow: 24,
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
};

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const tabsController = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BoxAgentConfigTabs(agentConfig){
    //Todo read mode of config and only disable the not ! agent by Config

    console.log("In Start agent config from prop is: ", agentConfig)
    const configContext = useContext(ExperimentConfigContext);
    const [value, setValue] = React.useState(0);

    const handleAddAgentConfig = () => {
        console.log("Todo Add New Config.")
        //todo handle to add to all configs list.


        configContext.agentsConfigs.push()
    }


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant={'h5'} textAlign={"center"} marginY={'15px'}>
                    Agent Config
                </Typography>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Config" {...tabsController(0)} />
                    <Tab label="Actions Config" {...tabsController(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ConfigAgentPanel {...agentConfig} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ActionsPanel {...agentConfig}/>
            </TabPanel>
            <Grid item xs={12}>
                <div style={{
                    textAlign: "center",
                    marginBottom: '20px'
                }}>
                    <Button variant="contained" onClick={handleAddAgentConfig}>
                        Add New Config
                        <AddIcon/>
                    </Button>
                </div>
            </Grid>
        </div>
    );
}