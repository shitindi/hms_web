import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Box, Modal, Paper, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../context/UserProvider";
import { BounceLoader } from 'react-spinners'
import { setAppointmentsDetail } from "../../state/appointmentSlice";
import AppointmentForm from "./AppointmentForm";
import { getStringDate, getTimeFromDate } from "../../Utilities/DateTime";
import { toast } from "react-toastify";

export default function AppointmentsList() {

  const axios = useAxiosPrivate();
  const user = useContext(UserContext)
  const dispatch = useDispatch()

  //modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
  };

  let edit_form = {
    load_form: false,
    is_new: false,
    is_edit: false,
    entity: {}
  }


  const [comboFilter, setComboFilter] = useState({
    department_id: null,
    status_id: null
  })

  const [departments] = useSelector(state => {
    return [state.lookups.departments]
  })



  const [apiMessage, setApiMessage] = useState({
    success: false,
    message: ''
  }
  )

  // Loading modal controller
  const [modalOpen, setModalOpen] = useState(false)
  const [editForm, setEditForm] = useState(edit_form)
  let [entities, setEntities] = useState([])

  const handleEditEntity = id => {
    window.scrollTo(0, 0)

    const entity = entities.filter(dat => dat.id === id)
    setEditForm({ load_form: true, is_new: false, is_edit: true, entity: entity[0] })
    user.setState({ ...user.state, action: 2,entity_id: id, entities: [entity[0]] })
  }

  const handleSetEditForm = () => {
    setEditForm({ ...editForm, load_form: false, is_new: false, is_edit: false })
  }

  const checkInAppointment = async id => {
    let success = true
    let message = "Appointment registered successfuly"

    
    try {

      const response = await axios.post('/appointments/check-in', { id: id })

      if (response.status === 200) {

        success = true
        message = 'Patient checked in successfuly!'

        setApiMessage({ success, message })
        toast.success(message)
        //setEditForm()
        // dispatch(resetAppointments())
        //  user.setState({ ...user.state, action: 4 })
        // navigate('/appointments', { replace: true })
        setEntities(prev =>
          prev.map(app =>

            app.id === id ?
              { ...app, appointment_status: 3 }
              : app

          )
        )
      } else {
        success = false
        message = response.data
        setApiMessage({ success, message })
        toast.error(message)
      }
    } catch (err) {
      console.error('POST_ERROR: ', err)
      const success = false
      const message = 'ERROR: ' + err.response.data.error.message
      toast.error(message)
    }
  }

  const handleAddNew = () => {

    setEditForm({ ...editForm, load_form: true, is_new: true, is_edit: false })
    // console.error('FORM: ', editForm)
  }
  if (user.state.action === 1) {
    if (editForm.load_form === false && editForm.is_new === false) {
      if (user.state.component == 'appointments' && user.state.action == 1 && user.state?.entity_id && user.state?.entity_id > 0) {
        //setEditForm( {entity: { patient_id: user.state.entity_id  }})
        editForm.entity = { patient_id: user.state.entity_id }

      }

      handleAddNew()
    }
  }

  useEffect(() => {
    const fetchAppoitments = async () => {
      try {

        setModalOpen(true)
        const entityResult = await axios.get('/appointments/appointments')

        if (entityResult.status === 200) {
          const success = true
          const message = entityResult.data.length ?? 0 + ' records found'
          setApiMessage({ success, message })
          setEntities(entityResult.data)
          dispatch(setAppointmentsDetail(entityResult.data))
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

    fetchAppoitments()
  }, [])



  const columns = [
    { field: 'id', headerName: 'ID', hideable: false },
    { field: 'date', headerName: 'Appointment Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 80 },
    { field: 'patient', headerName: 'Pattient.', width: 150 },
    { field: 'doctor', headerName: 'Doctor', width: 150 },
    { field: 'visit_type', headerName: 'Visit for', width: 100 },
    { field: 'department', headerName: 'Department', width: 150 },
    {
      field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) =>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClasses(params.row.appointment_status)}`}>
          {
            (params.row.appointment_status === 2 || params.row.appointment_status === 3) ?
              'Checked in' :
              (params.row.appointment_status === 5) ?
                'checket out' :
                (params.row.appointment_status === 1) ?
                  'Uncorfired' :
                  'Canceled'
          }
        </span>
    },
    { field: 'appointment_no', headerName: 'Appointment #', width: 120 },
    { field: 'created_by', headerName: 'Created By', width: 150 },

    {
      field: 'actions', headerName: 'Actions', width: 200,
      renderCell: (params) =>
        <>
          <button className="text-xs border px-2 py-1 mx-1 rounded-lg" onClick={() => handleEditEntity(params.row.id)}>
            View
          </button>
          <button className="text-xs border px-2 py-1 mx-1 rounded-lg" onClick={() => handleEditEntity(params.row.id)}>
            Edit
          </button>
          {
            (params.row.appointment_status === 1) ?
              <button className="text-xs bg-sky-100 text-sky-700 px-2 mx-1  py-1 rounded-lg" onClick={() => checkInAppointment(params.row.id)}>
                Check in
              </button>
              :
              <></>
          }


        </>

    }
  ];

  const rows = (entities || entities.length > 0) ?
    entities.map(p => (
      {
        id: p.id,
        date: getStringDate(p?.appointment_date),
        time: getTimeFromDate(p?.appointment_date),
        patient: p?.Patient?.Contact?.first_name + ' ' + p?.Patient?.Contact?.last_name,
        doctor: p?.Doctor?.User?.Contact.first_name + ' ' + p?.Doctor?.User?.Contact?.last_name,
        visit_type: p?.AppointmentType.name,
        department: p?.Department.name,
        appointment_status: p?.appointment_status,
        appointment_no: p?.appointment_no,
        created_by: p.CreatedBy.Contact.first_name + ' ' + p.CreatedBy.Contact.last_name,

      })
    )
    : [];

  const paginationModel = { page: 0, pageSize: 20 };

  const getStatusClasses = (status) => {

    if (status === 2 || status === 3)
      return 'bg-green-700 text-white border border-emerald-200';
    else if (status === 5)
      return ' bg-white  text-black border border-emerald-200'
    else if (status === 1)
      return ' bg-yellow-500  text-black border border-emerald-200'
    else
      return ' bg-red-500  text-white border border-emerald-200'
  };


  return (

    editForm.load_form ?
      <div ><AppointmentForm isEdit={editForm.is_edit} entity={editForm.entity} setEditForm={handleSetEditForm} />  </div> :
      <div className="min-h-screen bg-slate-100 ">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Appointments</h1>
              <h3>{apiMessage.message}</h3>
            </div>


          </div>

          {/* Search + Filters */}
          <div className="flex gap-3 mb-4">
            <select className="border px-4 py-2 rounded-xl" value={comboFilter.department_id} name="department_id" onChange={setComboFilter}>
              <option value="">All Departments</option>
              {
                (departments && departments.length > 0) &&
                departments.map(item => <option value={item.ID} key={item.ID}>{item.name}</option>)
              }
            </select>


          </div>

          {/* Table */}

          <div className="bg-white rounded-2xl shadow overflow-hidden ">

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

            <Paper className='table-container  ' >


              <DataGrid
                columnVisibilityModel={{ id: false }}

                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
              />
            </Paper>

          </div>

        </div>
      </div>
  );
}