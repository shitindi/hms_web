export default function PatientList() {
  const patients = [
    {
      id: 'HMS-2041',
      name: 'Amina Hassan',
      gender: 'Female',
      age: 29,
      phone: '+255 712 345 678',
      department: 'General Medicine',
      doctor: 'Dr. Michael',
      status: 'Active',
      visitType: 'Outpatient',
      lastVisit: '27 Mar 2026',
    },
    {
      id: 'HMS-1988',
      name: 'John Peter',
      gender: 'Male',
      age: 8,
      phone: '+255 754 456 111',
      department: 'Pediatrics',
      doctor: 'Dr. Neema',
      status: 'Waiting',
      visitType: 'Outpatient',
      lastVisit: '27 Mar 2026',
    },
    {
      id: 'HMS-1872',
      name: 'Grace Daniel',
      gender: 'Female',
      age: 54,
      phone: '+255 768 100 222',
      department: 'Cardiology',
      doctor: 'Dr. Joseph',
      status: 'In Consultation',
      visitType: 'Review',
      lastVisit: '26 Mar 2026',
    },
  ];

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
                <th className="p-4">ID</th>
                <th className="p-4">Department</th>
                <th className="p-4">Doctor</th>
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