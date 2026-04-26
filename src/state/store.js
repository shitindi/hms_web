
import tokenReducer from './tokenSlice';
import messageReducer from './messagesSlice';
import userReducer from './userSlice';
import lookups from './lookupsSlice'
import doctorSlice from './doctorsSlice'
import patientsSlice from './patientsSlice'
import appointmentSlice from './appointmentSlice'
import labTestCatalogSlice from './labTestCatalogsSlice'

import storage from 'redux-persist/es/storage'
import {persistReducer ,
     FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist';
import { configureStore , combineReducers} from  '@reduxjs/toolkit';


//const reduxLogger = require('redux-logger')
//const logger = reduxLogger.createLogger()

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    //timeout: null,


}


const reducer = combineReducers(
{
    token: tokenReducer,
    messages: messageReducer,
    userroles: userReducer,
    lookups: lookups,
    doctors: doctorSlice,
    patients: patientsSlice,
    appointments: appointmentSlice,
    testCatalogs: labTestCatalogSlice
}
)

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    /*
    reducer: {
        token: tokenReducer,
        messages: messageReducer,
        userroles: userReducer
    },
    */
})

export default  store