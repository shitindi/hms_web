import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox, MenuItem, TextField } from "@mui/material";
import UserContext from "../../context/UserProvider";


import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDbDate, getStringDate, getTimeFromDate } from "../../Utilities/DateTime";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { generateRandomNo } from "../../Utilities/misc";
import { resetAppointments } from "../../state/appointmentSlice";


export default function AppointmentFormModal({ setOpen, entity, setModal }) {

  //const { entity, setEditForm } = props
  const feeRef = useRef()
  const [userInfo, doctors, patients, departments, visitTypes, appointmentPriorities, appoitmentStatuses] = useSelector(state => {
    return [state.userroles, state.doctors, state.patients, state.lookups.departments, state.lookups.appointment_types,
    state.lookups.priorities, state.lookups.appointment_statuses]
  })

  const navigate = useNavigate()
  const axios = useAxiosPrivate()
  const user = useContext(UserContext)
  const [form, setForm] = useState({
    id: entity?.id,
    tenant_id: userInfo.tenantId,
    patient_id: entity?.patient_id,
    visit_type: entity?.visit_type,
    department_id: entity?.department_id,
    doctor_id: entity?.doctor_id,
    appointment_date: entity?.appointment_date,
    priority: entity?.priority ?? 1,
    appointment_reason: entity?.appointment_reason,
    appointment_status: entity?.appointment_status ?? 1,
    notification_notes: entity?.notification_notes,
    sms_notification: entity?.sms_notification ?? false,
    email_notification: entity?.email_notification ?? false,
    appointment_no: entity?.appointment_no,
    created_by: entity?.created_by ?? userInfo.userId,
    appointment_fee: entity?.appointment_fee ?? 0,
    current_activity: entity?.PatientActivity.name ?? 'NA',
    appointment_date: getStringDate(entity?.appointment_date),
    appointment_time: getTimeFromDate(entity?.appointment_date)
  })

  const [errors, setErrors] = useState('')
  const [appointmentDate, setAppointmentDate] = useState(form.appointment_date ?? (new Date()))
  const [appointmentTime, setAppointmentTime] = useState(dayjs(form.appointment_date))
  const dispatch = useDispatch()


  const [apiMessage, setApiMessage] = useState({
    success: false,
    message: ''
  })

  const handleChange = (e) => {
    // if (e.target.name == 'doctor_id') {
    //   const doctorId = e.target.value
    //   const doctor = doctors.find(dr => dr.id == doctorId)
    //   setForm({ ...form, [e.target.name]: e.target.value, appointment_fee: doctor?.consultation_fee ?? 0 })

    // } else {
    //   setForm({ ...form, [e.target.name]: e.target.value })
    // }
    return
  }

  const handleCheck = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });

  }

  const handleClose = () => {
    setOpen(false)
    setModal({
      Component: null,
      modelOpen: false
    })
  }


  const validate = () => {
    const errs = {};
    if (!form.patient_id) errs.patient_id = "Patient is required"
    if (!form.visit_type) errs.visit_type = "Visit type is required"
    if (!(form.doctor_id >= 0)) errs.doctor_id = "Doctor is required";
    if (!form.appointment_date?.trim()) errs.appointment_date = "Appointment date is required";
    if (!form.appointment_no) errs.appointment_no = "Appointment number is required"
    return errs
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    return

    let success = true
    let message = "Appointment registered successfuly"


    window.scrollTo(0, 0)
    // setForm({ ...form, 
    //   appointment_date: getDbDate( appointmentDate) + ' ' + getTimeFromDate( appointmentTime),
    //   appointment_no:  generateRandomNo (1000, 10000 )
    // })

    form.appointment_date = getDbDate(appointmentDate) + ' ' + getTimeFromDate(appointmentTime),
      form.appointment_no = generateRandomNo(1000, 10000).toString()

    const errs = validate()

    setErrors(errs)

    if (Object.keys(errs).length === 0) {

      let response
      try {
        response = await axios.post('/appointments/appointment', form)

        if (response.status === 200) {

          success = true
          message = 'Appointment record update successfuly!'

          setApiMessage({ success, message })
          toast.success(message)
          setEditForm()
          dispatch(resetAppointments())
          user.setState({ ...user.state, action: 4 })
          navigate('/appointments', { replace: true })
        } else {
          success = false
          message = response.data
          setApiMessage({ success, message })
          toast.error(message)
        }
      } catch (err) {
        console.error('POST_ERROR: ', err)
        success = false
        message = 'ERROR: ' + err.response.data.error.message
        toast.error(message)
      }
    }


  };

  const handleCancel = () => {


    window.scrollTo(0, 0)
    setEditForm()
    user.setState({ ...user.state, action: 4 })
    navigate('/appointments', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 ">
      <div className="mx-auto max-w-7xl ">

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-6 xl:grid-cols-3">

          <div className="xl:col-span-3 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="mb-2 text-red-800">
                  {!apiMessage.success ? apiMessage.message : ''}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Appointment Details</h2>
                </div>

              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" name="appointment_no" required type="text" value={form.appointment_no}
                    label="Appointment No." onChange={handleChange} error={!!errors.appointment_no} helperText={errors.appointment_no}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" name="appointment_date" required type="text" value={form.appointment_date}
                    label="Appointment date" onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" name="appointment_time" required type="text" value={form.appointment_time}
                    label="Appointment time" onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" select name="patient_id" label="Patient" value={form.patient_id}
                    onChange={handleChange} error={!!errors.patient_id} helperText={errors.patient_id}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Patient</MenuItem>
                    {
                      (patients && patients.length > 0) &&
                      patients.map(item => <MenuItem value={item.id} key={item.id}>
                        {item?.Contact.first_name + ', ' + item?.Contact.last_name + ' - (' + item?.registration_no + ')'}
                      </MenuItem>)
                    }
                  </TextField>
                </div>

                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" select name="doctor_id" label="Doctor" value={form.doctor_id}
                    onChange={handleChange} error={!!errors.doctor_id} helperText={errors.doctor_id}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Doctor</MenuItem>
                    {
                      (doctors && doctors.length > 0) &&
                      doctors.map(item => <MenuItem value={item.id} key={item.id}>
                        {item?.User?.Contact.first_name + ', ' + item?.User?.Contact.last_name + ' - (' + item?.Department.name + ')'}
                      </MenuItem>)
                    }
                  </TextField>
                </div>

                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" select name="visit_type" label="Visit type" value={form.visit_type} required
                    onChange={handleChange} error={!!errors.visit_type} helperText={errors.visit_type}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Visit type</MenuItem>
                    {
                      (visitTypes && visitTypes.length > 0) &&
                      visitTypes.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>


                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" select name="priority" label="Priority" value={form.priority}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Priority</MenuItem>
                    {
                      (appointmentPriorities && appointmentPriorities.length > 0) &&
                      appointmentPriorities.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>

                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" select name="department_id" label="Department" value={form.department_id}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Department</MenuItem>
                    {
                      (departments && departments.length > 0) &&
                      departments.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>

                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" select name="appointment_status" label="Status" value={form.appointment_status}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Set Initial Status</MenuItem>
                    {
                      (appoitmentStatuses && appoitmentStatuses.length > 0) &&
                      appoitmentStatuses.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>
                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" name="appointment_fee" type="number" value={form.appointment_fee}
                    label="Appointment Fee" onChange={handleChange} ref={feeRef}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    size="small" name="current_activity" value={form.current_activity}
                    label="File location" onChange={handleChange} ref={feeRef}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <TextField
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    name="appointment_reason" multiline="true" value={form.appointment_reason} onChange={handleChange}
                    rows="2"
                    label="Appointment reason"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>



            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Actions</h2>
              <div className=" space-y-3 grid grid-cols-2" >
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <button
                      type="button" onClick={handleClose}
                      className="w-full rounded-2xl border border-slate-300 bg-red-700 px-5 py-3 text-sm font-medium text-white hover:bg-red-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>

          <div className="space-y-6">





          </div>
        </form>
      </div >
    </div >
  );
}
