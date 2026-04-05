import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function PatientList() {

  const axios = useAxiosPrivate();

  let api_message = {
    success: false,
    message: ''
  }

  let edit_form = {
    load_form: false,
    is_new: false,
    is_edit: true,
    entity: {}
  }

  const [apiMessage, setApiMessage] = useState({})
  const [editForm, setEditForm] = useState(edit_form)
  const [entities, setEntities] = useState([])

  const handleEditEntity = id => {
    const entity = entities.filter(dat => dat.id === id)
    setEditForm({load_form: true, is_new:false, is_edit: true, entity: entity[0]})
  }

  const handleSetEditform = () => {
    setEditForm({...editForm, load_form: false})
  }

  const handleAddNew = () => {
    setEditForm({load_form: true, is_new: true, is_edit: false, entity: {}})
  }


  useEffect (() => {
    const fetchPattients = async () => {
      try{
        const entityResult = await axios.get('/health/patients')
        if (entityResult.status === 200){
          api_message.success = true
          api_message.message = entityResult?.data?.lenght ?? 0 + ' records found'
          setApiMessage(api_message)
          setEntities(entityResult.data)
        }else{
          api_message.success = false
          api_message.message = 'Unable to get list of items: error - ' + entityResult.status
        }
      }catch(err){
        api_message.success = false
        api_message.message = err.response.data.error.message
        setApiMessage(api_message)
      }
    }

    fetchPattients()
  }, [])

  const patients  = entities

  const getStatusClasses = (status) => {
    if (status === 'Active')
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (status === 'Waiting')
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    if (status === 'In Consultation')
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Patient List</h1>
            <p className="text-slate-500 text-sm">Manage all registered patients</p>
          </div>

          <button className="bg-sky-600 text-white px-4 py-2 rounded-xl">
            + Register Patient
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Search patient..."
            className="border px-4 py-2 rounded-xl w-72"
          />

          <select className="border px-4 py-2 rounded-xl">
            <option>All Departments</option>
            <option>General Medicine</option>
            <option>Pediatrics</option>
          </select>

          <select className="border px-4 py-2 rounded-xl">
            <option>All Status</option>
            <option>Active</option>
            <option>Waiting</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Registration No</th>
                <th className="p-4">Joining Date</th>
                <th className="p-4">Registered By</th>
                <th className="p-4">Last Visit</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-4">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-slate-500 text-xs">
                      {p.gender}, {p.age} yrs
                    </div>
                  </td>

                  <td className="p-4">{p.id}</td>
                  <td className="p-4">{p.department}</td>
                  <td className="p-4">{p.doctor}</td>
                  <td className="p-4">{p.lastVisit}</td>

                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClasses(p.status)}`}>
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">
                    <button className="text-xs border px-3 py-1 rounded-lg">
                      View
                    </button>
                    <button className="text-xs border px-3 py-1 rounded-lg">
                      Edit
                    </button>
                    <button className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded-lg">
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}