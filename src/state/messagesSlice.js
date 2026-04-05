import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    licenseInfo: ''
}


const messagesSlice = createSlice({

    name: 'messages',
    initialState,
    reducers: {
        setLicenseInfo: (state, action) =>{
            state.licenseInfo = action.payload
        },
        resetMessages: (state) => initialState
    }
});

export default messagesSlice.reducer
export const {setLicenseInfo, resetMessages} = messagesSlice.actions