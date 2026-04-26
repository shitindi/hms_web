import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    testCatalogs:  []
}


const catalogsSlice = createSlice({

    name: 'catalogs',
    initialState,
    reducers: {
        setCatalogsDetail: (state, action) => action.payload,
        
        resetCatalogs: (state) => initialState
    }
});

export default catalogsSlice.reducer
export const {setCatalogsDetail, resetCatalogs} = catalogsSlice.actions
