import { createContext, useContext, useReducer } from 'react';
import { initialExperimentConfigState } from './ExperimentConfigData';
import {ExperimentReducer} from "./reducer/ExperimentReducer";

const ExperimentConfigContext = createContext(undefined);

export const useExperimentConfigContext = () => useContext(ExperimentConfigContext);

const ExperimentConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExperimentReducer, initialExperimentConfigState);

  return (
      <ExperimentConfigContext.Provider value={ { experimentConfig: state, dispatch } }>
        {children}
      </ExperimentConfigContext.Provider>
  );
};

export default ExperimentConfigProvider;
