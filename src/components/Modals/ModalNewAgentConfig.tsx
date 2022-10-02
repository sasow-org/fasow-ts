import React, {createContext, useContext, useState} from "react";
import {Button, Grid, Modal} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ConfigAgentPanel from "../Panel/ConfigAgentPanel";
import ActionsPanel from "../Panel/ActionsPanel";
import {useExperimentConfigContext} from "../../context/ExperimentConfigProvider";
import {useAgentConfigContext} from "../../context/AgentConfigProvider";
import {AgentReducerTypes} from "../../context/reducer/types/AgentReducerTypes";
import {ExperimentReducerTypes} from "../../context/reducer/types/ExperimentReducerTypes";

const style2 = {
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


export default function ModalNewAgentConfig() {
    //Load the contexts
    const {agentConfig, agentDispatch } = useAgentConfigContext();
    const {experimentConfig, experimentDispatch} = useExperimentConfigContext();

    //console.log(agentConfig)
    //console.log(agentDispatch)

    //const {experimentConfig, experimentDispatch} = useExperimentConfigContext()

    //Handle Tabs
    const [auxIndexTab, setAuxIndexTab  ] = React.useState(0);
    const handleChangeIndexTab = (event: React.SyntheticEvent, newValue: number) => {
        setAuxIndexTab(newValue);
    };

    //Handle Add new Agent Config.
    const handleAddAgentConfig = (e) => {
        //1 debes verificar que los datos ingresados sean correctos
        //2 si es correcto, cierra el modal
        //3 si no es correcto, informa del error.

        //console.log("Adding New Agent Config.")
        //console.log("The config is: \n", agentConfig)

        //todo verify if all in config its ok, if have any problem mark as red what is

        //todo handle to add to all configs list.
        //agentsConfigs.push(agentConfig);
        //todo Update the agent configs list.
        experimentDispatch({
            type: ExperimentReducerTypes.addAgentConfig,
            payload: agentConfig
        })
        //console.log(updateConfigCallBack)
        //updateConfigCallBack()
        handleClose()
    }

    //Open and Close modal.
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        //console.log("BEFORE: ",agentConfig)
        //Al abrir el modal debes hacer dispatch a la funcion para crear una agentConfig auxiliar vacia.
        agentDispatch({
            type: AgentReducerTypes.restartConfig
        })
        //console.log("AFTER: ",agentConfig)
        setOpen(true)
    };
    const handleClose = () => {
        //Al cerrar el modal debes Agregar la configuracion del agente y resetearla.
        setOpen(false)
    };

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