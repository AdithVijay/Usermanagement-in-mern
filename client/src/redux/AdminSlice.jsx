import { createSlice } from "@reduxjs/toolkit";



const adminSlice = createSlice({
    name:"admin",
    initialState:{
        admin:JSON.parse(localStorage.getItem('key')) || null
    },
    reducers:{
        addAdmin:(state,action)=>{
            state.admin = action.payload,
            localStorage.setItem('key',JSON.stringify(action.payload))
        }
    }
})

export const {addAdmin} = adminSlice.actions
export default adminSlice.reducer;