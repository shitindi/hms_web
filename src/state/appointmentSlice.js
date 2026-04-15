import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    appoitments:  []
}


const  appointmentssSlice = createSlice({

    name: 'appoitments',
    initialState,
    reducers: {
        setAppointmentsDetail: (state, action) => action.payload,
        
        resetAppointments: (state) => initialState
    }
});

export default appointmentssSlice.reducer
export const {setAppointmentsDetail, resetAppointments} = appointmentssSlice.actions
