import { useState } from 'react'

import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PatientRegistration from './components/PatientRegistration'
import Appointment from './components/Apointment'
import PatientList from './components/PatientList'
import PatientDetails from './components/PatiendDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {
      /*
        <Login />
          <Dashboard />
           <PatientRegistration />
            <Appointment />
             <PatientList />
      */
    <PatientDetails />
    
    }
    
     
    </>
  )
}

export default App
