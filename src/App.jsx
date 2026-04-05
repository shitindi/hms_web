import { useState } from 'react'

import './App.css'
import Login from './pages/Login'
import Dashboard from './components/Dashboard'
import PatientRegistration from './components/PatientForm'
import Appointment from './components/Apointment'
import PatientList from './components/Patients'
import PatientDetails from './components/PatientDetails'
import DoctorRegistration from './components/Doctor'
import MainLayout from './components/MainLayout'
import MainLayoutAlt from './components/MainLayouAlt'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

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
        
        <Appointment />
            <MainLayout />  
      */}

  return (
    <>
        <Routes>
           <Route element= {<RequireAuth allowedRoles={[10000000]} />} >
            <Route path='/' element={<Dashboard />} />
            <Route path='/patients' element={<PatientList />} />
           </Route>
           <Route path='Login' element={<Login />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
