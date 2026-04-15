export default function BillingInvoicing() {
  const patient = {
    id: 'HMS-2041',
    name: 'Amina Hassan',
    age: 29,
    gender: 'Female',
    visitDate: '27 Mar 2026',
    paymentType: 'Insurance + Cash',
    status: 'Pending Payment',
  };

  const invoiceItems = [
    {
      category: 'Consultation',
      description: 'General Medicine Consultation',
      qty: 1,
      unitPrice: 15000,
      amount: 15000,
      status: 'Added',
    },
    {
      category: 'Laboratory',
      description: 'Malaria Rapid Test',
      qty: 1,
      unitPrice: 10000,
      amount: 10000,
      status: 'Added',
    },
    {
      category: 'Procedure',
      description: 'Wound Dressing / Nursing Care',
      qty: 1,
      unitPrice: 12000,
      amount: 12000,
      status: 'Added',
    },
    {
      category: 'Pharmacy',
      description: 'Artemether/Lumefantrine',
      qty: 24,
      unitPrice: 500,
      amount: 12000,
      status: 'Added',
    },
    {
      category: 'Pharmacy',
      description: 'Paracetamol 500mg',
      qty: 15,
      unitPrice: 200,
      amount: 3000,
      status: 'Added',
    },
  ];

  const payments = [
    {
      method: 'Insurance',
      reference: 'NHIF-2026-0018',
      amount: 25000,
      status: 'Approved',
      time: '11:10 AM',
    },
    {
      method: 'Cash',
      reference: 'RCPT-10482',
      amount: 27000,
      status: 'Pending',
      time: '11:15 AM',
    },
  ];

  const quickActions = [
    'Add Charge',
    'Apply Discount',
    'Verify Insurance',
    'Record Payment',
    'Print Invoice',
    'Print Receipt',
  ];

  const summary = {
    subtotal: 52000,
    discount: 0,
    insuranceCover: 25000,
    tax: 0,
    total: 52000,
    balance: 27000,
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat('en-TZ').format(value) + ' TZS';
  };

  const getStatusClasses = (status) => {
    if (status === 'Approved') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Pending Payment' || status === 'Pending') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    return 'bg-slate-50 text-slate-700 border border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Billing / Invoicing</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Billing & Invoicing</h1>
            <p className="mt-2 text-slate-600">
              Consolidate charges from consultation, laboratory, procedures, and pharmacy, then receive payments and issue receipts.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Back to Patient Record
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Save Invoice
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
                    <p className="mt-1 text-sm text-slate-600">Payment Type: {patient.paymentType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 sm:min-w-[320px]">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Invoice No.</div>
                    <div className="mt-1">INV-2026-10482</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Cashier</div>
                    <div className="mt-1">Cashier Rehema</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Invoice Items</h2>
                  <p className="mt-1 text-sm text-slate-500">Charges collected from all service points in the patient journey.</p>
                </div>
                <button className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100">
                  + Add Manual Charge
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Category</th>
                      <th className="px-6 py-4 text-left font-semibold">Description</th>
                      <th className="px-6 py-4 text-left font-semibold">Qty</th>
                      <th className="px-6 py-4 text-left font-semibold">Unit Price</th>
                      <th className="px-6 py-4 text-left font-semibold">Amount</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceItems.map((item) => (
                      <tr key={item.category + item.description} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 text-slate-700">{item.category}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{item.description}</td>
                        <td className="px-6 py-4 text-slate-700">{item.qty}</td>
                        <td className="px-6 py-4 text-slate-700">{formatMoney(item.unitPrice)}</td>
                        <td className="px-6 py-4 text-slate-700">{formatMoney(item.amount)}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
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
              <h2 className="text-xl font-semibold text-slate-900">Payment Entry</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label htmlFor="paymentMethod" className="mb-2 block text-sm font-medium text-slate-700">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option>Cash</option>
                    <option>Insurance</option>
                    <option>Card</option>
                    <option>Mobile Money</option>
                    <option>Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="paymentAmount" className="mb-2 block text-sm font-medium text-slate-700">
                    Amount
                  </label>
                  <input
                    id="paymentAmount"
                    type="number"
                    placeholder="Enter amount"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="reference" className="mb-2 block text-sm font-medium text-slate-700">
                    Reference No.
                  </label>
                  <input
                    id="reference"
                    type="text"
                    placeholder="Receipt / transaction reference"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                  <label htmlFor="paymentNotes" className="mb-2 block text-sm font-medium text-slate-700">
                    Notes
                  </label>
                  <textarea
                    id="paymentNotes"
                    rows="4"
                    placeholder="Enter payment comments or insurance notes"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Payment History</h2>
                  <p className="mt-1 text-sm text-slate-500">Track approved, pending, and completed payments.</p>
                </div>
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Refresh Payments
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Method</th>
                      <th className="px-6 py-4 text-left font-semibold">Reference</th>
                      <th className="px-6 py-4 text-left font-semibold">Amount</th>
                      <th className="px-6 py-4 text-left font-semibold">Time</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.reference} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 text-slate-700">{payment.method}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{payment.reference}</td>
                        <td className="px-6 py-4 text-slate-700">{formatMoney(payment.amount)}</td>
                        <td className="px-6 py-4 text-slate-700">{payment.time}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(payment.status)}`}>
                            {payment.status}
                          </span>
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
              <h2 className="text-xl font-semibold text-slate-900">Invoice Summary</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatMoney(summary.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span>Discount</span>
                  <span className="font-semibold">{formatMoney(summary.discount)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span>Insurance Cover</span>
                  <span className="font-semibold">{formatMoney(summary.insuranceCover)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span>Tax</span>
                  <span className="font-semibold">{formatMoney(summary.tax)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-sky-50 p-4 text-sky-800">
                  <span className="font-medium">Total</span>
                  <span className="text-lg font-bold">{formatMoney(summary.total)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4 text-amber-800">
                  <span className="font-medium">Balance</span>
                  <span className="text-lg font-bold">{formatMoney(summary.balance)}</span>
                </div>
              </div>
            </section>

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
              <h2 className="text-xl font-semibold text-slate-900">Billing Actions</h2>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Confirm Payment
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Print Invoice
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Print Receipt
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Send to Insurance Desk
                </button>
                <button className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-100">
                  Cancel Invoice
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
