import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './state/store';

import { Provider } from 'react-redux';
import  {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { UserProvider } from './context/UserProvider.jsx'

//const persistor = persistStore(store)
createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
  //   <Provider store={store}>
  //     <PersistGate persistor={persistor} >
  //       <App />
  //     </PersistGate>

  //   </Provider>
  // </BrowserRouter>


  <BrowserRouter>
    <Provider store={store}>
      <UserProvider>
        <App />
        </UserProvider>
    </Provider>
  </BrowserRouter>
)
