//import { useState } from 'react'

import './App.css'
import Login from './pages/Login'
import Dashboard from './components/Dashboard'
import PatientList from './components/Patient/Patients'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Footer from './components/Footer'
import DoctorsList from './components/Doctor/Doctors'
import AppointmentsList from './components/Patient/Appointments'
import NotFoundPage from './pages/NoMatch'
import DoctorDashboard from './components/Dashboards/DoctorDashboard'
import DoctorConsultation from './components/Doctor/DoctorConsultation'
import LabRequestAndResults from './components/Doctor/LabRequestResult'
import NursingStation from './components/NursingStation'
import PharmacyDispensing from './components/PharmacyDispensing'
import BillingInvoicing from './components/BillingInvoicing'
import DischargeManagement from './components/DischargeManagement'
import PatientMedicalHistoryScreen from './components/Patient/PatientMedicalHistory'
import PatientMedicalHistory from './components/Patient/PatientMedicalHistory'

function Test() {
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



            <DoctorDashboard />
             <DoctorConsultation />
             <LabRequestAndResults />
              <NursingStation />
               <PharmacyDispensing />
             <BillingInvoicing />
      */}

  return (
    
   <PatientMedicalHistory />
  )
}

export default Test
