import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox, MenuItem, TextField } from "@mui/material";
import UserContext from "../context/UserProvider";
import { resetDoctors } from '../state/doctorsSlice'


import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDbDate } from "../Utilities/DateTime";


export default function DoctorForm(props) {

  const { entity, setEditForm } = props
 console.error('FORM_DATA: ', entity)
  const [userInfo, genders, idTypes, departments, specializations, employmentTypes] = useSelector(state => {
    return [state.userroles, state.lookups.genders, state.lookups.id_types,
    state.lookups.departments, state.lookups.specializations, state.lookups.employment_types]
  })

  const navigate = useNavigate()
  const axios = useAxiosPrivate()
  const user = useContext(UserContext)

  const [form, setForm] = useState({
    id: entity?.id ,
    first_name: entity?.User?.Contact?.first_name,
    middle_name: entity?.User?.Contact?.middle_name,
    last_name: entity?.User?.Contact?.last_name,
    email: entity?.User?.Contact?.email,
    mobile_no: entity?.User?.Contact?.mobile_no,
    phone: entity?.User?.Contact?.phone,
    position: entity?.User?.Contact?.position,
    address: entity?.User?.Contact?.address,
    created_by: entity?.created_by ?? userInfo.userId,
    contact_id: entity?.User?.Contact?.id,
    contact_type: entity?.User?.Contact?.contact_type ?? 1,
    gender_id: entity?.User?.Contact?.gender_id,
    tenant_id: userInfo?.tenantId ?? 0,

    user_name: entity?.User?.user_name ?? '',
    password: '',
    confirm_password: '',
    must_change_password: entity?.User?.must_change_password ?? false,
    user_status: entity?.User?.user_status ?? 1,

    id_type: entity?.id_type,
    id_number: entity?.id_number,
    doctor_id: entity?.id ,
    user_id: entity?.user_id,
    doctor_id_no: entity?.doctor_id_no,
    license_number: entity?.license_number,
    department: entity?.department,
    specialization: entity?.specialization,
    hightest_qualification: entity?.hightest_qualification,
    joining_date: entity?.joining_date,
    year_of_experience: entity?.year_of_experience ?? 0,
    is_active: true,
    employment_type: entity?.employment_type,
  })

  const [errors, setErrors] = useState('')
  const [joinDate, setJoinDate] = useState(form.joining_date ?? (new Date()))
  const dispatch = useDispatch()


  const [apiMessage, setApiMessage] = useState({
    success: false,
    message: ''
  })

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheck = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });

  }

  const validate = () => {
    const errs = {};
    if (!form.first_name?.trim()) errs.first_name = "Firt name is required"
    if (!form.last_name?.trim()) errs.last_name = "Last name is required"
    if (!form.mobile_no?.trim()) errs.mobile_no = "Mobile number is required";
    if (!form.gender_id) errs.gender_id = "Gender is required"
    if (!form.user_name) errs.user_name = "User name is required"
     if (!form.password) errs.password = "password is required"
    if (form.password && form.password != form.confirm_password) errs.next_kin_type = "Password did not match"
    return errs
  }


  const handleSubmit = async (event) => {
    event.preventDefault();


    let success = true
    let message = "Doctor registered successfuly"


    window.scrollTo(0, 0)
    setForm({ ...form, joining_date: getDbDate(joinDate) })
  

    const errs = validate()

    setErrors(errs)
 
    if (Object.keys(errs).length === 0) {

      let response
      try {
        response = await axios.post('/doctors/doctor', form)

        if (response.status === 200) {

          success = true
          message = 'Doctor record update successfuly!'

          setApiMessage({ success, message })
          toast.success(message)
          setEditForm()
          dispatch(resetDoctors())
          user.setState({ ...user.state, action: 4 })
          navigate('/doctors', { replace: true })
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
    navigate('/doctors', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 ">
      <div className="mx-auto max-w-7xl ">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-3xl font-bold text-slate-900">Patient Registration</h4>
            <p className=" text-slate-600">
              Capture doctor details, login info and expertise details
            </p>

          </div>


        </header>

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
                  <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>

                  <TextField
                    size="small" name="first_name" error={!!errors.first_name} helperText={errors.first_name}
                    required label="First name" value={form.first_name} onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>

                  <TextField
                    size="small" name="middle_name" label="Middle name" value={form.middle_name} onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                   />
                </div>

                <div>

                  <TextField
                    size="small" name="last_name" value={form.last_name} error={!!errors.last_name} helperText={errors.last_name} required
                    label="Last name" onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <TextField
                    size="small" select name="gender_id" label="Gender" value={form.gender_id} required
                    onChange={handleChange} error={!!errors.gender_id} helperText={errors.gender_id}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select gender</MenuItem>
                    {
                      (genders && genders.length > 0) &&
                      genders.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>


                <div>
                  <TextField
                    size="small" name="email" label="Email" value={form.email} onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <TextField
                    size="small" name="mobile_no" required type="tel" value={form.mobile_no}
                    label="Mobile phone" onChange={handleChange} error={!!errors.mobile_no} helperText={errors.mobile_no}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <TextField
                    size="small" select name="id_type" label="ID Type" value={form.id_type}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select ID Type</MenuItem>
                    {
                      (idTypes && idTypes.length > 0) &&
                      idTypes.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>

                <div>
                  <TextField
                    size="small" name="id_number" value={form.id_number} onChange={handleChange} label="ID Number"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div> <div className="md:col-span-2">

                  <TextField
                    name="address" multiline="true" value={form.address} onChange={handleChange}
                    rows="2"
                    label="Doctor address"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>

                  <TextField
                    size="small" name="position" value={form.position} onChange={handleChange}
                    label="Occupation"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>





                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      size="small" name="joining_date" label=" Joining date" value={dayjs(joinDate)} onChange={(date) => setJoinDate(date)}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </LocalizationProvider>
                </div>

              </div>
            </section>
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Proficiency information</h2>
              <div className="mt-6 pb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>

                  <TextField
                    size="small" name="doctor_id_no" value={form.doctor_id_no} onChange={handleChange}
                    label="Doctor ID #"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <TextField
                    size="small" name="license_number" value={form.license_number} onChange={handleChange}
                    label="License number"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <TextField
                    size="small" select name="specialization" label="Specialization" value={form.specialization}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Specialization</MenuItem>
                    {
                      (specializations && specializations.length > 0) &&
                      specializations.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>
                <div>
                  <TextField
                    size="small" select name="department" label="Department" value={form.department}
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
                    size="small" name="hightest_qualification" value={form.hightest_qualification} onChange={handleChange}
                    label="Highest Qualification"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <TextField
                    size="small" name="year_of_experience" value={form.year_of_experience} onChange={handleChange}
                    label="Years Experience" type="number" slotProps={{ htmlInput: { min: 0, max: 100 } }}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <TextField
                    size="small" select name="employment_type" label="Employment type" value={form.employment_type}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Employment</MenuItem>
                    {
                      (employmentTypes && employmentTypes.length > 0) &&
                      employmentTypes.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Portal Access</h2>

              <div className="mt-6 pb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <TextField
                    size="small" name="user_name" onChange={handleChange} error={!!errors.user_name} helperText={errors.user_name}
                    label="User name" value={form.user_name}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
 <div>
                  <Checkbox
                    name="is_active"
                    checked={form.is_active}
                    onChange={handleCheck}
                  /> Allow Login
                </div>
                <div>

                  <TextField autoComplete="off"
                    size="small" name="password" label="Password" onChange={handleChange} error={!!errors.password}
                    helperText={errors.password} value={form.password} type='password'
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>

                  <TextField 
                    size="small" name="confirm_password" type="password" label="Confirm password" value={form.confirm_password}
                    onChange={handleChange} error={!!errors.confirm_password} helperText={errors.confirm_password} 
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <Checkbox
                    name="must_change_password"
                    checked={form.must_change_password}
                    onChange={handleCheck}
                  /> User must change password
                </div>



              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Actions</h2>
              <div className=" space-y-3 grid grid-cols-2" >
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700"
                    >
                      Register Doctor
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <button
                      type="button" onClick={handleCancel}
                      className="w-full rounded-2xl border border-slate-300 bg-red-700 px-5 py-3 text-sm font-medium text-white hover:bg-red-800"
                    >
                      Cancel
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
