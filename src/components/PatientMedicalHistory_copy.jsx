export default function PatientMedicalHistoryScreen() {
  const patient = {
    id: 'HMS-2041',
    name: 'Amina Hassan',
    gender: 'Female',
    age: 29,
    dateOfBirth: '12 Aug 1996',
    bloodGroup: 'O+',
    phone: '+255 712 345 678',
    email: 'amina.hassan@example.com',
    address: 'Mikocheni, Dar es Salaam',
    insurance: 'NHIF',
    allergies: 'No known drug allergies',
    chronicConditions: 'None documented',
  };

  const historyTimeline = [
    {
      visitDate: '27 Mar 2026',
      complaint: 'Fever, headache, and body weakness for 2 days',
      doctorSuggestion:
        'Start antimalarial treatment, encourage hydration, and schedule follow-up after medication completion.',
      labTests: ['Malaria Rapid Test', 'Full Blood Count'],
      medicines: ['Artemether/Lumefantrine', 'Paracetamol 500mg'],
      doctor: 'Dr. Michael',
      status: 'Completed',
    },
    {
      visitDate: '14 Feb 2026',
      complaint: 'Lower back pain after prolonged standing',
      doctorSuggestion:
        'Use pain relief medication, avoid strain, and begin physiotherapy-guided exercises.',
      labTests: ['Lumbar X-ray'],
      medicines: ['Ibuprofen 400mg', 'Muscle Relaxant'],
      doctor: 'Dr. Esther',
      status: 'Completed',
    },
    {
      visitDate: '05 Jan 2026',
      complaint: 'Routine cardiac follow-up review',
      doctorSuggestion:
        'Continue observation, maintain lifestyle advice, and return for routine review if symptoms appear.',
      labTests: ['ECG'],
      medicines: ['No new medication prescribed'],
      doctor: 'Dr. Joseph',
      status: 'Completed',
    },
  ];

  const diagnoses = [
    { date: '27 Mar 2026', diagnosis: 'Suspected uncomplicated malaria', doctor: 'Dr. Michael' },
    { date: '14 Feb 2026', diagnosis: 'Lower back pain', doctor: 'Dr. Esther' },
    { date: '05 Jan 2026', diagnosis: 'Routine cardiac review', doctor: 'Dr. Joseph' },
  ];

  const medications = [
    { drug: 'Artemether/Lumefantrine', dosage: '4 tablets twice daily', duration: '3 days', date: '27 Mar 2026' },
    { drug: 'Paracetamol 500mg', dosage: '1 tablet every 8 hours', duration: '5 days', date: '27 Mar 2026' },
    { drug: 'Ibuprofen 400mg', dosage: '1 tablet twice daily', duration: '7 days', date: '14 Feb 2026' },
  ];

  const labResults = [
    { test: 'Malaria Rapid Test', result: 'Positive', date: '27 Mar 2026', status: 'Reviewed' },
    { test: 'Full Blood Count', result: 'Mild anemia', date: '27 Mar 2026', status: 'Abnormal' },
    { test: 'ECG', result: 'Normal', date: '05 Jan 2026', status: 'Reviewed' },
  ];

  const getStatusClasses = (status) => {
    if (status === 'Completed' || status === 'Reviewed') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Abnormal') {
      return 'bg-red-50 text-red-700 border border-red-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Patients / Medical History</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Patient Medical History</h1>
            <p className="mt-2 text-slate-600">
              View a complete longitudinal record of visits, diagnoses, medications, lab results, and clinical history.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Print History
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Open Patient Record
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
                    <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">Patient ID: {patient.id}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {patient.gender} • {patient.age} years • DOB: {patient.dateOfBirth}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">Phone: {patient.phone} • Email: {patient.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 sm:min-w-[320px]">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Blood Group</div>
                    <div className="mt-1">{patient.bloodGroup}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Insurance</div>
                    <div className="mt-1">{patient.insurance}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Address</div>
                  <div className="mt-1 text-slate-600">{patient.address}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Allergies</div>
                  <div className="mt-1 text-slate-600">{patient.allergies}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-800">Chronic Conditions</div>
                  <div className="mt-1 text-slate-600">{patient.chronicConditions}</div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Medical History Timeline</h2>
                  <p className="mt-1 text-sm text-slate-500">Chronological view of the patient’s previous visits and outcomes.</p>
                </div>
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Filter History
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {historyTimeline.map((item) => (
                  <div
                    key={item.visitDate + item.complaint}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-slate-500">Visit Date: {item.visitDate}</div>
                        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="text-sm font-medium text-slate-800">Complaint</div>
                            <div className="mt-1 text-sm text-slate-600">{item.complaint}</div>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="text-sm font-medium text-slate-800">Doctor Suggestion</div>
                            <div className="mt-1 text-sm text-slate-600">{item.doctorSuggestion}</div>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="text-sm font-medium text-slate-800">Lab Tests</div>
                            <div className="mt-1 text-sm text-slate-600">{item.labTests.join(', ')}</div>
                          </div>
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="text-sm font-medium text-slate-800">Medicine Prescribed</div>
                            <div className="mt-1 text-sm text-slate-600">{item.medicines.join(', ')}</div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-slate-500">Doctor: {item.doctor}</div>
                      </div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-900">Past Diagnoses</h2>
                </div>
                <div className="p-6 space-y-4">
                  {diagnoses.map((item) => (
                    <div key={item.date + item.diagnosis} className="rounded-2xl border border-slate-200 p-4">
                      <div className="font-semibold text-slate-900">{item.diagnosis}</div>
                      <div className="mt-1 text-sm text-slate-600">{item.date}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.doctor}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-900">Medication History</h2>
                </div>
                <div className="p-6 space-y-4">
                  {medications.map((item) => (
                    <div key={item.drug + item.date} className="rounded-2xl border border-slate-200 p-4">
                      <div className="font-semibold text-slate-900">{item.drug}</div>
                      <div className="mt-1 text-sm text-slate-600">{item.dosage}</div>
                      <div className="mt-1 text-xs text-slate-500">Duration: {item.duration} • {item.date}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Lab History</h2>
              </div>
              <div className="p-6 space-y-4">
                {labResults.map((item) => (
                  <div key={item.test + item.date} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">{item.test}</div>
                        <div className="mt-1 text-sm text-slate-600">{item.result}</div>
                        <div className="mt-1 text-xs text-slate-500">{item.date}</div>
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
              <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Start New Consultation
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Add Clinical Note
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  View Prescriptions
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Request Lab Test
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Book Follow-up
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
