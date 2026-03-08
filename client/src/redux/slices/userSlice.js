import {createSlice} from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

    let initValue = {
    role: null
}

try{
    const decode = jwtDecode(localStorage.getItem("token"))
   initValue.role = decode.role
}
catch(error){
    console.log(error);
}

const userSlice = createSlice({
    name:"role",
    initialState:initValue,
    reducers:{
        setToAdmin:(state, action)=>{
            state.role = "Admin"
        },
        setToUser:(state, action)=>{
            state.role = "User"
        }
    }
})

export const {setToAdmin, setToUser} = userSlice.actions
export default userSlice.reducer
