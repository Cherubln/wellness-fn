import { createSlice } from "@reduxjs/toolkit";

const scanResults = createSlice(
    {
        name: "scanResults",
        initialState: {
            results:
            {
                results: 0,
                message: "",
            }
        },
        reducers: {
            addResult: (state, action) => {
                state.results = action.payload;
            },
        },
    }
)

export const { addResult } = scanResults.actions;
export default scanResults.reducer;