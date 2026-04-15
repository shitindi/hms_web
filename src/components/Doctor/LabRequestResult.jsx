export default function LabRequestAndResults() {
  const patient = {
    id: 'HMS-2041',
    name: 'Amina Hassan',
    age: 29,
    gender: 'Female',
    doctor: 'Dr. Michael',
    department: 'General Medicine',
    visitDate: '27 Mar 2026',
    status: 'Pending Results',
  };

  const requestedTests = [
    {
      test: 'Malaria Rapid Test',
      category: 'Hematology',
      specimen: 'Blood',
      orderedAt: '09:20 AM',
      status: 'Sample Collected',
    },
    {
      test: 'Full Blood Count',
      category: 'Hematology',
      specimen: 'Blood',
      orderedAt: '09:22 AM',
      status: 'In Progress',
    },
    {
      test: 'Urinalysis',
      category: 'Clinical Chemistry',
      specimen: 'Urine',
      orderedAt: '09:25 AM',
      status: 'Ordered',
    },
  ];

  const completedResults = [
    {
      test: 'Malaria Rapid Test',
      result: 'Positive',
      reference: 'Negative',
      reportedAt: '10:05 AM',
      status: 'Reviewed',
    },
    {
      test: 'Hemoglobin',
      result: '10.8 g/dL',
      reference: '12.0 - 15.5 g/dL',
      reportedAt: '10:12 AM',
      status: 'Abnormal',
    },
  ];

  const quickActions = [
    'Collect Sample',
    'Mark In Progress',
    'Enter Result',
    'Print Report',
    'Notify Doctor',
    'Release Results',
  ];

  const getStatusClasses = (status) => {
    if (status === 'Reviewed') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Abnormal') {
      return 'bg-red-50 text-red-700 border border-red-200';
    }
    if (status === 'Sample Collected') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    if (status === 'In Progress' || status === 'Pending Results') {
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Laboratory / Request & Results</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Lab Request & Results</h1>
            <p className="mt-2 text-slate-600">
              Manage ordered tests, specimen handling, result entry, and result review in one workflow.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Back to Consultation
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Save Lab Update
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
                      {patient.gender} • {patient.age} years • Visit Date: {patient.visitDate}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Requesting Doctor: {patient.doctor} • Department: {patient.department}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Create / Update Lab Request</h2>
                  <p className="mt-1 text-sm text-slate-500">Order a new test or update the current test workflow.</p>
                </div>
                <button className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100">
                  + Add Test
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label htmlFor="testName" className="mb-2 block text-sm font-medium text-slate-700">
                    Test Name
                  </label>
                  <select
                    id="testName"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Select test</option>
                    <option>Malaria Rapid Test</option>
                    <option>Full Blood Count</option>
                    <option>Urinalysis</option>
                    <option>Blood Sugar</option>
                    <option>Liver Function Test</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Select category</option>
                    <option>Hematology</option>
                    <option>Clinical Chemistry</option>
                    <option>Microbiology</option>
                    <option>Parasitology</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="specimen" className="mb-2 block text-sm font-medium text-slate-700">
                    Specimen Type
                  </label>
                  <select
                    id="specimen"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Select specimen</option>
                    <option>Blood</option>
                    <option>Urine</option>
                    <option>Stool</option>
                    <option>Swab</option>
                  </select>
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                  <label htmlFor="clinicalNotes" className="mb-2 block text-sm font-medium text-slate-700">
                    Clinical Notes / Reason for Test
                  </label>
                  <textarea
                    id="clinicalNotes"
                    rows="4"
                    defaultValue="Patient presents with fever and headache. Rule out malaria and assess hemoglobin level."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Requested Tests</h2>
                  <p className="mt-1 text-sm text-slate-500">Track specimen collection and processing status.</p>
                </div>
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Refresh Queue
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Test</th>
                      <th className="px-6 py-4 text-left font-semibold">Category</th>
                      <th className="px-6 py-4 text-left font-semibold">Specimen</th>
                      <th className="px-6 py-4 text-left font-semibold">Ordered At</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestedTests.map((item) => (
                      <tr key={item.test + item.orderedAt} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{item.test}</td>
                        <td className="px-6 py-4 text-slate-700">{item.category}</td>
                        <td className="px-6 py-4 text-slate-700">{item.specimen}</td>
                        <td className="px-6 py-4 text-slate-700">{item.orderedAt}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="rounded-xl bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700 hover:bg-sky-100">
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Completed Results</h2>
                  <p className="mt-1 text-sm text-slate-500">Enter, review, and release laboratory findings.</p>
                </div>
                <button className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100">
                  + Enter Result
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Test</th>
                      <th className="px-6 py-4 text-left font-semibold">Result</th>
                      <th className="px-6 py-4 text-left font-semibold">Reference Range</th>
                      <th className="px-6 py-4 text-left font-semibold">Reported At</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedResults.map((item) => (
                      <tr key={item.test + item.reportedAt} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{item.test}</td>
                        <td className="px-6 py-4 text-slate-700">{item.result}</td>
                        <td className="px-6 py-4 text-slate-700">{item.reference}</td>
                        <td className="px-6 py-4 text-slate-700">{item.reportedAt}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
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
              <h2 className="text-xl font-semibold text-slate-900">Result Entry</h2>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="resultTest" className="mb-2 block text-sm font-medium text-slate-700">
                    Select Test
                  </label>
                  <select
                    id="resultTest"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Malaria Rapid Test</option>
                    <option>Full Blood Count</option>
                    <option>Urinalysis</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="resultValue" className="mb-2 block text-sm font-medium text-slate-700">
                    Result Value
                  </label>
                  <input
                    id="resultValue"
                    type="text"
                    placeholder="Enter result"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="interpretation" className="mb-2 block text-sm font-medium text-slate-700">
                    Interpretation / Notes
                  </label>
                  <textarea
                    id="interpretation"
                    rows="4"
                    placeholder="Add lab interpretation or remarks"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Submit Result
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
