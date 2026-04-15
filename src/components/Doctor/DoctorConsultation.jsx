export default function DoctorConsultation() {
  const patient = {
    id: 'HMS-2041',
    name: 'Amina Hassan',
    gender: 'Female',
    age: 29,
    bloodGroup: 'O+',
    phone: '+255 712 345 678',
    visitType: 'Consultation',
    appointmentTime: '09:00 AM',
    status: 'In Consultation',
    complaint: 'Fever, headache, and body weakness for 2 days',
    allergies: 'No known drug allergies',
  };

  const vitals = [
    { label: 'Temperature', value: '38.4°C' },
    { label: 'Blood Pressure', value: '118/76 mmHg' },
    { label: 'Pulse', value: '96 bpm' },
    { label: 'Weight', value: '64 kg' },
    { label: 'SpO2', value: '98%' },
    { label: 'Resp. Rate', value: '18/min' },
  ];

  const historyItems = [
    'Previous visit on 14 Feb 2026 for lower back pain.',
    'No chronic illness documented.',
    'Completed malaria treatment once in 2024.',
  ];

  const labOrders = [
    { name: 'Malaria Rapid Test', status: 'Ordered' },
    { name: 'Full Blood Count', status: 'Sample Collected' },
  ];

  const prescriptions = [
    { drug: 'Paracetamol 500mg', dosage: '1 tablet every 8 hours', duration: '5 days' },
    { drug: 'Oral Rehydration', dosage: 'As advised', duration: '3 days' },
  ];

  const getStatusClasses = (status) => {
    if (status === 'In Consultation' || status === 'Ordered') {
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
    if (status === 'Sample Collected') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Doctor Portal / Consultation</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Doctor Consultation</h1>
            <p className="mt-2 text-slate-600">
              Review the active case, document findings, order tests, prescribe treatment, and complete the visit.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Back to Queue
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Save Consultation
            </button>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="xl:col-span-3 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-xl font-bold text-sky-700">
                    AH
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
                      {patient.gender} • {patient.age} years • Blood Group: {patient.bloodGroup}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">Phone: {patient.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 sm:min-w-[320px]">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Visit Type</div>
                    <div className="mt-1">{patient.visitType}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Appointment</div>
                    <div className="mt-1">{patient.appointmentTime}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Chief Complaint</div>
                  <div className="mt-1 text-slate-600">{patient.complaint}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Allergies</div>
                  <div className="mt-1 text-slate-600">{patient.allergies}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Clinical Warning</div>
                  <div className="mt-1 text-slate-600">No active critical alerts</div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Current Vitals</h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {vitals.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm text-slate-500">{item.label}</div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Consultation Notes</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <div>
                  <label htmlFor="history" className="mb-2 block text-sm font-medium text-slate-700">
                    History of Present Illness
                  </label>
                  <textarea
                    id="history"
                    rows="6"
                    defaultValue="Patient reports persistent fever, headache, and generalized body weakness for 2 days. No vomiting or difficulty breathing."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="examination" className="mb-2 block text-sm font-medium text-slate-700">
                    Physical Examination
                  </label>
                  <textarea
                    id="examination"
                    rows="6"
                    defaultValue="Patient is alert, febrile, mildly dehydrated, no respiratory distress, cardiovascular examination stable."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="diagnosis" className="mb-2 block text-sm font-medium text-slate-700">
                    Provisional Diagnosis
                  </label>
                  <textarea
                    id="diagnosis"
                    rows="4"
                    defaultValue="Suspected uncomplicated malaria with mild dehydration."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="plan" className="mb-2 block text-sm font-medium text-slate-700">
                    Treatment Plan
                  </label>
                  <textarea
                    id="plan"
                    rows="4"
                    defaultValue="Order malaria rapid test and FBC, start supportive treatment, prescribe antipyretic, advise hydration."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Lab Requests</h2>
                  <button className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100">
                    + Add Test
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {labOrders.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{item.name}</div>
                          <div className="mt-1 text-sm text-slate-500">Requested during current visit</div>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Prescriptions</h2>
                  <button className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100">
                    + Add Drug
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {prescriptions.map((item) => (
                    <div key={item.drug} className="rounded-2xl border border-slate-200 p-4">
                      <div className="font-semibold text-slate-900">{item.drug}</div>
                      <div className="mt-1 text-sm text-slate-600">{item.dosage}</div>
                      <div className="mt-1 text-xs text-slate-500">Duration: {item.duration}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Past History</h2>
              <div className="mt-5 space-y-3">
                {historyItems.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Visit Actions</h2>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Complete Consultation
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Send to Lab
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Send Prescription to Pharmacy
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Book Follow-up Visit
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Admit Patient
                </button>
                <button className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-100">
                  Cancel Visit
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
