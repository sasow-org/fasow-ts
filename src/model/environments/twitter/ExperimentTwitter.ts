import {Experiment} from "../../essential/Experiment";
import {DataHandlerConfig} from "../../util/config/DataHandlerConfig";
import {SimulationTwitter} from "./SimulationTwitter";
import {DataHandler} from "../../util/datahandler/DataHandler";
import {Action} from "../../util/actions/Action";
import {ActionShare} from "../../util/actions/commands/ActionShare";
import {ActionRead} from "../../util/actions/commands/ActionRead";
import {AgentConfig} from "../../util/config/AgentConfig";
import {SimulationConfig} from "../../util/config/SimulationConfig";
import {Agent} from "../../essential/Agent";

export class ExperimentTwitter extends Experiment{

    constructor(repetitions: number, name: string, description : string, dataHandlerConfig : DataHandlerConfig) {
        super(repetitions, name, description, dataHandlerConfig);
    }

    configure(): void {
        const networkSize : number = 1000;
        const seedSize: number = 50;
        const periods : number = 25;

        let commands : Action[] = [];
        let actionShare = new ActionShare("share", 0.03)
        let lRead = new ActionRead("read", 0.5);
        commands.push(actionShare)
        commands.push(lRead)

        let avSeedConfig : AgentConfig = new AgentConfig(Agent.PREPARE_FOR_SHARE, commands, true, seedSize,  1, 0)

        let avrConfig : AgentConfig = new AgentConfig(Agent.NOREAD, commands, false, networkSize - seedSize,  0.1, 0)

        let agentsConfigs : AgentConfig[] = [];

        agentsConfigs.push(avSeedConfig)
        agentsConfigs.push(avrConfig)

        this.simulationConfig = new SimulationConfig(periods, networkSize, seedSize, agentsConfigs);


    }

    initialize(id: number): void {
        console.log("Inicializando experiment twitter, id: ", id)
        this.simulation = new SimulationTwitter(id, this.simulationConfig);
        this.simulation.initialize();
        DataHandler.getInstance().experiment = this;
        DataHandler.getInstance().simulation = this.simulation;
        DataHandler.getInstance().environment = this.simulation.environment;
    }

}