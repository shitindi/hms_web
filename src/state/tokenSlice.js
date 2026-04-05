import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    accessToken: '',
    refreshToken: ''
}


const tokenSlice = createSlice({

    name: 'tokens',
    initialState,
    reducers: {
        setAccessToken: (state, action) =>{
            state.accessToken = action.payload
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },
        resetTokens: (state) => initialState
    }
});

export default tokenSlice.reducer
export const {setAccessToken, setRefreshToken, resetTokens} = tokenSlice.actions