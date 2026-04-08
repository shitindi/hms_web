import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Box, Modal, Paper, Tooltip, Typography } from "@mui/material";
import DoctorForm from "./DoctorForm";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../context/UserProvider";
import { setDoctorsDetail} from "../state/doctorsSlice";
import { BounceLoader } from 'react-spinners'

export default function DoctorsList() {

  const axios = useAxiosPrivate();
  const user = useContext(UserContext)
  const dispatch = useDispatch()

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

  const [departments,  doctors] = useSelector(state => {
    return [state.lookups.departments,  state.doctors]
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

  if (user.state.action === 1) {
    if (editForm.load_form === false && editForm.is_new === false)
      handleAddNew()
  }

  useEffect(() => {
    const fetchPattients = async () => {
      try {
        if (doctors.length === entities.length)
          return

        setModalOpen(true)
        const entityResult = await axios.get('/doctors/doctors')
        if (entityResult.status === 200) {
          const success = true
          const message = entityResult?.data?.lenght ?? 0 + ' records found'
          setApiMessage({ success, message })
          setEntities(entityResult.data)
          dispatch(setDoctorsDetail(entityResult.data))
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
  }, [doctors.length])



  const columns = [
    { field: 'id', headerName: 'ID', hideable: false },
    { field: 'doctor', headerName: 'Doctor', width: 150 },
    { field: 'gender_id', headerName: 'Gender', width: 80 },
    { field: 'doctor_id_no', headerName: 'Doctor ID #.', width: 120 },
   // { field: 'department', headerName: 'Department', width: 150 },
    { field: 'specialization', headerName: 'Specialization', width: 120 },
    { field: 'joining_date', headerName: 'Joined on', width: 120 },
    { field: 'employment_type', headerName: 'Employment ', width: 120 },
    { field: 'created_by', headerName: 'Created By', width: 140 },

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
          <button className="text-xs bg-sky-100 text-sky-700 px-2 mx-1  py-1 rounded-lg">
            Book
          </button>
        </>

    }
  ];

  if (entities.length < doctors.length)
    setEntities(doctors)

  const rows = (entities || entities.length > 0) ?
    entities.map(p => (
      {
        id: p.id,
        doctor: p.User.Contact.first_name + ' ' + p.User.Contact.last_name,
        gender_id: p?.User.Contact?.Gender?.name,
        doctor_id_no: p?.doctor_id_no,
        //department: p?.Department.name,
        specialization: p?.Specialization.name,
        joining_date: p?.joining_date,
        employment_type: p?.EmploymentType.name,
        created_by: p.CreatedBy.Contact.first_name + ' ' + p.CreatedBy.Contact.last_name,

      })
    )
    : [];

  const paginationModel = { page: 0, pageSize: 20 };

  return (
    editForm.load_form ?
      <div ><DoctorForm isEdit={editForm.is_edit} entity={editForm.entity} setEditForm={handleSetEditForm} /> </div> :
      <div className="min-h-screen bg-slate-100 ">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Doctors</h1>
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