export default function PharmacyDispensing() {
  const patient = {
    id: 'HMS-2041',
    name: 'Amina Hassan',
    age: 29,
    gender: 'Female',
    doctor: 'Dr. Michael',
    visitDate: '27 Mar 2026',
    status: 'Prescription Ready',
  };

  const prescriptionQueue = [
    {
      patient: 'Amina Hassan',
      id: 'HMS-2041',
      doctor: 'Dr. Michael',
      items: 3,
      time: '10:20 AM',
      status: 'Ready',
    },
    {
      patient: 'John Peter',
      id: 'HMS-1988',
      doctor: 'Dr. Neema',
      items: 2,
      time: '10:35 AM',
      status: 'Preparing',
    },
    {
      patient: 'Grace Daniel',
      id: 'HMS-1872',
      doctor: 'Dr. Joseph',
      items: 4,
      time: '10:50 AM',
      status: 'Waiting Verification',
    },
  ];

  const medications = [
    {
      drug: 'Artemether/Lumefantrine',
      dosage: '4 tablets twice daily',
      duration: '3 days',
      stock: 42,
      dispensed: '24 tablets',
      status: 'Available',
    },
    {
      drug: 'Paracetamol 500mg',
      dosage: '1 tablet every 8 hours',
      duration: '5 days',
      stock: 120,
      dispensed: '15 tablets',
      status: 'Available',
    },
    {
      drug: 'ORS Sachets',
      dosage: '1 sachet after loose stool / as advised',
      duration: '3 days',
      stock: 8,
      dispensed: '6 sachets',
      status: 'Low Stock',
    },
  ];

  const quickActions = [
    'Mark as Prepared',
    'Verify Prescription',
    'Dispense Medication',
    'Print Labels',
    'Print Receipt Copy',
    'Notify Cashier',
  ];

  const stockAlerts = [
    'ORS Sachets running low: 8 remaining',
    'Amoxicillin 500mg below reorder level',
    'Gloves stock updated after morning shift',
  ];

  const getStatusClasses = (status) => {
    if (status === 'Ready' || status === 'Available' || status === 'Prescription Ready') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Preparing' || status === 'Waiting Verification') {
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
    if (status === 'Low Stock') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Pharmacy / Prescription Dispensing</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Pharmacy & Dispensing</h1>
            <p className="mt-2 text-slate-600">
              Verify prescriptions, prepare medications, dispense drugs, and monitor pharmacy stock in one workflow.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Back to Consultation
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Save Dispensing Update
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
                    <p className="mt-1 text-sm text-slate-600">Prescribing Doctor: {patient.doctor}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Prescription Queue</h2>
                  <p className="mt-1 text-sm text-slate-500">Track incoming prescriptions and dispensing progress.</p>
                </div>
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Refresh Queue
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Patient</th>
                      <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                      <th className="px-6 py-4 text-left font-semibold">Items</th>
                      <th className="px-6 py-4 text-left font-semibold">Time</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                      <th className="px-6 py-4 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionQueue.map((item) => (
                      <tr key={item.id + item.time} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">{item.patient}</div>
                          <div className="mt-1 text-xs text-slate-500">{item.id}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-700">{item.doctor}</td>
                        <td className="px-6 py-4 text-slate-700">{item.items}</td>
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
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Prescription Items</h2>
                  <p className="mt-1 text-sm text-slate-500">Verify stock, dosage, and dispensing quantities before release.</p>
                </div>
                <button className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100">
                  + Add Item
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Drug</th>
                      <th className="px-6 py-4 text-left font-semibold">Dosage</th>
                      <th className="px-6 py-4 text-left font-semibold">Duration</th>
                      <th className="px-6 py-4 text-left font-semibold">Stock</th>
                      <th className="px-6 py-4 text-left font-semibold">Dispense Qty</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map((item) => (
                      <tr key={item.drug} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{item.drug}</td>
                        <td className="px-6 py-4 text-slate-700">{item.dosage}</td>
                        <td className="px-6 py-4 text-slate-700">{item.duration}</td>
                        <td className="px-6 py-4 text-slate-700">{item.stock}</td>
                        <td className="px-6 py-4 text-slate-700">{item.dispensed}</td>
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
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Dispensing & Counseling</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label htmlFor="pharmacist" className="mb-2 block text-sm font-medium text-slate-700">
                    Dispensing Pharmacist
                  </label>
                  <input
                    id="pharmacist"
                    type="text"
                    defaultValue="Pharmacist Neema"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="dispenseStatus" className="mb-2 block text-sm font-medium text-slate-700">
                    Dispense Status
                  </label>
                  <select
                    id="dispenseStatus"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Prepared</option>
                    <option>Dispensed</option>
                    <option>Partially Dispensed</option>
                    <option>Awaiting Payment</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pickupTime" className="mb-2 block text-sm font-medium text-slate-700">
                    Pickup Time
                  </label>
                  <input
                    id="pickupTime"
                    type="time"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                  <label htmlFor="instructions" className="mb-2 block text-sm font-medium text-slate-700">
                    Patient Instructions / Counseling Notes
                  </label>
                  <textarea
                    id="instructions"
                    rows="4"
                    defaultValue="Take antimalarial after meals. Complete full dose. Use paracetamol only when fever is present. Return if symptoms worsen."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
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
              <h2 className="text-xl font-semibold text-slate-900">Stock Alerts</h2>
              <div className="mt-5 space-y-3">
                {stockAlerts.map((alert) => (
                  <div key={alert} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    {alert}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Dispensing Actions</h2>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Confirm Dispense
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Print Medication Label
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Mark Partial Fulfillment
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Return to Doctor
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
