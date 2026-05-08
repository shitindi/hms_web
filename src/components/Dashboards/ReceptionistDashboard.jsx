import { useContext, useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { getTimeFromDate } from "../../Utilities/DateTime"
import { Box, Modal, Typography } from "@mui/material"
import { BounceLoader } from "react-spinners"
import ModalContainer from "../ModalContainer"
import AppointmentFormModal from "../Patient/AppointmentFormModal"
import { useNavigate } from "react-router-dom"
import UserContext from "../../context/UserProvider"

export default function ReceptionistDashboard() {

  //modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
  };


  const user = useContext(UserContext)

  const handleAddPatient = () => {
    user.setState({ ...user.state, action: 1, component: 'patients' })
    navigate('/patients', { replace: true })
  }

  const handleAddAppointment = () => {
    user.setState({ ...user.state, action: 1, component: 'appointments' })
    navigate('/appointments', { replace: true })
  }
  const navigate = useNavigate()
  const axios = useAxiosPrivate()
  let [entities, setEntities] = useState([])
  let [entity, setEntity] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  const [modal, setModal] = useState(
    {
      Component: null,
      modelOpen: false
    }
  )

  useEffect(() => {
    const fetchAppoitments = async () => {
      try {

        setModalOpen(true)
        const entityResult = await axios.get('/appointments/today')

        if (entityResult.status === 200) {
          setEntities(entityResult.data)
        }
      } catch (err) {
        console.error('ReceptionDash.today: ', err)
      }
      setModalOpen(false)
    }

    fetchAppoitments()
  }, [])

  const handleViewAppointment = (id) => {
    const appointment = entities.find(ent => ent.id === id)
    if (appointment) {
      setEntity(appointment)
      setModal({
        Component: AppointmentFormModal,
        modelOpen: true
      })
    }
  }

  const stats = [
    { label: "Today's Registrations", value: '32', note: '8 new patients' },
    { label: 'Waiting Queue', value: '18', note: '5 urgent cases' },
    { label: 'Appointments Today', value: '46', note: '12 checked in' },
    { label: 'Pending Payments', value: '9', note: 'Sent to billing desk' },
  ];
  const queuePatients = entities.map(ent => {
    const patient = ent?.Patient?.Contact?.first_name + ' ' + ent?.Patient?.Contact?.last_name
    const doctor = ent?.Doctor?.User?.Contact.first_name + ' ' + ent?.Doctor?.User?.Contact?.last_name
    return {

      id: ent.id,
      appointment_no: ent?.appointment_no ?? '',
      name: patient,
      department: ent?.Department.name,
      doctor: doctor,
      time: getTimeFromDate(ent?.appointment_date),
      appointment_status: ent?.appointment_status,
      status: ent?.AppointmentStatus.name,
      visitType: ent?.AppointmentType.name,
    }
  });

  const quickActions = [
    { id: 1, action: 'register_patient', value: 'Register Patient' },
    { id: 2, action: 'find_patient', value: 'Find Patient' },
    { id: 3, action: 'book_appointment', value: 'Book Appointment' },
    { id: 4, action: 'check_in', value: 'Check In Patient' },
  ];



  const upcomingAppointments = [
    { time: '11:30 AM', patient: 'Mary Joseph', doctor: 'Dr. Neema', department: 'Gynecology' },
    { time: '12:00 PM', patient: 'David Mushi', doctor: 'Dr. Michael', department: 'General Medicine' },
    { time: '01:00 PM', patient: 'Neema Ally', doctor: 'Dr. Joseph', department: 'Cardiology' },
  ];

  const getStatusClasses = (status) => {
    if (status === 3) {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 2) {
      return 'bg-amber-50  text-green-700 border border-amber-200';
    }
    return 'bg-amber-50 text-amber-700 border border-amber-200';
  };

  const handleQuickAction = (action) => {
    // console.error('ACTION: ', action)
    //register_patient,  find_patient,  book_appointment, check_in
    switch (action) {
      case 'register_patient':
        handleAddPatient()
        break
      case 'find_patient':
        navigate('/patients', { replace: true })
        break
      case 'book_appointment':
        handleAddAppointment()
        break
      case 'check_in':
        navigate('/appointments', { replace: true })
        break
    }
    return

  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {modal.Component && <ModalContainer
        Component={modal.Component}
        entity={entity}
        modalOpen={modal.modelOpen}
        setModal={setModal}
      />}
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mt-2 text-slate-600">
              Manage patient arrivals, registrations, appointments, queue flow, and front-desk handoffs.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search patient, phone, ID..."
              className="w-full sm:w-80 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium
             text-white hover:bg-sky-700" onClick={handleAddPatient}>
              + Register Patient
            </button>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">{item.label}</div>
              <div className="mt-3 text-3xl font-bold text-slate-900">{item.value}</div>
              <div className="mt-2 text-sm text-slate-600">{item.note}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Patient Queue</h2>
                <p className="mt-1 text-sm text-slate-500">Track arrivals, check-ins, assigned doctors, and current visit status.</p>
              </div>
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                View Full Queue
              </button>
            </div>
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
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Patient</th>
                    <th className="px-6 py-4 text-left font-semibold">Department</th>
                    <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                    <th className="px-6 py-4 text-left font-semibold">Visit Type</th>
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queuePatients.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="mt-1 text-xs text-slate-500">{item.appointment_no}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{item.department}</td>
                      <td className="px-6 py-4 text-slate-700">{item.doctor}</td>
                      <td className="px-6 py-4 text-slate-700">{item.visitType}</td>
                      <td className="px-6 py-4 text-slate-700">{item.time}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.appointment_status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">

                          <button className="rounded-xl border border-slate-300 bg-white px-3 py-2 
                          text-xs font-medium text-slate-700 hover:bg-slate-50" onClick={() => handleViewAppointment(item.id)}>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-5 grid grid-cols-1 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.action)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 hover:border-sky-200 hover:bg-sky-50"
                  >
                    {action.value}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Upcoming Appointments</h2>
              <div className="mt-5 space-y-4">
                {upcomingAppointments.map((item) => (
                  <div key={item.time + item.patient} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">{item.patient}</div>
                        <div className="mt-1 text-sm text-slate-600">{item.department}</div>
                        <div className="mt-1 text-xs text-slate-500">{item.doctor}</div>
                      </div>
                      <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 border border-slate-200">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>


      </div>
    </div>
  );
}
