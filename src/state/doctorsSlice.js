import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    doctors:  []
}


const doctorsSlice = createSlice({

    name: 'doctors',
    initialState,
    reducers: {
        setDoctorsDetail: (state, action) => action.payload,
        
        resetDoctors: (state) => initialState
    }
});

export default doctorsSlice.reducer
export const {setDoctorsDetail, resetDoctors} = doctorsSlice.actions
