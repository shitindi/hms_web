import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userName: '',
    userId: 0,
    tenantId: 0,
    roles: []
}


const userSlice = createSlice({

    name: 'userroles',
    initialState,
    reducers: {
        setUserDetail: (state, action) => action.payload,
        
        resetUser: (state) => initialState
    }
});

export default userSlice.reducer
export const {setUserDetail, resetUser} = userSlice.actions

