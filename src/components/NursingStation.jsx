export default function NursingStation() {
  const queue = [
    { patient: 'Amina Hassan', id: 'HMS-2041', procedure: 'Wound Dressing', priority: 'Urgent', status: 'Waiting', time: '09:10 AM' },
    { patient: 'John Peter', id: 'HMS-1988', procedure: 'Nebulization', priority: 'Normal', status: 'In Progress', time: '09:20 AM' },
    { patient: 'Grace Daniel', id: 'HMS-1872', procedure: 'IV Fluids', priority: 'High', status: 'Waiting', time: '09:35 AM' },
  ];

  const supplies = [
    { name: 'Gauze', stock: 120 },
    { name: 'Bandage', stock: 80 },
    { name: 'Normal Saline', stock: 45 },
    { name: 'Syringes', stock: 200 },
  ];

  const getBadge = (v) => {
    if (v === 'Urgent' || v === 'High') return 'bg-red-50 text-red-700 border border-red-200';
    if (v === 'In Progress') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (v === 'Waiting') return 'bg-amber-50 text-amber-700 border border-amber-200';
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Nursing / Procedure Room</p>
            <h1 className="text-3xl font-bold text-slate-900 mt-1">Treatment & Procedure Station</h1>
            <p className="text-slate-600 mt-2">Manage treatment orders, perform procedures, and record nursing care.</p>
          </div>
          <button className="rounded-2xl bg-sky-600 px-5 py-3 text-white text-sm">Refresh Queue</button>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Queue */}
          <div className="xl:col-span-2 bg-white rounded-3xl shadow border border-slate-200">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Procedure Queue</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 text-left">Patient</th>
                    <th className="p-4 text-left">Procedure</th>
                    <th className="p-4 text-left">Time</th>
                    <th className="p-4 text-left">Priority</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((q) => (
                    <tr key={q.id} className="border-t">
                      <td className="p-4">
                        <div className="font-semibold">{q.patient}</div>
                        <div className="text-xs text-slate-500">{q.id}</div>
                      </td>
                      <td className="p-4">{q.procedure}</td>
                      <td className="p-4">{q.time}</td>
                      <td className="p-4"><span className={`px-2 py-1 text-xs rounded-full ${getBadge(q.priority)}`}>{q.priority}</span></td>
                      <td className="p-4"><span className={`px-2 py-1 text-xs rounded-full ${getBadge(q.status)}`}>{q.status}</span></td>
                      <td className="p-4">
                        <button className="bg-sky-50 text-sky-700 px-3 py-1 rounded-lg text-xs">Start</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border shadow">
              <h2 className="text-xl font-semibold">Procedure Form</h2>
              <div className="mt-4 space-y-3">
                <textarea placeholder="Procedure notes" className="w-full border rounded-xl p-3" />
                <input placeholder="Materials used" className="w-full border rounded-xl p-3" />
                <input placeholder="Observations" className="w-full border rounded-xl p-3" />
                <button className="w-full bg-sky-600 text-white py-3 rounded-xl">Complete Procedure</button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border shadow">
              <h2 className="text-xl font-semibold">Supplies</h2>
              <div className="mt-4 space-y-2">
                {supplies.map((s) => (
                  <div key={s.name} className="flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span>{s.stock}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border shadow">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <div className="mt-4 space-y-2">
                <button className="w-full border rounded-xl py-2">Add Procedure</button>
                <button className="w-full border rounded-xl py-2">Record Vitals</button>
                <button className="w-full border rounded-xl py-2">Schedule Next Dressing</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
