import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    patients:  []
}


const patientssSlice = createSlice({

    name: 'patients',
    initialState,
    reducers: {
        setPatientsDetail: (state, action) => action.payload,
        
        resetPatients: (state) => initialState
    }
});

export default patientssSlice.reducer
export const {setPatientsDetail, resetPatients} = patientssSlice.actions
