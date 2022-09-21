/* eslint-disable @typescript-eslint/quotes */
const agentConfig1 = {
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

const agentConfig2 = {
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

export const defaultExperimentConfig = {
  experimentName: "Experiment Name Default",
  repetitions: 1,
  networkSize: 1000,
  seedSize: 50,
  periods: 20,
  description: "Default Description",
  agentsConfigs: [agentConfig1, agentConfig2],
  essentialData: true,
  detailedData: true,
  experimentType: "TwitterConfig", // referencia a la clase que se deberia instanciar
};
