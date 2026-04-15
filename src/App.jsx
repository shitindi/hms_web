//import { useState } from 'react'

import './App.css'
import Login from './pages/Login'
import PatientList from './components/Patient/Patients'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Footer from './components/Footer'
import DoctorsList from './components/Doctor/Doctors'
import AppointmentsList from './components/Patient/Appointments'
import NotFoundPage from './pages/NoMatch'
import Logout from './components/Logout'
import DashboardContainer from './components/DashboardContainer'
import PatientDetails from './components/Patient/PatientDetails'

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
            <Route path='/' element={  <DashboardContainer />} />
            <Route path='/patients' element={<PatientList />} />
            <Route path='/doctors' element = {<DoctorsList />}/>
            <Route path='/appointments' element={<AppointmentsList />} />
            <Route path='/patientview' element = {<PatientDetails />}/>
           </Route>
           <Route path='Login' element={<Login />} />
           <Route path='logout' element={<Logout />} />
           <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
