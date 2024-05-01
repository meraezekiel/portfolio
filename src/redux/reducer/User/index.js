import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_type:"frontEnd",
  userData: null,
  userLicense:null
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setType : (state,action) =>{
      state.user_type = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setUserLicense: (state, action) => {
      state.userLicense = action.payload
    }
  },
})

export const {setType,setUserData,setUserLicense} = slice.actions

export default slice.reducer