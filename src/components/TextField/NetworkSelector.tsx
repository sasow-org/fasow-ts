import * as React from "react";
import {TextField} from "@mui/material";
import {useExperimentConfigContext} from "../../context/ExperimentConfigProvider";
import {ExperimentReducerTypes} from "../../context/reducer/types/ExperimentReducerTypes";
import {ChangeEvent} from "react";

const networkOptions = [
    {
        value: "TwitterConfig",
        label: "Twitter"
    },
    {
        value: "FacebookConfig",
        label: "Facebook"
    }
]

export default function NetworkSelector() {


    const {experimentConfig, experimentDispatch} = useExperimentConfigContext()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        experimentDispatch({
            type: ExperimentReducerTypes.setExperimentType,
            value: event.target.value
        })
    }

    return(
        <TextField
            id="outlined-select-currency-native"
            select
            label="Network to Simulate"
            value={experimentConfig.experimentType}
            onChange={handleChange}
            SelectProps={{
                native: true,
            }}
            helperText="Please select your Network"
            variant="filled"
            fullWidth
        >
            {networkOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </TextField>
    )
}