import { Box, Modal, Typography } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { BounceLoader } from "react-spinners";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAgeFromBod, getTimeFromDate } from "../../Utilities/DateTime";
import UserContext from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";


export default function DoctorDashboard() {
   
  const user = useContext(UserContext)
  const navigate = useNavigate()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //bgcolor: 'background.paper',
    // border: '2px solid #000',
    //boxShadow: 24,
    p: 4,
  };

  const dashboardStats = {
    patients_total: 0,
    patients_seen: 0,
    patient_waiting: 0,
    patients_in_lab: 0,
    patients_followup: 0
  }

  const [apiMessage, setApiMessage] = useState({
    success: false,
    message: ''
  }
  )
  const axios = useAxiosPrivate();
 // const [dashboard, setDatashboar] = useState(dashboardStats)
  const [modalOpen, setModalOpen] = useState(false)
  let [entities, setEntities] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {

        setModalOpen(true)
        const entityResult = await axios.get('/appointments/by-doctor')

        if (entityResult.status === 200) {

          const success = true
          const message = (entityResult?.data?.length ?? 0) + ' record(s) found'
          setApiMessage({ success, message })
          setEntities(entityResult.data)
        } else {
          const success = false
          const message = 'Unable to get list of items: error - ' + entityResult.status
          setApiMessage({ success, message })
        }
      } catch (err) {
        const success = false
        const message = err.response.data.error.message
        setApiMessage({ success, message })
      }
      setModalOpen(false)
    }

    fetchAppointments()
  }, [])

  const stats = [
    { label: "Today's Appointments", value: dashboardStats.patients_total, note: `${dashboardStats.patient_waiting} waiting now` },
    { label: 'Patients Seen', value: dashboardStats.patients_seen, note: 'Morning progress' },
    { label: 'Pending Lab Reviews', value: dashboardStats.patients_in_lab, note: 'Needs action' },
    { label: 'Follow-ups', value: dashboardStats.patients_followup, note: 'Scheduled today' },
  ];

  // const rmp = [
  //   { patient: 'Amina Hassan', age: 29, visitType: 'Consultation', time: '09:00 AM', status: 'Waiting', complaint: 'Fever and headache' },
  //   { patient: 'John Peter', age: 8, visitType: 'Follow-up', time: '09:30 AM', status: 'In Room', complaint: 'Cough review' },
  // ]


  const todayQueue = entities && entities.length ? entities.map(ent => (

    {
      id: ent?.id,
      patient_id: ent?.Patient?.id,
      patient: ent?.Patient?.Contact?.first_name + ' ' + ent?.Patient?.Contact?.last_name,
      age: getAgeFromBod(ent?.Patient?.birth_date),
      visitType: ent?.AppointmentType.name,
      time: getTimeFromDate(ent?.appointment_date),
      status: ent?.Patient?.CurrentActivity.name,
      complaint: ent?.appointment_reason
    }
  )
  )
    : []



  const labAlerts = [
    'Malaria Rapid Test result ready for Amina Hassan',
    'FBC result uploaded for Grace Daniel',
    'X-ray report available for Salim Omari',
  ];

  const recentNotes = [
    'Reviewed pediatric follow-up and adjusted medication dosage.',
    'Requested urgent ECG for cardiology review patient.',
    'Completed consultation and sent prescription to pharmacy.',
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(todayQueue.length / rowsPerPage);

  const paginatedQueue = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return todayQueue.slice(startIndex, endIndex);
  }, [currentPage, todayQueue]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleOpenPatient = id => {
    user.setState({action: 4,entity_id: id, component: 'patientview' })
    navigate('/patientview', {replace: true})
  }

  const getStatusClasses = (status) => {
    if (status === 'Waiting') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    if (status === 'In Room') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Lab Result Ready') {
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mt-2 text-slate-600">
              Manage today’s patient queue, review lab updates, and access clinical actions quickly.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search patient, record, lab result..."
              className="w-full sm:w-80 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Search
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
          <div className="xl:col-span-3 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Today’s Patient Queue</h2>
                <p className="mt-1 text-sm text-slate-500">Track appointments, queue status, and main complaints.</p>
              </div>
              
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
                    <th className="px-6 py-4 text-left font-semibold">Visit Type</th>
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-left font-semibold">Complaint</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedQueue.map((item) => (
                    <tr key={item.patient + item.time} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{item.patient}</div>
                        <div className="mt-1 text-xs text-slate-500">Age: {item.age}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{item.visitType}</td>
                      <td className="px-6 py-4 text-slate-700">{item.time}</td>
                      <td className="px-6 py-4 text-slate-700">{item.complaint}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="rounded-xl bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700 hover:bg-sky-100"
                         onClick={()=> handleOpenPatient(item.id)}
                         >
                          Opens
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-500">
                Showing {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, todayQueue.length)} of {todayQueue.length} patients
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium ${currentPage === page
                        ? 'bg-sky-600 text-white'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

     
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
        
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Lab Alerts</h2>
              <div className="mt-5 space-y-3">
                {labAlerts.map((alert) => (
                  <div key={alert} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    {alert}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Recent Notes</h2>
            <div className="mt-5 space-y-3">
              {recentNotes.map((note) => (
                <div key={note} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
