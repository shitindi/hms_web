import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';

import { setDoctorsDetail } from '../state/doctorsSlice'
import { setPatientsDetail } from '../state/patientsSlice'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import UserContext from '../context/UserProvider';
import PatientMenu from './toolmenus/PatientMenu';
import { useLocation } from 'react-router-dom';
import DoctorMenu from './toolmenus/DoctorMenu';

const Toolbox = () => {



  const axios = useAxiosPrivate()
  const dispatch = useDispatch()
  const userContext = useContext(UserContext)

  const location = useLocation()

  const [ userInfo, doctors, patients] = useSelector(state => {
    return [state.userroles,, state.doctors, state.patients]
  })

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (doctors && doctors.lenght > 0)
          return

        const entityResult = await axios.get('/doctors/doctors')
        if (entityResult.status === 200)
          dispatch(setDoctorsDetail(entityResult.data))
      } catch (err) {
        console.log('LOADING_Doctors: ', err)
      }
    }

    const fetchPatients = async () => {
      try {
        if (patients && patients.lenght > 0)
          return

        const entityResult = await axios.get('/patients/patients')
        if (entityResult.status === 200)
          dispatch(setPatientsDetail(entityResult.data))
      } catch (err) {
        console.log('LOADING_Doctors: ', err)
      }
    }

    fetchDoctors()
    fetchPatients()
  }, [])


  const selectToolMenu = ()=>{

    const url = location.pathname.replace('/','')
     switch(url)
     {
        case 'home':
          return
        case 'patients':
          return <PatientMenu data={userContext.state} />
         case 'doctors':
          return <DoctorMenu data={userContext.state} />
        default:
         // return <PatientMenu />    
     }
  }


  //const profileMenuItems = ['Profile', 'Account Settings', 'Notifications', 'Help', 'Logout'];


  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">


        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
         <ToastContainer position='top-center' />
         {
         /* 
            lOAD ELEMENT HERE
          */
          selectToolMenu()
         }

          <div className="relative">
            <button className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 hover:bg-slate-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700">
                {userInfo.userName.substring(0,1).toUpperCase()}
              </div>
              <div className="hidden text-left sm:block">
                <div className="text-sm font-semibold text-slate-900">{userInfo.userName}</div>
                <div className="text-xs text-slate-500">Active</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 text-slate-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {
              /*
                         <div className="absolute right-0 z-20 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <div className="text-sm font-semibold text-slate-900">Admin User</div>
                    <div className="mt-1 text-xs text-slate-500">admin@hospital.org</div>
                  </div>

                  <div className="pt-2">
                    {profileMenuItems.map((item) => (
                      <button
                        key={item}
                        className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm hover:bg-slate-50 ${item === 'Logout' ? 'text-red-600 hover:bg-red-50' : 'text-slate-700'
                          }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

              */
            }
          </div>
        </div>
      </div>
    </header>

  )
}

export default Toolbox
