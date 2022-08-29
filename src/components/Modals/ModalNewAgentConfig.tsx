import React, {useContext, useState} from "react";
import {Button, Grid, Modal} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BoxAgentConfigTabs from "../Buttons/BoxAgentConfigTabs";
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
    minWidth: "440px",
    boxShadow: 24,
}

export default function ModalNewAgentConfig() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const agentConfig = {
        initialState: 0,
        configName: "",
        percentageFollowers: 0,
        percentageFollowings: 0,
        agentType: "",
        actions: [],
        isSeed: false,
        percentageAgent: 0
    }

    console.log("Agent Config on New Agent Config modal: ", agentConfig)

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">
                <AddIcon/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <BoxAgentConfigTabs/>
                </Box>
            </Modal>
        </div>
    );
}