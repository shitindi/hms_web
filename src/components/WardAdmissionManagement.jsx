export default function WardAdmissionManagement() {
  const patient = {
    id: 'HMS-2105',
    name: 'Salim Omari',
    age: 41,
    gender: 'Male',
    doctor: 'Dr. Esther',
    department: 'Orthopedics',
    admissionDate: '27 Mar 2026',
    diagnosis: 'Right leg fracture requiring observation',
    status: 'Admitted',
  };

  const bedAssignments = [
    {
      ward: 'Surgical Ward',
      room: 'Room 12',
      bed: 'Bed B-12',
      type: 'Standard',
      status: 'Occupied',
    },
    {
      ward: 'Private Ward',
      room: 'Room 02',
      bed: 'Bed P-02',
      type: 'Private',
      status: 'Available',
    },
    {
      ward: 'Observation Ward',
      room: 'Room 05',
      bed: 'Bed O-05',
      type: 'Observation',
      status: 'Cleaning',
    },
  ];

  const careTimeline = [
    {
      time: '11:20 AM',
      event: 'Admission order created by Dr. Esther',
      status: 'Completed',
    },
    {
      time: '11:35 AM',
      event: 'Bed assigned in Surgical Ward',
      status: 'Completed',
    },
    {
      time: '11:50 AM',
      event: 'Initial nursing assessment pending',
      status: 'Pending',
    },
    {
      time: '12:15 PM',
      event: 'Pain medication to be administered',
      status: 'Scheduled',
    },
  ];

  const inpatientOrders = [
    {
      order: 'IV Fluids',
      frequency: '8 hourly',
      assignedTo: 'Nurse Rehema',
      status: 'Ongoing',
    },
    {
      order: 'Pain Management',
      frequency: '12 hourly',
      assignedTo: 'Nurse John',
      status: 'Scheduled',
    },
    {
      order: 'Fracture Observation',
      frequency: 'Continuous',
      assignedTo: 'Ward Team',
      status: 'Active',
    },
  ];

  const quickActions = [
    'Assign Bed',
    'Transfer Ward',
    'Add Nursing Note',
    'Record Vitals',
    'Add Inpatient Order',
    'Prepare Discharge',
  ];

  const getStatusClasses = (status) => {
    if (status === 'Admitted' || status === 'Completed' || status === 'Active' || status === 'Ongoing') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Pending' || status === 'Scheduled' || status === 'Cleaning') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    if (status === 'Occupied') {
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Admissions / Ward Management</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Ward & Admission Management</h1>
            <p className="mt-2 text-slate-600">
              Manage admissions, ward and bed assignments, inpatient care orders, and discharge preparation.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Back to Patient Record
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Save Admission Update
            </button>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="xl:col-span-3 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-xl font-bold text-sky-700">
                    SO
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
                      {patient.gender} • {patient.age} years • Admission Date: {patient.admissionDate}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">Attending Doctor: {patient.doctor}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 sm:min-w-[320px]">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Department</div>
                    <div className="mt-1">{patient.department}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Diagnosis</div>
                    <div className="mt-1">{patient.diagnosis}</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Ward & Bed Assignment</h2>
                  <p className="mt-1 text-sm text-slate-500">Assign or transfer the patient to an available room and bed.</p>
                </div>
                <button className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100">
                  + Assign Bed
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Ward</th>
                      <th className="px-6 py-4 text-left font-semibold">Room</th>
                      <th className="px-6 py-4 text-left font-semibold">Bed</th>
                      <th className="px-6 py-4 text-left font-semibold">Type</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bedAssignments.map((item) => (
                      <tr key={item.bed} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 text-slate-700">{item.ward}</td>
                        <td className="px-6 py-4 text-slate-700">{item.room}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{item.bed}</td>
                        <td className="px-6 py-4 text-slate-700">{item.type}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="rounded-xl bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700 hover:bg-sky-100">
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Admission Form</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label htmlFor="admissionType" className="mb-2 block text-sm font-medium text-slate-700">
                    Admission Type
                  </label>
                  <select
                    id="admissionType"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Emergency</option>
                    <option>Routine</option>
                    <option>Post-Procedure</option>
                    <option>Observation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ward" className="mb-2 block text-sm font-medium text-slate-700">
                    Assigned Ward
                  </label>
                  <select
                    id="ward"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Surgical Ward</option>
                    <option>Observation Ward</option>
                    <option>Private Ward</option>
                    <option>ICU</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bed" className="mb-2 block text-sm font-medium text-slate-700">
                    Assigned Bed
                  </label>
                  <input
                    id="bed"
                    type="text"
                    defaultValue="Bed B-12"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                  <label htmlFor="handoffNotes" className="mb-2 block text-sm font-medium text-slate-700">
                    Admission / Handoff Notes
                  </label>
                  <textarea
                    id="handoffNotes"
                    rows="4"
                    defaultValue="Patient admitted for fracture observation, pain control, and ward monitoring. Continue immobilization and reassess in 12 hours."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-900">Care Timeline</h2>
                  <p className="mt-1 text-sm text-slate-500">Track admission milestones and inpatient handoff events.</p>
                </div>
                <div className="p-6 space-y-4">
                  {careTimeline.map((item) => (
                    <div key={item.time + item.event} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{item.event}</div>
                          <div className="mt-1 text-sm text-slate-500">{item.time}</div>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-900">Inpatient Orders</h2>
                  <p className="mt-1 text-sm text-slate-500">Current nursing and ward care instructions.</p>
                </div>
                <div className="p-6 space-y-4">
                  {inpatientOrders.map((item) => (
                    <div key={item.order} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{item.order}</div>
                          <div className="mt-1 text-sm text-slate-600">Frequency: {item.frequency}</div>
                          <div className="mt-1 text-xs text-slate-500">Assigned to: {item.assignedTo}</div>
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
              <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-5 grid grid-cols-1 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 hover:border-sky-200 hover:bg-sky-50"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Admission Summary</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span>Ward</span>
                  <span className="font-semibold">Surgical Ward</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span>Bed</span>
                  <span className="font-semibold">B-12</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span>Expected Stay</span>
                  <span className="font-semibold">3 days</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span>Billing Status</span>
                  <span className="font-semibold">Admission Charges Active</span>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Admission Actions</h2>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Confirm Admission
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Transfer Patient
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Add Ward Charges
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Prepare Discharge Summary
                </button>
                <button className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-100">
                  Cancel Admission
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
