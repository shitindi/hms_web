
export default function Dashboard() {
  const stats = [
    { label: 'Today\'s Patients', value: '128', note: '+14 since yesterday' },
    { label: 'Appointments', value: '46', note: '12 waiting now' },
    { label: 'Admissions', value: '18', note: '6 new admissions' },
    { label: 'Revenue', value: '$4,820', note: 'Today\'s collections' },
  ];

  const appointments = [
    {
      patient: 'Amina Hassan',
      doctor: 'Dr. Michael',
      department: 'General Medicine',
      time: '09:00 AM',
      status: 'Checked In',
    },
    {
      patient: 'John Peter',
      doctor: 'Dr. Neema',
      department: 'Pediatrics',
      time: '09:30 AM',
      status: 'Waiting',
    },
    {
      patient: 'Grace Daniel',
      doctor: 'Dr. Joseph',
      department: 'Cardiology',
      time: '10:15 AM',
      status: 'In Consultation',
    },
    {
      patient: 'Salim Omari',
      doctor: 'Dr. Esther',
      department: 'Orthopedics',
      time: '11:00 AM',
      status: 'Scheduled',
    },
  ];

  const activities = [
    'Lab results uploaded for Patient #HMS-2041',
    'New patient registered at reception desk',
    'Pharmacy stock alert for Amoxicillin 500mg',
    'Invoice paid for Patient #HMS-1988',
    'Bed B-12 assigned in Surgical Ward',
  ];

  const quickActions = [
    'Register Patient',
    'Book Appointment',
    'Create Invoice',
    'Add Lab Request',
    'Dispense Drugs',
    'Admit Patient',
  ];

  const getStatusClasses = (status) => {
    if (status === 'Checked In') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Waiting') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    if (status === 'In Consultation') {
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
   
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Friday, 27 March 2026  </p>
            </div>
          </header>
          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="text-sm text-slate-500">{item.label}</div>
                <div className="mt-3 text-3xl font-bold">{item.value}</div>
                <div className="mt-2 text-sm text-slate-600">{item.note}</div>
              </div>
            ))}
          </section>

          <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-semibold">Today\'s Appointments</h3>
                  <p className="mt-1 text-sm text-slate-500">Track consultation progress and waiting patients.</p>
                </div>
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Patient</th>
                      <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                      <th className="px-6 py-4 text-left font-semibold">Department</th>
                      <th className="px-6 py-4 text-left font-semibold">Time</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((item) => (
                      <tr key={item.patient} className="border-t border-slate-100">
                        <td className="px-6 py-4 font-medium">{item.patient}</td>
                        <td className="px-6 py-4">{item.doctor}</td>
                        <td className="px-6 py-4">{item.department}</td>
                        <td className="px-6 py-4">{item.time}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold">Quick Actions</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-700 hover:bg-sky-50 hover:border-sky-200"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold">Recent Activity</h3>
                <div className="mt-4 space-y-3">
                  {activities.map((activity) => (
                    <div key={activity} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
