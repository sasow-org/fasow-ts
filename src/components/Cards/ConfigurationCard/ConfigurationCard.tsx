import {
    Button,
    Card,
    Grid, Modal, Switch,
} from "@mui/material";
import ModalNewAgentConfig, {agentConfigContext} from "../../Modals/ModalNewAgentConfig";
import Typography from "@mui/material/Typography";
import {useContext, useState} from "react";
import {ExperimentConfigContext} from "../../../App";
import * as React from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import ModalEditAgentConfig from "../../Modals/ModalEditAgentConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ConfigAgentPanel from "../../Panel/ConfigAgentPanel";
import ActionsPanel from "../../Panel/ActionsPanel";


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
const getDefaultAgentConfig = () => {return agentDefaultConfig};

export default function ConfigurationCard() {
    const experimentConfig = useContext(ExperimentConfigContext);//Carga el contexto del experimento
    const agentsConfig = experimentConfig.agentsConfigs;//Obten el arreglo de la configuracion de los agentes

    //Handle Tabs
    const [auxIndexTab, setAuxIndexTab  ] = React.useState(0);
    const handleChangeIndexTab = (event: React.SyntheticEvent, newValue: number) => {
        setAuxIndexTab(newValue);
    };

    //Open and Close modal.
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setAgentConfig({
            initialState: 0,
            configName: "agent config 3",
            percentageFollowers: 1,
            percentageFollowings: 0,
            agentType: "TwitterAgent",
            actions: [
                {
                    id: 0,
                    actionName: "read",
                    actionProbability: 0.5,
                    actionType: "ActionRead" //aqui se hace referencia a la clase del objeto action que se debera instanciar
                },
                {
                    id: 1,
                    actionName: "share",
                    actionProbability: 0.03,
                    actionType: "ActionShare" //aqui se hace referencia a la clase del objeto action que se debera instanciar}
                },
            ],
            isSeed: false,
            percentageAgent: 0
        })
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    function getRows(arrayToGet) {
        function getRow(row, id)  {
            return {
                id:id,
                configName: row.configName,
                percentageAgent: row.percentageAgent,
                isSeed: row.isSeed,
                edit: true,
                delete: true
            }
        }
        let array = [];
        let id = 0;
        arrayToGet.forEach( (agentConfig) => {
            array.push(getRow(agentConfig, id))
            id += 1;
        } )
        return array;
    }
    const [rows, setRows] = useState(getRows(agentsConfig))//Obten las rows que deberas configurar y mostrar respecto al arreglo agentConfigs.
    console.log("Rows ==> ",rows)

    //Definicion de las estructura de las columnas del DataGrid para desplegar la informacion de los agentes.
    const columns: GridColDef[] = [
        {
            field: 'configName',
            headerName: 'Config Name',
            minWidth: 130,
        },
        {
            field: 'percentageAgent',
            headerName: 'Percentage Agent (%)',
            width: 160,
            editable:true
        },
        {
            field: 'isSeed',
            headerName: 'isSeed',
            width: 70,
            /*
            renderCell: (cellParam) => {

                const handleChangePercentage = (event, index) => {
                    //console.log("on handleChange percentage, event.target.value = ",event.target.value)
                    agentsConfig[index].percentageAgent = Number(event.target.value);
                }
                //handle the seed agent mode with from switch
                const handleSeedAgent = (event: React.ChangeEvent<HTMLInputElement>, index) => {
                    console.log("agentsConfig[index].isSeed: ", agentsConfig[index].isSeed);
                    console.log("event.target.checked: ", event.target.checked)
                    console.log("Pre change --> ", experimentConfig.seedSize)

                    agentsConfig[index].isSeed = event.target.checked;

                    let newSeedSize = 0;
                    agentsConfig.forEach((ac) => {
                        if(ac.isSeed){
                            newSeedSize+=ac.percentageAgent*experimentConfig.networkSize/100;
                        }
                    })
                    experimentConfig.seedSize = newSeedSize;

                    console.log("Post change --> ", experimentConfig.seedSize)
                }
                //console.log("CellParam --> ", cellParam.row.id);
                return (
                    //<Switch checked={agentsConfig[cellParam.row.id].isSeed}  onChange={(e) => handleSeedAgent(e,cellParam.row.id)}/>
                    <Switch checked={agentsConfig[cellParam.row.id].isSeed} />
                );
            },*/
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 80,
            /*
            renderCell: (cellParam) => {
                //console.log("On Edit, CellParam: ",cellParam);
                //let agentConfig = agentsConfig[cellParam.row.id];
                const index = cellParam.row.id;
                return(
                    <ModalEditAgentConfig {...index} />
                );
            }

             */
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 80,
            renderCell: (cellParam) => {
                const handleDelete = (event) => {
                    agentsConfig.splice(cellParam.row.id, 1)
                    setRows(getRows(agentsConfig))
                }

                return (
                    <Button onClick={handleDelete}>
                        <DeleteIcon/>
                    </Button>
                );
            }
        },
    ];

    //Load the contexts
    //const experimentContext = useContext(ExperimentConfigContext);
    //const agentConfig = useContext(agentConfigContext);
    //console.log("In Start agent config from prop is: ", agentConfig)

    //Handle Add new Agent Config.

    const [agentConfig, setAgentConfig] = useState(
        {
            initialState: 0,
            configName: "agent config 3",
            percentageFollowers: 1,
            percentageFollowings: 0,
            agentType: "TwitterAgent",
            actions: [
                {
                    id: 0,
                    actionName: "read",
                    actionProbability: 0.5,
                    actionType: "ActionRead" //aqui se hace referencia a la clase del objeto action que se debera instanciar
                },
                {
                    id: 1,
                    actionName: "share",
                    actionProbability: 0.03,
                    actionType: "ActionShare" //aqui se hace referencia a la clase del objeto action que se debera instanciar}
                },
            ],
            isSeed: false,
            percentageAgent: 0
        }
    );

    const handleAddAgentConfig = (e) => {
        console.log("Adding New Agent Config.")
        console.log("The config is: \n", agentConfig)
        //todo verify if all in config its ok, if have any problem mark as red what is
        //todo handle to add to all configs list.
        //experimentConfig.agentsConfigs.push(agentConfig);
        //todo Update the agent configs list.
        //console.log(updateConfigCallBack)
        /*const agentConfigsCopier = (array) => {
            let newArray =  [];
            array.map( (config, i) => {

            })
        }

         */
        //const copyOfAgentConfigs =
        agentsConfig.push(agentConfig)
        setRows(getRows(agentsConfig))
        handleClose()
        setAgentConfig(getDefaultAgentConfig());//Reset auxiliar agent config to default.
    }

    return <Card style={{
        padding:"15px",
    }} >
        <Grid container spacing={1}>
            <Grid item xs={8}>
                <Typography variant={'h5'}>
                    Agents Configurator
                </Typography>
            </Grid>
            <Grid item xs={4}>
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
            </Grid>
            <Grid item xs={12}>
                <DataGrid
                    //onCellEditStop={(selected,event)=>updateAgentConfig(selected, event)}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    rowHeight={150}
                    headerHeight={70}
                    autoHeight={true}
                    experimentalFeatures={{newEditingApi: true}}
                />
            </Grid>
        </Grid>
    </Card>
}