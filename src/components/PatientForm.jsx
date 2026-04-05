import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";
import { toast } from "react-toastify";
import { MenuItem, TextField } from "@mui/material";


export default function PatientForm(props) {

  const { entity, isEdit, setEditForm } = props

  const [userInfo, genders, idTypes, maritalStatuses, bloodGroups, insurers] = useSelector(state => {
    return [state.userroles, state.lookups.genders, state.lookups.id_types,
    state.lookups.marital_statuses, state.lookups.blood_groups, state.lookups.insurers]
  })

  const navigate = useNavigate()
  const axios = useAxiosPrivate()

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
    tenant_id: entity?.Contact?.tenant_id,

    id_type: entity?.id_type,
    id_number: entity?.id_number,
    marital_status: entity?.marital_status,
    birth_date: entity?.birth_date ?? "01/01/1900",
    blood_group: entity?.blood_group,
    next_kin_name: entity?.next_kin_name,
    next_kin_type: entity?.next_kin_type,
    next_kin_phone: entity?.next_kin_phone,
    joining_date: entity?.joining_date,
    current_activity: entity?.current_activity ?? 1,
    is_active: 1,
    insurer_id: entity?.insurer_id,
    insurance_number: entity?.insurance_number
  })

  const [errors, setErrors] = useState({})

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
    if (!form.first_name.trim()) errs.first_name = "Firt name is required"
    if (!form.last_name.trim()) errs.last_name = "Last name is required"
    if (!form.mobile_no.trim()) errs.mobile_no = "Mobile number is required";
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

    const errs = validate()
    setErrors(errors)

    if (Object.keys(errs).length === 0) {
      let response
      try {
        response = await axios.post('/health/patient', form)

        if (response.status === 200) {
          api_message.success = true
          api_message.message = 'Patient record update successfuly!'

          setApiMessage(api_message)
          toast.success(api_message.message)
          setEditForm()
          navigate('/patients', { replace: true })
        } else {
          api_message.success = false
          api_message.message = response.data
          setApiMessage(api_message)
          toast.error(api_message)
        }
      } catch (err) {
        api_message.success = false
        api_message = err.response.data.error.message
        toast.error(api_message.message)
      }
    }
  };

  const hanleCancel = (e) => {
    setEditForm()
    navigate('patients', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Patients / Registration</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Patient Registration</h1>
            <p className="mt-2 text-slate-600">
              Capture patient details, emergency contacts, insurance information, and initial visit data.
            </p>

          </div>


        </header>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

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
                  <p className="mt-1 text-sm text-slate-500">Basic identity and demographic details.</p>
                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
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
                    size="small" name="last_name" error={!!errors.last_name} helperText={errors.last_name} required
                    label="Last name"
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
                      (genders && genders.lenght > 0) &&
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

                    size="small" required name="birth_date" value={form.birth_date} label="Date of birth"
                    onChange={handleChange} error={!!errors.birth_date} helperText={errors.birth_date}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>

                  <TextField
                    size="small" name="position" value={form.position}
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
                      (idTypes && idTypes.lenght > 0) &&
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
                      (maritalStatuses && maritalStatuses.lenght > 0) &&
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
                      (bloodGroups && bloodGroups.lenght > 0) &&
                      bloodGroups.map(item => <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>)
                    }
                  </TextField>
                </div>

              <div>
                <TextField
                  size="small" name="joining_date"  label=" Joining date" value={form.joining_date} onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Emergency Contact & Insurance</h2>

          <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <TextField
                size="small"  name="next_kin_name" onChange={handleChange} error={!!errors.next_kin_name} helperText={errors.next_kin_name}
                label="Next of kin"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>

              <TextField
                size="small" name="next_kin_type" label="Relation" placeholder="e.g. Mother, Brother, Spouse"
                onChange={handleChange} error={!!errors.next_kin_type} helperText={errors.next_kin_type}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>

              <TextField
                size="small"  name="next_kin_phone" type="tel"  label="Next of kin phone"
                onChange={handleChange} error={!!errors.next_kin_phone} helperText={errors.next_kin_phone}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label htmlFor="insurer_id" className="mb-2 block text-sm font-medium text-slate-700">
                Insurance provider
              </label>
              <select
                id="insurer_id"
                name="insurer_id"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select provider</option>
                <option>NHIF</option>
                <option>Jubilee</option>
                <option>Strategis</option>
                <option>Heritage</option>
              </select>
            </div>

            <div>
              <label htmlFor="insurance_number" className="mb-2 block text-sm font-medium text-slate-700">
                Insurance Number
              </label>
              <input
                id="insurance_number"
                name="insurance_number"
                type="text"
                placeholder="Enter policy/member number"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label htmlFor="paymentType" className="mb-2 block text-sm font-medium text-slate-700">
                Payment Type
              </label>
              <select
                id="paymentType"
                name="paymentType"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select payment type</option>
                <option>Cash</option>
                <option>Insurance</option>
                <option>Mobile Money</option>
                <option>Corporate</option>
              </select>
            </div>


          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Actions</h2>
          <div className="mt-5 space-y-3 grid grid-cols-2" >
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
                  type="button"
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
