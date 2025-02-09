import {ExperimentReducerTypes} from "./types/ExperimentReducerTypes";
import {ExperimentTestConfig, initialExperimentConfigState} from "../ExperimentConfigData";

/*
Es muy importante que no mutemos el estado
cuando trabajemos con arreglos, usa filter o
otra cosa
 */

export const ExperimentReducer = (state, action) => {
    switch (action.type) {
        case ExperimentReducerTypes.setExperimentName:{
            return {
                ...state,
                experimentName: action.value
            }
        }
        case ExperimentReducerTypes.setRepetitions:{
            return {
                ...state,
                repetitions: action.value
            }
        }
        case ExperimentReducerTypes.setDescription:{
            return {
                ...state,
                description: action.value
            }
        }
        case ExperimentReducerTypes.setExperimentType:{
            return {
                ...state,
                experimentType: action.value
            }
        }
        case ExperimentReducerTypes.setNetworkSize:{
            return {
                ...state,
                networkSize: action.value
            }
        }
        case ExperimentReducerTypes.setSeedSize:{
            return {
                ...state,
                seedSize: action.value
            }
        }
        case ExperimentReducerTypes.setEssentialData:{
            return {
                ...state,
                essentialData: action.value
            }
        }
        case ExperimentReducerTypes.setDetailedData:{
            return {
                ...state,
                detailedData: action.value
            }
        }
        case ExperimentReducerTypes.resetConfig:{
            return {
                initialExperimentConfigState
            };
        }
        case ExperimentReducerTypes.deleteAgentConfig:{
            return {
                ...state,
                agentsConfigs: state.agentsConfigs.filter((config) => config.id !== action.id)
            }
        }
        case ExperimentReducerTypes.addAgentConfig:{
            return {
                ...state,
                agentsConfigs: [...state.agentsConfigs, action.payload]
            };
        }
        case ExperimentReducerTypes.setAgentConfigs:{
            return {
                ...state,
                agentsConfigs: action.payload
            }
        }
        case ExperimentReducerTypes.updateAgentConfig:{
            return {
                ...state,
                agentsConfigs: state.agentsConfigs.map(config => config.id === action.id ? action.payload:config)
            }
        }
        case ExperimentReducerTypes.useTestExperimentConfig:{
            return ExperimentTestConfig;
        }
        //TODO update Agent Config
        default:
            return state;
    }
};
