import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAgeFromBod } from "../../Utilities/DateTime";
import { Box, Modal, Paper, Tooltip, Typography } from "@mui/material";
import PatientForm from "./PatientForm";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../context/UserProvider";
import { setPatientsDetail } from "../../state/patientsSlice";
import { BounceLoader } from 'react-spinners'
import { useNavigate } from "react-router-dom";

export default function PatientList() {


  const axios = useAxiosPrivate();
  
  const user = useContext(UserContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //modal style
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

  const [departments, statuses, patients] = useSelector(state => {
    return [state.lookups.departments, state.lookups.patient_activities, state.patients]
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
    user.setState({ ...user.state, action: 2 })
  }

  const handleSetEditForm = () => {
    setEditForm({ ...editForm, load_form: false, is_new: false, is_edit: false })
  }

  const handleAddNew = () => {
    setEditForm({ load_form: true, is_new: true, is_edit: false, entity: {} })
  }

  const bookAppointment = id => {
      user.setState({...user.state,
        component: 'appointments',
        action: 1,     // 1 Add new, 2 Edit, 3 Delete, 4 View
        entity_id: id,
     //   entities: []
      })

      navigate('/appointments', { replace: true })
  }

  if (user.state.action === 1) {
    if (editForm.load_form === false && editForm.is_new === false)
      handleAddNew()
  }



  useEffect(() => {
    const fetchPattients = async () => {
      try {
        if (patients.length === entities.length)
          return

        setModalOpen(true)
        const entityResult = await axios.get('/patients/patients')
        if (entityResult.status === 200) {
          const success = true
          const message = (entityResult?.data?.length ?? 0) + ' record(s) found'
          setApiMessage({ success, message })
          setEntities(entityResult.data)
          dispatch(setPatientsDetail(entityResult.data))
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

    fetchPattients()
  }, [patients.length])



  const columns = [
    { field: 'id', headerName: 'ID', hideable: false },
    { field: 'registration_no', headerName: 'Registration No.', width: 120 },
    { field: 'patient', headerName: 'Patient', width: 150 },
    { field: 'gender_id', headerName: 'Gender', width: 80 },
    { field: 'age', headerName: 'Age', width: 80 },
    { field: 'joining_date', headerName: 'Joining date.', width: 130 },
    { field: 'created_by', headerName: 'Created By', width: 130 },
    { field: 'last_visity', headerName: 'Last visit', width: 150 },
    {
      field: 'status', headerName: 'Status', width: 150,
      renderCell: (params) =>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClasses(params.row?.current_activity ?? 13)}`}>
          {(params.row?.current_activity === 12 || params.row?.current_activity === 13) ? 'Checked-out' : 'Checked-in'}
        </span>
    },

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
          <button className="text-xs bg-sky-100 text-sky-700 px-2 mx-1  py-1 rounded-lg" onClick={ ()=> bookAppointment(params.row.id)}>
            Book
          </button>
        </>

    }
  ];


  if (entities.length < patients.length) {
    
      entities =patients
  }
  
  const rows = (entities || entities.length > 0) ?
    entities.map(p => (
      {
        id: p.id,
        registration_no: p.registration_no,
        patient: p.Contact.first_name + ' ' + p.Contact.last_name,
        gender_id: p?.Contact?.Gender?.name,
        age: getAgeFromBod(p.birth_date),
        joining_date: p.joining_date,
        current_activity: p?.Appointments[0]?.current_activity ?? 13,
        created_by: p.CreatedBy.Contact.first_name + ' ' + p.CreatedBy.Contact.last_name,
        last_visity: p.lastVisit,

      })
    )
    : [];

  const paginationModel = { page: 0, pageSize: 20 };

  const getStatusClasses = (status) => {
    if (status === 12 || status === 13)
       return ' bg-white  text-black border border-emerald-200'
    else
      return 'bg-green-700 text-white border border-emerald-200';
  };

  return (
    editForm.load_form ?
      <div ><PatientForm isEdit={editForm.is_edit} entity={editForm.entity} setEditForm={handleSetEditForm} /> </div> :
      <div className="min-h-screen bg-slate-100 ">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Patients</h1>
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

            <select className="border px-4 py-2 rounded-xl" value={comboFilter.status_id} name="status_id" onChange={setComboFilter}>
              <option value="">All Status</option>
              {
                (statuses && statuses.length > 0) &&
                statuses.map(item => <option value={item.ID} key={item.ID}>{item.name}</option>)
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
                pageSizeOptions={[5, 10,15, 20]}
                sx={{ border: 0 }}
              />
            </Paper>

          </div>

        </div>
      </div>
  );
}