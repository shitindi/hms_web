import React, { useContext } from 'react'
import UserContext from '../../context/UserProvider'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'



const AppointmentMenu = (prop) => {


  const user = useContext(UserContext)
  const navigate = useNavigate()
   const axios = useAxiosPrivate()
  const handleAddAppointment = () => {
    if (user.state.action===1)
      return

    user.setState({ ...user.state, action: 1 , component: 'appointments'})
  }

    const status = user.state?.entities[0]?.appointment_status ?? 6

  const checkInAppointment = async () => {
      let success = true
      let message = "Patient checked in successfuly"
  
      
      const id  =  user.state?.entity_id

 
      if (!id || id < 0){
       message = 'Error occured, plese try again later!'
        toast.error(message)
        return
      }
      
      
      try {
    
        const response = await axios.post('/appointments/check-in', { id: id })
  
        if (response.status === 200) {

          toast.success(message)
          user.setState({ ...user.state, action: 4 , component: 'appointments'})
             //navigate('/appointments', { replace: true })
          navigate(0)
        } else {
          success = false
          message = response.data
          toast.error(message)
        }
      } catch (err) {
        console.error('POST_ERROR: ', err)
        const success = false
        const message = 'ERROR: ' + err.response.data.error.message
        toast.error(message)
      }
    }

  return (
    ( prop?.data?.action !==4) ? 
     (prop?.data?.action === 2 && status ===1) ?
     <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-start">
      <button onClick={checkInAppointment}
              className="rounded-2xl border border-slate-300 bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700"
            >
              Checkin this Patient
            </button>
            </div>
     :
    <></> 
    :
    <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-start">
       <input
            type="text"
            placeholder="Search patients, doctors..."
            className="w-full lg:w-72 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
          />

          <div className="flex flex-wrap gap-2">

            <button onClick={handleAddAppointment}
              className="rounded-2xl border border-slate-300 bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700"
            >
              Add Appointment
            </button>

            {/* <button
              className="rounded-2xl border border-slate-300 bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700"
            >
              Add Appointment
            </button> */}
           
          </div>
    </div>
  )
}

export default AppointmentMenu
