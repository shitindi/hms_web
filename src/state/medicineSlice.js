import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    medicines:  []
}


const medicinesSlice = createSlice({

    name: 'medicines',
    initialState,
    reducers: {
        setMedicinesDetail: (state, action) => action.payload,
        
        resetMedicines: (state) => initialState
    }
});

export default medicinesSlice.reducer
export const {setMedicinesDetail, resetMedicines} = medicinesSlice.actions
