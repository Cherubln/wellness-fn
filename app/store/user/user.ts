import { createSlice } from "@reduxjs/toolkit";

const userInfo= createSlice({
    name: "userInfo",
    initialState: {
        user: {
            name: "",
            phone:"",
            email:"",
            gender:"",
            points: 0,
            favoriteActivity:'',
            hasScanned: [],
            isActive: false,
            type:"inActive"
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.user= action.payload;
        },
    },
})


export const {setUser}= userInfo.actions;
export default userInfo.reducer;