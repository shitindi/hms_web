import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activation_types: [],
    tenant_statuses: [],
    user_statuses: [],
    payment_method: [],
    payment_types: [],
    regions: [],
    payment_statuses: [],
    countries: [],
    contact_types: [],

    appointment_statuses: [],
    appointment_types: [],
    blood_groups: [],
    curriences: [],
    departments: [],
    employment_types: [],
    genders: [],
    id_types: [],
    marital_statuses: [],
    priorities: [],
    specializations: [],
    order_statuses: [],
    patient_activities: [],
    billing_options: [],
    insurers: [],
    lab_test_categories: [],
    lab_result_statuses: []
}


const lookupsSlice = createSlice({

    name: 'messages',
    initialState,
    reducers: {
        setLookups: (state, action) => action.payload,
        resetLookups: () => initialState
    }
});

export default lookupsSlice.reducer
export const { setLookups, resetLookups } = lookupsSlice.actions