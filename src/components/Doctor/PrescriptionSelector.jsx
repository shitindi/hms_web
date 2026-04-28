import { useEffect, useMemo, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { getDbDate } from '../../Utilities/DateTime';
import { useDispatch, useSelector } from 'react-redux';

export default function PrescriptionSelector({ setOpen, entity, setModal }) {
  const axios = useAxiosPrivate()
  const dispatch = useDispatch()
  const [medicines] = useSelector(state => {
    return [state.medicines]
  })
  console.log('MCHONGO1: ', medicines)
    const [medicineList, setMedicineList] = useState(medicines ?? [])
  let Prescriptions = []

  useEffect(() => {
    if (medicines?.length ?? 0 > 0)
      return

    const fetchMedicines = async () => {
      try {

        const entityResult = await axios.get('/pharmacy/medicines')
        if (entityResult.status === 200) {
          dispatch(setMedicineList(entityResult.data))
          setMedicineList(entityResult.data)
        } 
      } catch (err) {
        console.error('ERROR: ', err)
      }
    }

    fetchMedicines()
  }, [])


  const [search, setSearch] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);

console.log('MCHONGO2: ', medicineList)
  const availableMedicines = medicineList.map(med => {
    return { id: med?.id, name: med?.test_name, category: med?.Category.name }
  })


  const filteredMedicines = useMemo(() => {
    return availableMedicines.filter((med) => {
      const keyword = search.toLowerCase().trim();
      const alreadySelected = selectedMedicines.some((item) => item.id === med.id);
      return (
        !alreadySelected &&
        (med.name.toLowerCase().includes(keyword) ||
          med.category.toLowerCase().includes(keyword))
      );
    });
  }, [search, selectedMedicines, medicineList]);

  const addMedicine = (med) => {
    setSelectedMedicines((prev) => [
      ...prev,
      {
        ...med,
        priority: 'Normal',
        notes: '',
      },
    ]);
    setSearch('');
  };

  const removeMedicine = (id) => {
    setSelectedMedicines((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSelectedMedicine = (id, field, value) => {
    setSelectedMedicines((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // const handleChange = (field, value) => {
  //   setVitals(prev => ({ ...prev, [field]: value }));
  // };

  const handleClose = () => {
    setOpen(false)
    setModal({
      Component: null,
      modelOpen: false
    })
  }

  const handleSubmit = async () => {

    if (selectedMedicines.length == 0) {
      toast.error('No Medicine selected to proceed')
      return
    }

    selectedMedicines.forEach(med => {
      Prescriptions.push(
        {
          appointment_id: entity.apointment_id,
          test_id: med?.id,
          request_notes: med?.notes,
          request_date: getDbDate(new Date())
        }
      )
    })

    const form = { test_items: Prescriptions }


    let response

      let success = true
      let message = 'Prescriptions update successfuly!'
    try {
      response = await axios.post('/appointments/', form)

      if (response.status === 200) {

        success = true
        message = 'Prescriptions update successfuly!'

        toast.success(message)
        handleClose()
      } else {
        success = false
        message = response.data
        toast.error(message)
      }
    } catch (err) {
      console.error('POST_ERROR: ', err)
      success = false
      message = 'ERROR: ' + err.response.data.error.message
      toast.error(message)
    }
  }



  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-4">
      <div className="mx-auto max-w-6xl space-y-6">


        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className=" grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <label htmlFor="medicineSearch" className="mb-2 block text-sm font-medium text-slate-700">
                Search by Medicine name or category
              </label>
              <input
                id="medicineSearch"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search malaria, glucose, hematology..."
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="rounded-2xl bg-slate-50 p-2 text-sm text-slate-700">
              <div className="font-medium text-slate-800">Selected Medicines</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{selectedMedicines.length}</div>
            </div>
          </div>

          <div className=" rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="max-h-72 overflow-auto space-y-2">
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((prs) => (
                  <button
                    key={prs.id}
                    type="button"
                    onClick={() => addMedicine(prs)}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4  text-left hover:border-sky-200 hover:bg-sky-50"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{prs.name}</div>
                      <div className="text-sm text-slate-500">{prs.category}</div>
                    </div>
                    <span className="rounded-xl bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                      Add
                    </span>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500">
                  No matching Medicines found.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Selected Medicine List</h2>
              <p className="mt-1 text-sm text-slate-500">Review, prioritize, and annotate multiple requested Medicines.</p>
            </div>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium
             text-white hover:bg-sky-700"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium
             text-white hover:bg-sky-700"
              onClick={handleSubmit}
            >
              Save Prescription
            </button>

          </div>

          <div className="mt-6 space-y-4">
            {selectedMedicines.length > 0 ? (
              selectedMedicines.map((med, index) => (
                <div key={med.id} className="rounded-3xl border border-slate-200 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Medicine #{index + 1}</div>
                      <div className="mt-1 text-lg font-semibold text-slate-900">{med.name}</div>
                      <div className="mt-1 text-sm text-slate-500">Category: {med.category}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeMedicine(med.id)}
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">


                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Clinical Note
                      </label>
                      <input
                        type="text"
                        value={med.notes}
                        onChange={(event) =>
                          updateSelectedMedicine(med.id, 'notes', event.target.value)
                        }
                        placeholder="Reason or instruction for this Medicine"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                <div className="text-lg font-semibold text-slate-800">No Medicines selected yet</div>
                <p className="mt-2 text-sm text-slate-500">
                  Use the searchable list above to add one or more Medicines to the request.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
