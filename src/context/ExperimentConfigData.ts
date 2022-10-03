/* Testing Configs */
const agentTestConfig1 = {
  initialState: 0,
  configName: "agent config 1",
  percentageFollowers: 1,
  percentageFollowings: 0,
  agentType: "TwitterAgent",
  actions: [
    {
      id: 0,
      actionName: "read",
      actionProbability: 0.5,
      actionType: "ActionRead", // aqui se hace referencia a la clase del objeto action que se debera instanciar
    },
    {
      id: 1,
      actionName: "share",
      actionProbability: 0.03,
      actionType: "ActionShare", // aqui se hace referencia a la clase del objeto action que se debera instanciar}
    },
  ],
  isSeed: false,
  percentageAgent: 95,
};
const agentTestConfig2 = {
  initialState: 2,
  configName: "agent config 2",
  percentageFollowers: 1,
  percentageFollowings: 0,
  agentType: "TwitterAgent",
  actions: [
    {
      id: 0,
      actionName: "read",
      actionProbability: 0.5,
      actionType: "ActionRead", // aqui se hace referencia a la clase del objeto action que se debera instanciar
    },
    {
      id: 1,
      actionName: "share",
      actionProbability: 0.03,
      actionType: "ActionShare", // aqui se hace referencia a la clase del objeto action que se debera instanciar}
    },
  ],
  isSeed: true,
  percentageAgent: 5,
};
export const ExperimentTestConfig = {
  experimentName: "Experiment Name Default",
  repetitions: 1,
  networkSize: 1000,
  seedSize: 50,
  periods: 20,
  description: "Default Description",
  agentsConfigs: [agentTestConfig1, agentTestConfig2],
  essentialData: true,
  detailedData: true,
  experimentType: "TwitterConfig", // referencia a la clase que se deberia instanciar
};
/* Testing Configs */

/* Initial Configs States */
export const initialExperimentConfigState = {
  experimentName: "Experiment Name Default" as string,
  repetitions: 0 as number,
  networkSize: 0 as number,
  seedSize: 0 as number,
  periods: 0 as number,
  description: "Default Description" as string,
  agentsConfigs: [] as AgentConfigInterface[],
  essentialData: true as boolean,
  detailedData: true as boolean,
  experimentType: "TwitterConfig" as string, //referencia a la clase que se deberia instanciar
}

export const initialAgentConfigState = {
  id: 0 as number,
  initialState: 0 as number,
  configName: "" as string,
  percentageFollowers: 0 as number,
  percentageFollowings: 0 as number,
  agentType: "TwitterAgent" as string,
  actions: [] as ActionConfigInterface[],
  isSeed: false as boolean,
  percentageAgent: 0 as number
}
/* Initial Configs States */

/* Config Interfaces */
interface AgentConfigInterface {
  id: number;
  initialState: number;
  configName: string;
  percentageFollowers: number;
  percentageFollowings: number;
  agentType: string;
  actions: ActionConfigInterface[],
  isSeed: boolean,
  percentageAgent: number,
}

interface ActionConfigInterface {
  id: number
  actionName: string
  actionProbability: number
  actionType: string
}

interface ExperimentConfigInterface {
  experimentName: string;
  repetitions: number;
  networkSize: number;
  seedSize: number;
  periods: number;
  description: number;
  agentsConfigs: [];
  essentialData: boolean;
  detailedData: boolean;
  experimentType: string;
}
/* Config Interfaces */