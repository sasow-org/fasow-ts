import {DataHandlerConfig} from "../../model/util/config/DataHandlerConfig";
import {Button} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import React, {useContext, useState} from "react";
import {ExperimentFactory} from "../../model/util/factory/ExperimentFactory";
import {ExperimentConfigData} from "../../model/util/config/data/ExperimentConfigData";
import {AgentConfigData} from "../../model/util/config/data/AgentConfigData";
import {ActionConfigData} from "../../model/util/config/data/ActionConfigData";
import {ExperimentConfigContext} from "../../App";

export default function StartButton() {

    const experimentConfig = useContext(ExperimentConfigContext);

    console.log("Context is --> ", experimentConfig)

    function getAgentConfigData() : AgentConfigData[] {
        let configData :AgentConfigData[] = []

        experimentConfig.agentsConfigs.forEach((agentConfig) => {

            let actions : ActionConfigData[] = []
            agentConfig.actions.forEach((action) => {
                actions.push(new ActionConfigData(action.name, action.probability, action.type))
            })
            configData.push(
                new AgentConfigData(
                    agentConfig.agentType,
                    agentConfig.configName,
                    agentConfig.initialState,
                    actions,
                    agentConfig.isSeed,
                    agentConfig.percentageAgent*experimentConfig.networkSize/100,
                    agentConfig.percentageFollowers,
                    agentConfig.percentageFollowings
                ))

        })

        return configData;
    }

    const startExperiment = async () =>  {
        const agentConfigsData : AgentConfigData[] = getAgentConfigData()

        const experimentConfigData : ExperimentConfigData = new ExperimentConfigData(
            experimentConfig.experimentType,
            experimentConfig.experimentName,
            experimentConfig.description,
            experimentConfig.repetitions,
            experimentConfig.essentialData,
            experimentConfig.detailedData,
            experimentConfig.periods,
            experimentConfig.networkSize,
            experimentConfig.seedSize,
            agentConfigsData
        )

        let experimentFactory :  ExperimentFactory = new ExperimentFactory();
        await experimentFactory.createExperiment(
            experimentConfigData
        ).run();
    }

    return (
        <Button onClick={startExperiment} color={"success"} variant="contained">
            <PlayCircleFilledWhiteIcon/>
        </Button>
    )
}