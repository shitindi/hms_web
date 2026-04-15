export default function DischargeManagement() {
  const patient = {
    id: 'HMS-2105',
    name: 'Salim Omari',
    age: 41,
    gender: 'Male',
    doctor: 'Dr. Esther',
    ward: 'Surgical Ward',
    bed: 'B-12',
    admissionDate: '27 Mar 2026',
    dischargeDate: '30 Mar 2026',
    diagnosis: 'Right leg fracture under observation',
    status: 'Ready for Discharge',
  };

  const clearanceItems = [
    { department: 'Doctor Clearance', status: 'Completed' },
    { department: 'Nursing Clearance', status: 'Completed' },
    { department: 'Pharmacy Clearance', status: 'Pending' },
    { department: 'Billing Clearance', status: 'Pending' },
  ];

  const medications = [
    {
      drug: 'Paracetamol 500mg',
      instruction: '1 tablet every 8 hours after meals',
      duration: '5 days',
    },
    {
      drug: 'Amoxicillin 500mg',
      instruction: '1 capsule every 8 hours',
      duration: '7 days',
    },
  ];

  const followUpItems = [
    {
      type: 'Orthopedic Review',
      date: '06 Apr 2026',
      time: '09:00 AM',
      status: 'Scheduled',
    },
    {
      type: 'Dressing Change',
      date: '02 Apr 2026',
      time: '10:30 AM',
      status: 'Scheduled',
    },
  ];

  const quickActions = [
    'Complete Clearance',
    'Print Discharge Summary',
    'Book Follow-up',
    'Print Prescription',
    'Release Bed',
    'Notify Billing',
  ];

  const getStatusClasses = (status) => {
    if (status === 'Completed' || status === 'Ready for Discharge') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Pending' || status === 'Scheduled') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Admissions / Discharge</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Discharge Management</h1>
            <p className="mt-2 text-slate-600">
              Finalize clinical clearance, prepare discharge instructions, book follow-up care, and complete patient release.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Back to Admission
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Save Discharge Update
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
                      {patient.gender} • {patient.age} years • Ward: {patient.ward} • Bed: {patient.bed}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">Attending Doctor: {patient.doctor}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 sm:min-w-[320px]">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Admission Date</div>
                    <div className="mt-1">{patient.admissionDate}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Planned Discharge</div>
                    <div className="mt-1">{patient.dischargeDate}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <span className="font-medium text-slate-800">Diagnosis: </span>
                {patient.diagnosis}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Department Clearance</h2>
                <p className="mt-1 text-sm text-slate-500">Ensure all required departments approve discharge before release.</p>
              </div>
              <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {clearanceItems.map((item) => (
                  <div key={item.department} className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-sm font-medium text-slate-800">{item.department}</div>
                    <div className="mt-3">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Discharge Summary</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <div>
                  <label htmlFor="clinicalCourse" className="mb-2 block text-sm font-medium text-slate-700">
                    Clinical Course
                  </label>
                  <textarea
                    id="clinicalCourse"
                    rows="6"
                    defaultValue="Patient admitted for fracture observation and pain control. Condition improved with immobilization, medication, and nursing care. Stable for discharge."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="conditionOnDischarge" className="mb-2 block text-sm font-medium text-slate-700">
                    Condition on Discharge
                  </label>
                  <textarea
                    id="conditionOnDischarge"
                    rows="6"
                    defaultValue="Patient ambulates with support, pain controlled, no acute distress, continue home care and follow-up review."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="xl:col-span-2">
                  <label htmlFor="homeInstructions" className="mb-2 block text-sm font-medium text-slate-700">
                    Home Care Instructions
                  </label>
                  <textarea
                    id="homeInstructions"
                    rows="5"
                    defaultValue="Keep limb immobilized, avoid weight-bearing until reviewed, take medications as prescribed, return immediately if swelling, fever, or severe pain develops."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-900">Discharge Medications</h2>
                  <p className="mt-1 text-sm text-slate-500">Medications to continue after leaving the hospital.</p>
                </div>
                <div className="p-6 space-y-4">
                  {medications.map((item) => (
                    <div key={item.drug} className="rounded-2xl border border-slate-200 p-4">
                      <div className="font-semibold text-slate-900">{item.drug}</div>
                      <div className="mt-1 text-sm text-slate-600">{item.instruction}</div>
                      <div className="mt-1 text-xs text-slate-500">Duration: {item.duration}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-900">Follow-up Plan</h2>
                  <p className="mt-1 text-sm text-slate-500">Scheduled appointments and aftercare tasks.</p>
                </div>
                <div className="p-6 space-y-4">
                  {followUpItems.map((item) => (
                    <div key={item.type + item.date} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{item.type}</div>
                          <div className="mt-1 text-sm text-slate-600">{item.date} • {item.time}</div>
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
              <h2 className="text-xl font-semibold text-slate-900">Discharge Checklist</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Final vitals recorded</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Discharge medications issued</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Billing cleared</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Follow-up appointment booked</span>
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Discharge Actions</h2>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Confirm Discharge
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Print Summary
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Print Instructions
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Release Bed
                </button>
                <button className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-100">
                  Hold Discharge
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
