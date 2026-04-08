//import { useState } from 'react'

import './App.css'
import Login from './pages/Login'
import Dashboard from './components/Dashboard'
import PatientList from './components/Patients'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Footer from './components/Footer'
import DoctorsList from './components/Doctors'

function App() {
  //const [count, setCount] = useState(0)

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
            <Route path='/doctors' element = {<DoctorsList />}/>
           </Route>
           <Route path='Login' element={<Login />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
