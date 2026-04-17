export default function NurseDashboard() {
  const stats = [
    { label: 'Assigned Patients', value: '14', note: '6 high attention' },
    { label: 'Pending Vitals', value: '8', note: 'Due this shift' },
    { label: 'Procedures Today', value: '5', note: '2 in progress' },
    { label: 'Medications Due', value: '11', note: '3 overdue' },
  ];

  const assignedPatients = [
    {
      id: 'HMS-2041',
      name: 'Amina Hassan',
      ward: 'Observation Ward',
      bed: 'O-05',
      task: 'Take vitals',
      status: 'Pending',
      time: '09:00 AM',
    },
    {
      id: 'HMS-2105',
      name: 'Salim Omari',
      ward: 'Surgical Ward',
      bed: 'B-12',
      task: 'Dressing change',
      status: 'In Progress',
      time: '09:20 AM',
    },
    {
      id: 'HMS-1988',
      name: 'John Peter',
      ward: 'Pediatrics',
      bed: 'P-03',
      task: 'Administer medication',
      status: 'Pending',
      time: '09:45 AM',
    },
    {
      id: 'HMS-1872',
      name: 'Grace Daniel',
      ward: 'Cardiology',
      bed: 'C-07',
      task: 'Record fluid intake',
      status: 'Completed',
      time: '08:30 AM',
    },
    {
      id: 'HMS-2110',
      name: 'Mary Joseph',
      ward: 'Gynecology',
      bed: 'G-02',
      task: 'Take vitals',
      status: 'Pending',
      time: '10:10 AM',
    },
  ];

  const quickActions = [
    'Take Patient Vitals',
    'Add Nursing Note',
    'Start Procedure',
    'Administer Medication',
    'Update Patient Status',
    'Prepare Handover',
  ];

  const alerts = [
    'Bed B-12 patient pain score review pending',
    'Medication overdue for John Peter in Pediatrics',
    'Observation vitals due for Amina Hassan',
  ];

  const handoverNotes = [
    'Monitor Surgical Ward patients for pain and wound status.',
    'Repeat vitals for observation patients before noon.',
    'Confirm medication round completion with pharmacy records.',
  ];

  const getStatusClasses = (status) => {
    if (status === 'Completed') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'In Progress') {
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
    return 'bg-amber-50 text-amber-700 border border-amber-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Nurse Portal / Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Nurse Dashboard</h1>
            <p className="mt-2 text-slate-600">
              Track assigned patients, complete nursing tasks, take vitals, and manage shift activities.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search patient, bed, task..."
              className="w-full sm:w-80 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              My Shift Tasks
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
                <h2 className="text-xl font-semibold text-slate-900">Assigned Patient Tasks</h2>
                <p className="mt-1 text-sm text-slate-500">Manage vital checks, procedures, medication, and care duties.</p>
              </div>
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                View Full List
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Patient</th>
                    <th className="px-6 py-4 text-left font-semibold">Ward / Bed</th>
                    <th className="px-6 py-4 text-left font-semibold">Task</th>
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedPatients.map((item) => (
                    <tr key={item.id + item.task} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="mt-1 text-xs text-slate-500">{item.id}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{item.ward} • {item.bed}</td>
                      <td className="px-6 py-4 text-slate-700">{item.task}</td>
                      <td className="px-6 py-4 text-slate-700">{item.time}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="rounded-xl bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700 hover:bg-sky-100">
                          Open
                        </button>
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
                    key={action}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 hover:border-sky-200 hover:bg-sky-50"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Alerts</h2>
              <div className="mt-5 space-y-3">
                {alerts.map((alert) => (
                  <div key={alert} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    {alert}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Nursing Work Area</h2>
                <p className="mt-1 text-sm text-slate-500">Open a patient task to record vitals, notes, procedures, or medication actions.</p>
              </div>
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Open Vitals Screen
              </button>
            </div>

            <div className="mt-6 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">
              <div className="text-lg font-semibold text-slate-800">Selected nursing task appears here</div>
              <p className="mt-2 text-sm text-slate-500">
                This area can load vitals entry, nursing notes, dressing forms, medication charts, and handover details.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Shift Handover Notes</h2>
            <div className="mt-5 space-y-3">
              {handoverNotes.map((note) => (
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
