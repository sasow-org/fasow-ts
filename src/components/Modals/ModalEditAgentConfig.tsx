import React, {useState} from "react";
import {Button, Grid, Modal, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useExperimentConfigContext} from "../../context/ExperimentConfigProvider";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ConfigAgentPanel from "../Panel/ConfigAgentPanel";
import ActionsPanel from "../Panel/ActionsPanel";
import SaveIcon from '@mui/icons-material/Save';
import {useAgentConfigContext} from "../../context/AgentConfigProvider";
import {ExperimentReducerTypes} from "../../context/reducer/types/ExperimentReducerTypes";
import {AgentReducerTypes} from "../../context/reducer/types/AgentReducerTypes";

export const styleModalAgentConfig = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "whitesmoke",
    border: '2px solid #000',
    width: "800px",
    //minWidth: "440px",
    //maxWidth: "600px",
    boxShadow: 24,
}

export interface TabPanelProps {
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


export default function ModalEditAgentConfig(props) {
    const configIndex = props.props;
    //Load the contexts
    const {agentConfig, agentDispatch } = useAgentConfigContext();
    const {experimentConfig, experimentDispatch} = useExperimentConfigContext();

    //Open and Close modal.
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        agentDispatch({
            type: AgentReducerTypes.loadConfig,
            payload: experimentConfig.agentsConfigs[configIndex]
        })
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };
    //Handle Tabs
    const [auxIndexTab, setAuxIndexTab  ] = React.useState(0);
    const handleChangeIndexTab = (event: React.SyntheticEvent, newValue: number) => {
        setAuxIndexTab(newValue);
    };

    //Handle Add new Agent Config.
    const handleSaveAgentConfig = (e) => {
        //1 debes verificar que los datos ingresados sean correctos
        //2 si es correcto, cierra el modal
        //3 si no es correcto, informa del error.
        //todo: verify if all in config its ok, if have any problem mark as red what is
        experimentDispatch({
            type: ExperimentReducerTypes.updateAgentConfig,
            id: configIndex,
            payload: agentConfig
        })
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen}>
                <EditIcon/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={styleModalAgentConfig}>
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
                        <ConfigAgentPanel />
                    </TabPanel>
                    <TabPanel value={auxIndexTab} index={1}>
                        <ActionsPanel />
                    </TabPanel>
                    <Grid item xs={12}>
                        <div style={{
                            textAlign: "center",
                            marginBottom: '20px'
                        }}>
                            <Button variant="contained" onClick={handleSaveAgentConfig}>
                                Save Config
                                <SaveIcon sx={{paddingLeft: "5px"}}/>
                            </Button>
                        </div>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}