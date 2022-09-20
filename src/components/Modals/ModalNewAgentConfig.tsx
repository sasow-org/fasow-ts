import React, {createContext, useContext, useState} from "react";
import {Button, Grid, Modal} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ConfigAgentPanel from "../Panel/ConfigAgentPanel";
import ActionsPanel from "../Panel/ActionsPanel";
import {ExperimentConfigContext} from "../../App";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "whitesmoke",
    border: '2px solid #000',
    //minWidth: "600px",
    //maxWidth: "600px",
    //minHeight: "700px",
    //maxHeight: "700px",
    width: "550px",
    height: "650px",
    boxShadow: 24,
}
const style2 = {
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
                    {children}
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
const agentDefaultConfig = {
    initialState: 0,
    configName: "",
    percentageFollowers: 0,
    percentageFollowings: 0,
    agentType: "TwitterAgent",
    actions: [],
    isSeed: false,
    percentageAgent: 0
}

export const agentConfigContext = createContext(agentDefaultConfig);

export default function ModalNewAgentConfig( updateConfigCallBack ) {
    //Load the contexts
    const experimentContext = useContext(ExperimentConfigContext);
    const agentConfig = useContext(agentConfigContext);
    //console.log("In Start agent config from prop is: ", agentConfig)

    //Handle Tabs
    const [auxIndexTab, setAuxIndexTab  ] = React.useState(0);
    const handleChangeIndexTab = (event: React.SyntheticEvent, newValue: number) => {
        setAuxIndexTab(newValue);
    };

    //Handle Add new Agent Config.
    const handleAddAgentConfig = (e) => {
        console.log("Adding New Agent Config.")
        console.log("The config is: \n", agentConfig)

        //todo verify if all in config its ok, if have any problem mark as red what is

        //todo handle to add to all configs list.
        experimentContext.agentsConfigs.push(agentConfig);
        //todo Update the agent configs list.
        //console.log(updateConfigCallBack)
        //updateConfigCallBack()

        handleClose()
    }

    //Open and Close modal.
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">
                <AddIcon/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={style2}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant={'h5'} textAlign={"center"} marginY={'15px'}>
                            Agent Config
                        </Typography>
                        <Tabs value={auxIndexTab} onChange={handleChangeIndexTab} aria-label="basic tabs example">
                            <Tab label="Config" {...tabsController(0)} />
                            <Tab label="Actions Config" {...tabsController(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={auxIndexTab} index={0}>
                        <ConfigAgentPanel {...agentConfig} />
                    </TabPanel>
                    <TabPanel value={auxIndexTab} index={1}>
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
                </Box>
            </Modal>
        </div>
    );
}