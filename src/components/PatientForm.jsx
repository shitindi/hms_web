import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MenuItem, TextField } from "@mui/material";
import UserContext from "../context/UserProvider";
import {resetPatients} from '../state/patientsSlice'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDbDate } from "../Utilities/DateTime";


export default function PatientForm(props) {

  const { entity, isEdit, setEditForm } = props

  const [userInfo, genders, idTypes, maritalStatuses, bloodGroups, insurers] = useSelector(state => {
    return [state.userroles, state.lookups.genders, state.lookups.id_types,
    state.lookups.marital_statuses, state.lookups.blood_groups, state.lookups.insurers]
  })

  const navigate = useNavigate()
  const axios = useAxiosPrivate()
  const user = useContext(UserContext)

  const [form, setForm] = useState({
    id: entity?.id ?? 0,
    first_name: entity?.Contact?.first_name,
    middle_name: entity?.Contact?.middle_name,
    last_name: entity?.Contact?.last_name,
    email: entity?.Contact?.email,
    mobile_no: entity?.Contact?.mobile_no,
    phone: entity?.Contact?.phone,
    position: entity?.Contact?.position,
    address: entity?.Contact?.address,
    created_by: entity?.CreatedBy?.id ?? userInfo.userId,
    contact_id: entity?.Contact?.id,
    contact_type: entity?.Contact?.contact_type ?? 3,
    gender_id: entity?.Contact?.gender_id,
    tenant_id: userInfo?.tenantId ?? 0,

    id_type: entity?.id_type,
    id_number: entity?.id_number,
    marital_status: entity?.marital_status,
    birth_date: entity?.birth_date ,
    blood_group: entity?.blood_group,
    next_kin_name: entity?.next_kin_name,
    next_kin_type: entity?.next_kin_type,
    next_kin_phone: entity?.next_kin_phone,
    joining_date: entity?.joining_date,
    current_activity: entity?.current_activity ?? 1,
    is_active: true,
    insurer_id: entity?.insurer_id,
    insurance_number: entity?.insurance_number
  })

  const [errors, setErrors] = useState('')
  const [dob, setDoB] = useState(form.birth_date ?? (new Date()))
  const [joinDate, setJoinDate] = useState(form.joining_date ?? (new Date()))
  const dispatch = useDispatch()

  let api_message = {
    success: false,
    message: ''
  }

  const [apiMessage, setApiMessage] = useState({})

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value })
  }


  const validate = () => {
    const errs = {};
    if (!form.first_name?.trim()) errs.first_name = "Firt name is required"
    if (!form.last_name?.trim()) errs.last_name = "Last name is required"
    if (!form.mobile_no?.trim()) errs.mobile_no = "Mobile number is required";
    if (!form.gender_id) errors.gender_id = "Gender is required"
    if (!form.birth_date) errors.birth_date = "Birthdate is required"
    if (!form.next_kin_name) errors.next_kin_name = "Next of kin is required"
    if (!form.next_kin_type) errors.next_kin_type = "Next of kin relation is required"
    if (!form.next_kin_phone) errors.next_kin_phone = "Next of kin phone is required"
    return errs
  }
 

  const handleSubmit = async (event) => {
    event.preventDefault();
  

    api_message.success = true
    api_message.message = "Patient registered successfuly"


    window.scrollTo(0, 0)

   form.birth_date= getDbDate( dob)
     form.joining_date= getDbDate( joinDate)

    const errs = validate()
    setErrors(errs)

    if (Object.keys(errs).length === 0) {

      let response
      try {
        response = await axios.post('/patients/patient', form)

        if (response.status === 200) {

          api_message.success = true
          api_message.message = 'Patient record update successfuly!'

          setApiMessage(api_message)
          toast.success(api_message.message)
          setEditForm()
          dispatch(resetPatients())
          user.setState({...user.state, action: 4})
          navigate('/patients', { replace: true })
        } else {
          api_message.success = false
          api_message.message = response.data
          setApiMessage(api_message)
          toast.error(api_message)
        }
      } catch (err) {
        console.error('POST_ERROR: ', err)
        api_message.success = false
        api_message.message ='ERROR: ' + err.response.data.error.message
        toast.error(api_message.message)
      }
    }


  };

  const handleCancel = (e) => {

    window.scrollTo(0, 0)
    setEditForm()
    user.setState({ ...user.state, action: 4 })
    navigate('/patients', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 ">
      <div className="mx-auto max-w-7xl ">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-3xl font-bold text-slate-900">Patient Registration</h4>
            <p className=" text-slate-600">
              Capture patient details, emergency contacts, insurance information, and initial visit data.
            </p>

          </div>


        </header>

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-6 xl:grid-cols-3">

          <div className="xl:col-span-3 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="mb-2 text-red-800">
                  {!api_message.success ? api_message.message : ''}
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker

                      size="small" required name="birth_date" value={dayjs(dob)} label="Date of birth"
                      onChange={(date)=>setDoB(date)} error={!!errors.birth_date} helperText={errors.birth_date}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </LocalizationProvider>
                  
                </div>

                <div>

                  <TextField
                    size="small" name="position" value={form.position} onChange={handleChange}
                    label="Occupation"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>


                <div className="md:col-span-2">

                  <TextField
                    name="address" multiline="true" value={form.address} onChange={handleChange}
                    rows="2"
                    label="Patient address"
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
                </div>

                <div>
                  <TextField
                    size="small" select name="marital_status" label="Marital status" value={form.marital_status}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    {
                      (maritalStatuses && maritalStatuses.length > 0) &&
                      maritalStatuses.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>

                <div>
                  <TextField
                    size="small" select name="blood_group" label="Blood group" value={form.blood_group}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Group</MenuItem>
                    {
                      (bloodGroups && bloodGroups.length > 0) &&
                      bloodGroups.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>

                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    size="small" name="joining_date" label=" Joining date" value={dayjs(joinDate)} onChange={(date)=>setJoinDate(date)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  </LocalizationProvider>
                </div>

              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Emergency Contact & Insurance</h2>

              <div className="mt-6 pb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <TextField
                    size="small" name="next_kin_name" onChange={handleChange} error={!!errors.next_kin_name} helperText={errors.next_kin_name}
                    label="Next of kin" value={form.next_kin_name}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>

                  <TextField
                    size="small" name="next_kin_type" label="Relation" placeholder="e.g. Mother, Brother, Spouse"
                    onChange={handleChange} error={!!errors.next_kin_type} helperText={errors.next_kin_type} value={form.next_kin_type}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>

                  <TextField
                    size="small" name="next_kin_phone" type="tel" label="Next of kin phone" value={form.next_kin_phone}
                    onChange={handleChange} error={!!errors.next_kin_phone} helperText={errors.next_kin_phone}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <TextField
                    size="small" select name="insurer_id" label="Insurer" value={form.insurer_id}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Insurer</MenuItem>
                    {
                      (insurers && insurers.length > 0) &&
                      insurers.map(item => <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>

                <div>
                  <TextField
                    size="small" name="insurance_number" type="tel" label="Insurance No" value={form.insurance_number}
                    onChange={handleChange} 
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>


                  <TextField
                    size="small" select name="payment_type" label="Payment type" 
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <MenuItem value="">Select Insurer</MenuItem>
                    <MenuItem value={1} key={1}>Cash</MenuItem>
                    <MenuItem value={2} key={2}>Insurance</MenuItem>
                    <MenuItem value={3} key={3}>Mobile Money</MenuItem>
                    <MenuItem value={5} key={5}>Corporate</MenuItem>
                  </TextField>
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
                      Register Patient
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
