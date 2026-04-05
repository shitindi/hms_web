
import tokenReducer from './tokenSlice';
import messageReducer from './messagesSlice';
import userReducer from './userSlice';
import lookups from './lookupsSlice'
import doctorSlice from './doctorsSlice'
import patientsSlice from './patientsSlice'

import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist';
import { configureStore , combineReducers} from  '@reduxjs/toolkit';

//const reduxLogger = require('redux-logger')
//const logger = reduxLogger.createLogger()

const persistConfig = {
    key: 'root',
    storage,

}

const reducer = combineReducers(
{
    token: tokenReducer,
    messages: messageReducer,
    userroles: userReducer,
    lookups: lookups,
    doctors: doctorSlice,
    patients: patientsSlice,
}
)

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
    /*
    reducer: {
        token: tokenReducer,
        messages: messageReducer,
        userroles: userReducer
    },
    */
})

export default  store