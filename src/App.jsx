import { useState } from 'react'

import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PatientRegistration from './components/PatientRegistration'
import Appointment from './components/Apointment'
import PatientList from './components/PatientList'
import PatientDetails from './components/PatiendDetails'
import DoctorRegistration from './components/Doctor'
import MainLayout from './components/MainLayout'
import MainLayoutAlt from './components/MainLayouAlt'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {
      /*
        <Login />
           
         <Appointment />
         <PatientDetails />
         <PatientList /> 
         <PatientRegistration />
         <DoctorRegistration />
            
                    <MainLayoutAlt />  

         
 <Dashboard />
  <MainLayout />
      */
       <Appointment />
      

      
    }
    
     
    </>
  )
}

export default App
