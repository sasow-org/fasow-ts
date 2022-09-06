import React, {createContext} from 'react';
import './App.css';
import {Box} from "@mui/material";
import {BrowserRouter} from 'react-router-dom';
import NavBar from "./components/NavBar";
import TemplateLayout from "./components/TemplateLayout";

//agenttype deberia hacer referencia a la clase del objeto que debemos instanciar
let agentConfig1 = {
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
    percentageAgent: 95
}

let agentConfig2 = {
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
            actionType: "ActionRead" //aqui se hace referencia a la clase del objeto action que se debera instanciar
        },
        {
            id: 1,
            actionName: "share",
            actionProbability: 0.03,
            actionType: "ActionShare" //aqui se hace referencia a la clase del objeto action que se debera instanciar}
        },
    ],
    isSeed: true,
    percentageAgent:5
}

let experimentConfig = {
    experimentName: "Experiment Name Default",
    repetitions: 1,
    networkSize: 1000,
    seedSize: 50,
    periods: 20,
    description: "Default Description",
    agentsConfigs: [
        agentConfig1,agentConfig2
    ],
    essentialData: true,
    detailedData: true,
    experimentType: "TwitterConfig"//referencia a la clase que se deberia instanciar
};

let emptyExperimentConfig = {
    experimentName: "Experiment Name Default",
    repetitions: 0,
    networkSize: 0,
    seedSize: 0,
    periods: 0,
    description: "Default Description",
    agentsConfigs: [],
    essentialData: true,
    detailedData: true,
    experimentType: "TwitterConfig"//referencia a la clase que se deberia instanciar
};


export const ExperimentConfigContext = createContext(emptyExperimentConfig);

function App() {

    return (
      <div className="App">
          <BrowserRouter>
              <NavBar/>
              <Box mt={2} maxHeight={1000} height={1000} style={{backgroundColor: "darkgray",
              }}>
                  <TemplateLayout/>
              </Box>
          </BrowserRouter>
      </div>
  )
}

export default App;
