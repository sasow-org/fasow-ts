import {createContext, useContext, useReducer} from "react";
import {AgentReducer} from "./reducer/AgentReducer";
import {initialAgentConfigState} from "./ExperimentConfigData";

const AgentConfigContext = createContext(undefined);

export const useAgentConfigContext = () => useContext(AgentConfigContext);

const AgentConfigProvider = ({children}) => {
    const [state, dispatch] = useReducer(AgentReducer, initialAgentConfigState);

    return (
        <AgentConfigContext.Provider value={{agentConfig: state, agentDispatch: dispatch}} >
            {children}
        </AgentConfigContext.Provider>
    );
}

export default AgentConfigProvider;