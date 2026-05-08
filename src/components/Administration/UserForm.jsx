import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox, MenuItem, TextField } from "@mui/material";
import UserContext from "../../context/UserProvider";
import { resetDoctors } from '../../state/doctorsSlice'

import { getDbDate, getStringDate } from "../../Utilities/DateTime";


export default function UserForm(props) {

  const { entity, setEditForm } = props

  const [userInfo, genders, departments, defaultRole, branches, specializations, employmentTypes] = useSelector(state => {
    return [state.userroles, state.lookups.genders, state.lookups.departments, state.lookups.default_roles,
    state.lookups.branches, state.lookups.specializations, state.lookups.employment_types]
  })

  const navigate = useNavigate()
  const axios = useAxiosPrivate()
  const user = useContext(UserContext)

  const [form, setForm] = useState({
    id: entity?.id,
    first_name: entity?.Contact?.first_name,
    middle_name: entity?.Contact?.middle_name,
    last_name: entity?.Contact?.last_name,
    email: entity?.Contact?.email,
    mobile_no: entity?.Contact?.mobile_no,
    phone: entity?.Contact?.phone,
    position: entity?.Contact?.position,
    address: entity?.Contact?.address,
    created_by: entity?.created_by ?? userInfo.userId,
    created_date: getStringDate(entity?.Contact?.createdAt ?? (new Date())),
    contact_id: entity?.Contact?.id,
    contact_type: entity?.Contact?.contact_type ?? 4,
    gender_id: entity?.Contact?.gender_id,
    tenant_id: userInfo.tenantId,
    default_branch: entity?.default_branch,
    department_id: entity?.department_id,
    joining_date: getDbDate(new Date()),
    user_name: entity?.user_name ?? '',
    password: '',
    confirm_password: '',
    must_change_password: entity?.must_change_password ?? false,
    user_status: entity?.user_status ?? 1,
    is_active: entity?.is_active,
    default_role: entity?.default_role ?? 4,

    id_type: entity?.Doctor?.id_type,
    id_number: entity?.Doctor?.id_number,
    doctor_id: entity?.Doctor?.id,
    user_id: entity?.Doctor?.user_id,
    doctor_id_no: entity?.Doctor?.doctor_id_no,
    license_number: entity?.Doctor?.license_number,
    department: entity?.Doctor?.department,
    specialization: entity?.Doctor?.specialization,
    hightest_qualification: entity?.Doctor?.hightest_qualification,
    year_of_experience: entity?.Doctor?.year_of_experience ?? 0,
    is_active: true,
    employment_type: entity?.Doctor?.employment_type,
    consultation_fee: entity?.Doctor?.consultation_fee
  })

  const [errors, setErrors] = useState('')
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
    console.error('FORM: ', form)

      if (form.default_role == 2)
        form.contact_type = 1
      else if (form.default_role == 1)
        form.contact_type == 2
      else
        form.contact_type = 4

    if (!form.first_name?.trim()) errs.first_name = "Firt name is required"
    if (!form.last_name?.trim()) errs.last_name = "Last name is required"
    if (!form.mobile_no?.trim()) errs.mobile_no = "Mobile number is required";
    if (!form.gender_id) errs.gender_id = "Gender is required"
    if (!form.user_name) errs.user_name = "User name is required"
    if (!form.password) errs.password = "password is required"
    if (form.password && form.password != form.confirm_password) errs.password = "Password did not match"
    if (!form.default_role) errs.default_role = "You must select default role"


    if (!form.year_of_experience && form.contact_type==1) errs.year_of_experience = "Year of experience is required"
    if (!form.employment_type && form.contact_type==1) errs.employment_type = "Employment type is required"

    return errs
  }


  const handleSubmit = async (event) => {
    event.preventDefault();


    let success = true
    let message = "User registered successfuly"




    const errs = validate()

    setErrors(errs)

    if (Object.keys(errs).length === 0) {
      window.scrollTo(0, 0)
    

      let response
      try {
        response = await axios.post('/admin/user', form)

        if (response.status === 200) {

          success = true
          message = 'User record updated successfuly!'

          setApiMessage({ success, message })
          toast.success(message)
          setEditForm()
          if (form.default_role == 2)
            dispatch(resetDoctors())

          user.setState({ ...user.state, action: 4 })
          navigate('/staffs', { replace: true })
              window.location.reload();
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
    navigate('/staffs', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 ">
      <div className="mx-auto max-w-7xl ">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-3xl font-bold text-slate-900">User Registration</h4>
            <p className=" text-slate-600">
              Capture User details and login info
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
                    size="small" select name="default_branch" label="Branch" value={form.default_branch}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {
                      (branches && branches.length > 0) &&
                      branches.map(item => <MenuItem value={item.id} key={item.id}>{item.branch_name}</MenuItem>)
                    }
                  </TextField>
                </div>
                <div>
                  <TextField
                    size="small" select name="department_id" label="Department" value={form.department_id}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {
                      (departments && departments.length > 0) &&
                      departments.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>

                <div className="md:col-span-2">

                  <TextField
                    name="address" multiline="true" value={form.address} onChange={handleChange}
                    rows="2"
                    label="Address"
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
                  <TextField
                    size="small" name="crated_date" label=" Created date" value={form.created_date}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
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
                  <TextField
                    size="small" select name="default_role" label="Default Role" value={form.default_role} required
                    onChange={handleChange} error={!!errors.default_role} helperText={errors.default_role}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {
                      (defaultRole && defaultRole.length > 0) &&
                      defaultRole.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
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
                    name="is_active"
                    checked={form.is_active}
                    onChange={handleCheck}
                  /> Allow Login
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
            {
              form.default_role == 2 ? <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
                      error={!!errors.year_of_experience} helperText={errors.year_of_experience}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <TextField
                      size="small" select name="employment_type" label="Employment type" value={form.employment_type}
                      onChange={handleChange} error={!!errors.employment_type} helperText={errors.employment_type}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <MenuItem value="">Select Employment</MenuItem>
                      {
                        (employmentTypes && employmentTypes.length > 0) &&
                        employmentTypes.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                      }
                    </TextField>
                  </div>
                  <div>
                    <TextField
                      size="small" name="consultation_fee" value={form.consultation_fee} onChange={handleChange}
                      label="Consultation Fee" type="number"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </section> : <></>

            }
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Actions</h2>
              <div className=" space-y-3 grid grid-cols-2" >
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
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700"
                    >
                      Save User
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
