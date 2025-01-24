import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoggedIn : false,
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser : ((state,{payload})=>{
            state.user = payload,
            state.isLoggedIn = true
        }),
        removeUser : ((state)=>{
            state.user = null,
            state.isLoggedIn = false
        })
    }
})


export const {setUser,removeUser} = userSlice.actions

export default userSlice.reducer;