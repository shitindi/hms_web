import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAgeFromBod } from "../../Utilities/DateTime";

export default function PatientDetails() {
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const axios = useAxiosPrivate()
  const [entity, setEntity] = useState({})

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
  };

  const [modalOpen, setModalOpen] = useState(false)



  useEffect(() => {

    if (user.state.component !== 'patientview' && user.state.entity_id < 1) {
      // user.setState({component: 'home', action: 4})
      navigate('/')
      return
    }

  
       const fetchAppoitments = async () => {
          try {
            console.error('INAPENYA')
            setModalOpen(true)
            const entityResult = await axios.get(`/appointments/appointments/${user.state.entity_id}`)
            
            if (entityResult.status === 200) {
              setEntity(entityResult.data)
              window.scrollTo(0, 0)
            } else {

              const message = 'Unable to get list of items: error - ' + entityResult.status
              toast.error(message)
            }
          } catch (err) {
            console.error('CATCH: ', err)
            const message = err.response?.data?.error.message
            toast.error(message)
          }
          setModalOpen(false)
        }
    
        fetchAppoitments()
  }, [])

   console.error('ENTITY: ', entity)
  const patient = {
    id: entity?.Patient?.registration_no ?? 'not set',
    name: entity?.Patient?.Contact?.first_name + ' ' + entity?.Patient?.Contact?.last_name,
    gender: entity?.Patient?.Contact.Gender.name,
    age: getAgeFromBod(entity?.Patient?.birth_date),
    dateOfBirth: entity?.Patient?.birth_date,
    bloodGroup: entity?.Patient?.BloodGroup.name,
    phone: entity?.Patient?.Contact?.mobile_no,
    email: entity?.Patient?.Contact?.email,
    address: entity?.Patient?.Contact?.address, 
    department: entity?.Department?.name,
    doctor: 'Dr. ' + entity?.Doctor?.User?.Contact.first_name + ' ' + entity?.Doctor?.User?.Contact.first_name,
    visitType: entity?.AppointmentType?.name,
    status:  entity?.Patient?.CurrentActivity?.name,
    insurance: entity?.Patient?.Insurer?.name ?? 'Cash',
    emergencyContact: `${entity?.next_kin_name} • ${entity?.next_kin_phone}`,
  }; 

  const vitals = [
    { label: 'Temperature', value: '37.2°C' },
    { label: 'Blood Pressure', value: '118/76 mmHg' },
    { label: 'Pulse Rate', value: '78 bpm' },
    { label: 'Weight', value: '64 kg' },
  ];

  const visits = [
    {
      date: '27 Mar 2026',
      doctor: 'Dr. Michael',
      department: 'General Medicine',
      diagnosis: 'Malaria - uncomplicated',
      status: 'Current Visit',
    },
    {
      date: '14 Feb 2026',
      doctor: 'Dr. Esther',
      department: 'Orthopedics',
      diagnosis: 'Lower back pain',
      status: 'Completed',
    },
    {
      date: '05 Jan 2026',
      doctor: 'Dr. Joseph',
      department: 'Cardiology',
      diagnosis: 'Routine review',
      status: 'Completed',
    },
  ];

  const prescriptions = [
    {
      drug: 'Artemether/Lumefantrine',
      dosage: '4 tablets twice daily for 3 days',
      prescribedBy: 'Dr. Michael',
      date: '27 Mar 2026',
    },
    {
      drug: 'Paracetamol 500mg',
      dosage: '1 tablet every 8 hours for 5 days',
      prescribedBy: 'Dr. Michael',
      date: '27 Mar 2026',
    },
  ];

  const labResults = [
    {
      test: 'Malaria Rapid Test',
      result: 'Positive',
      date: '27 Mar 2026',
      status: 'Reviewed',
    },
    {
      test: 'Full Blood Count',
      result: 'Mild anemia',
      date: '27 Mar 2026',
      status: 'Pending Follow-up',
    },
  ];

  const notes = [
    'Patient presented with fever, headache, and body weakness for 2 days.',
    'Hydration advised and antimalarial treatment started immediately.',
    'Follow-up visit recommended after completion of medication.',
  ];

  const getStatusClasses = (status) => {
    if (status === 'Active' || status === 'Reviewed' || status === 'Current Visit') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Pending Follow-up') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
         <Modal
              open={modalOpen}
            >
              <Box sx={style}>
                <BounceLoader color="#0096FF" />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Loading...
                </Typography>
              </Box>
            </Modal>
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Patients / Medical Record / Details</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Patient Details & Medical Record</h1>
            <p className="mt-2 text-slate-600">
              Review patient demographics, visit history, prescriptions, lab results, and clinical notes in one place.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Print Record
            </button>
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Edit Patient
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              New Consultation
            </button>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="xl:col-span-3 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-xl font-bold text-sky-700">
                    AH
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">Patient ID: {patient.id}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {patient.gender} • {patient.age} years • DOB: {patient.dateOfBirth}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 sm:min-w-[280px]">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Department</div>
                    <div className="mt-1">{patient.department}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Doctor</div>
                    <div className="mt-1">{patient.doctor}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Blood Group</div>
                  <div className="mt-1 text-slate-600">{patient.bloodGroup}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Phone</div>
                  <div className="mt-1 text-slate-600">{patient.phone}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Insurance</div>
                  <div className="mt-1 text-slate-600">{patient.insurance}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Visit Type</div>
                  <div className="mt-1 text-slate-600">{patient.visitType}</div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Current Vitals</h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {vitals.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm text-slate-500">{item.label}</div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Visit History</h2>
                <p className="mt-1 text-sm text-slate-500">Recent consultations and encounter history.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Date</th>
                      <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                      <th className="px-6 py-4 text-left font-semibold">Department</th>
                      <th className="px-6 py-4 text-left font-semibold">Diagnosis</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.map((visit) => (
                      <tr key={visit.date + visit.doctor} className="border-t border-slate-100">
                        <td className="px-6 py-4">{visit.date}</td>
                        <td className="px-6 py-4">{visit.doctor}</td>
                        <td className="px-6 py-4">{visit.department}</td>
                        <td className="px-6 py-4">{visit.diagnosis}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(visit.status)}`}>
                            {visit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Prescriptions</h2>
                <div className="mt-5 space-y-4">
                  {prescriptions.map((item) => (
                    <div key={item.drug + item.date} className="rounded-2xl border border-slate-200 p-4">
                      <div className="font-semibold text-slate-900">{item.drug}</div>
                      <div className="mt-1 text-sm text-slate-600">{item.dosage}</div>
                      <div className="mt-2 text-xs text-slate-500">
                        {item.prescribedBy} • {item.date}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Laboratory Results</h2>
                <div className="mt-5 space-y-4">
                  {labResults.map((item) => (
                    <div key={item.test + item.date} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{item.test}</div>
                          <div className="mt-1 text-sm text-slate-600">{item.result}</div>
                          <div className="mt-2 text-xs text-slate-500">{item.date}</div>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Patient Contacts</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Email</div>
                  <div className="mt-1">{patient.email}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Address</div>
                  <div className="mt-1">{patient.address}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Emergency Contact</div>
                  <div className="mt-1">{patient.emergencyContact}</div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Clinical Notes</h2>
              <div className="mt-5 space-y-3">
                {notes.map((note) => (
                  <div key={note} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    {note}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Start Consultation
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Add Prescription
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Request Lab Test
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Book Follow-up
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Create Invoice
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
