import React, {useContext, useState} from "react";
import { Button, Modal} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BoxAgentConfigTabs from "../Buttons/BoxAgentConfigTabs";
import {ExperimentConfigContext} from "../../App";


export default function ModalEditAgentConfig(index) {

    const experimentConfig = useContext(ExperimentConfigContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //const isNewAgent = false;

    console.log("ON Modal agent config is : ", index)



    return (
        <>
            <Button onClick={handleOpen}>
                <EditIcon/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BoxAgentConfigTabs {...experimentConfig.agentsConfigs[index]} />
            </Modal>
        </>
    );
}