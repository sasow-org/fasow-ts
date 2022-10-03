import {AgentReducerTypes} from "./types/AgentReducerTypes";
import {initialAgentConfigState} from "../ExperimentConfigData";

export const AgentReducer = (state, action) => {
    switch (action.type) {
        case AgentReducerTypes.setId: {
            return {
                ...state,
                id: action.value
            }
        }
        case AgentReducerTypes.restartConfig:{
            return initialAgentConfigState;
        }
        case AgentReducerTypes.setAgentPercentage: {
            return {
                ...state,
                agentPercentage: action.value
            }
        }
        case AgentReducerTypes.setAgentType: {
            return {
                ...state,
                agentType: action.value
            }
        }
        case AgentReducerTypes.setSeed: {
            return {
                ...state,
                isSeed: action.value
            }
        }
        case AgentReducerTypes.setConfigName: {
            return {
                ...state,
                configName: action.value
            }
        }
        case AgentReducerTypes.setPercentageFollowers: {
            return {
                ...state,
                percentageFollowers: action.value
            }
        }
        case AgentReducerTypes.setPercentageFollowings: {
            return {
                ...state,
                percentageFollowings: action.value
            }
        }
        case AgentReducerTypes.setInitialState: {
            return {
                ...state,
                initialState: action.value
            }
        }
        case AgentReducerTypes.addAction: {
            return {
                ...state,
                actions: [...state.actions, action.payload]
            }
        }
        case AgentReducerTypes.deleteAction:{
            return {
                ...state,
                actions: state.actions.filter((config) => config.id !== action.value)
            }
        }
        case AgentReducerTypes.updateAction: {
            return {//todo check if works
                ...state,
                actions: state.actions.map((config, i ) => i === action.value ? action.payload : config)
            }
        }
        case AgentReducerTypes.setActions: {
            return {
                ...state,
                actions: action.payload
            }
        }
        case AgentReducerTypes.updateActionProbability: {
            //console.log("state: ", state.actions)
            //console.log("action: ", action)
            return {
                ...state,
                actions: state.actions.map((config) => config.id === action.index ? {...config, actionProbability: action.value} : config)
            }
        }
        case AgentReducerTypes.loadConfig: {
            return action.payload
        }
        default:{
            return state;
        }
    }
}