import { createContext, FC, useReducer, useState } from "react";
import { defaultExperimentConfig } from "./ExperimentData";

interface Context {
  experimentConfig: typeof defaultExperimentConfig;
  setProperty: (
    propertyName: keyof typeof defaultExperimentConfig,
    value: any
  ) => void;
}

export const ExperimentContext = createContext<Context>(null);

const useReducer;

const ExperimentProvider: FC = ({ children }) => {
  const [experimentConfig, setExperimentConfig] = useState(
    defaultExperimentConfig
  );

  const [state, dispatch] = useReducer();

  const providerValue: Context = {
    experimentConfig,
    setProperty: (propertyName: string, value: any) =>
      setExperimentConfig((prev) => ({
        ...prev,
        [propertyName]: value,
      })),
  };

  return (
    <ExperimentContext.Provider value={providerValue}>
      {children}
    </ExperimentContext.Provider>
  );
};

export default ExperimentProvider;
