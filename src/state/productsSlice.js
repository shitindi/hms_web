import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    products:  []
}


const productsSlice = createSlice({

    name: 'products',
    initialState,
    reducers: {
        setProductsDetail: (state, action) => action.payload,
        
        resetProducts: (state) => initialState
    }
});

export default productsSlice.reducer
export const {setProductsDetail, resetProducts} = productsSlice.actions
