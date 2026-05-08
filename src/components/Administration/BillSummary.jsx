export default function BillSummaryDetails() {
  const invoice = {
    invoiceNo: 'INV-2026-10482',
    patientName: 'Amina Hassan',
    patientId: 'HMS-2041',
    invoiceDate: '27 Mar 2026',
    cashier: 'Cashier Rehema',
    status: 'Partial Payment',
  };

  const consultationFees = [
    {
      service: 'General Medicine Consultation',
      doctor: 'Dr. Michael',
      qty: 1,
      unitPrice: 15000,
      amount: 15000,
    },
  ];

  const labBills = [
    {
      service: 'Malaria Rapid Test',
      category: 'Microbiology',
      qty: 1,
      unitPrice: 10000,
      amount: 10000,
    },
    {
      service: 'Full Blood Count',
      category: 'Hematology',
      qty: 1,
      unitPrice: 12000,
      amount: 12000,
    },
  ];

  const prescriptionBills = [
    {
      medicine: 'Artemether/Lumefantrine',
      dosage: '20/120mg',
      qty: 24,
      unitPrice: 500,
      amount: 12000,
    },
    {
      medicine: 'Paracetamol 500mg',
      dosage: '500mg',
      qty: 15,
      unitPrice: 200,
      amount: 3000,
    },
  ];

  const payments = [
    {
      method: 'Insurance',
      reference: 'NHIF-2026-0018',
      amount: 25000,
      status: 'Approved',
    },
  ];

  const formatMoney = (value) => {
    return new Intl.NumberFormat('en-TZ').format(value) + ' TZS';
  };

  const sumAmount = (items) => {
    return items.reduce((total, item) => total + Number(item.amount), 0);
  };

  const consultationTotal = sumAmount(consultationFees);
  const labTotal = sumAmount(labBills);
  const prescriptionTotal = sumAmount(prescriptionBills);
  const subtotal = consultationTotal + labTotal + prescriptionTotal;
  const discount = 0;
  const paidAmount = payments.reduce((total, item) => total + Number(item.amount), 0);
  const grandTotal = subtotal - discount;
  const balance = grandTotal - paidAmount;

  const getStatusClasses = (status) => {
    if (status === 'Approved' || status === 'Paid') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Partial Payment') {
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    }
    return 'bg-amber-50 text-amber-700 border border-amber-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Billing / Invoice Summary</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Bill Summary Details</h1>
            <p className="mt-2 text-slate-600">
              Review consultation fees, lab bills, prescription charges, payments, and outstanding balance.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Back to Billing Dashboard
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Print Invoice
            </button>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="xl:col-span-3 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-900">{invoice.invoiceNo}</h2>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Patient: <span className="font-semibold text-slate-900">{invoice.patientName}</span> • {invoice.patientId}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Invoice Date: {invoice.invoiceDate} • Cashier: {invoice.cashier}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 sm:min-w-[320px]">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-medium text-slate-800">Grand Total</div>
                    <div className="mt-1 text-lg font-bold text-slate-900">{formatMoney(grandTotal)}</div>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-4 text-amber-800">
                    <div className="font-medium">Balance</div>
                    <div className="mt-1 text-lg font-bold">{formatMoney(balance)}</div>
                  </div>
                </div>
              </div>
            </section>

            <BillSection
              title="Consultation Fee"
              total={consultationTotal}
              headers={['Service', 'Doctor', 'Qty', 'Unit Price', 'Amount']}
              rows={consultationFees.map((item) => [
                item.service,
                item.doctor,
                item.qty,
                formatMoney(item.unitPrice),
                formatMoney(item.amount),
              ])}
            />

            <BillSection
              title="Lab Bill"
              total={labTotal}
              headers={['Test', 'Category', 'Qty', 'Unit Price', 'Amount']}
              rows={labBills.map((item) => [
                item.service,
                item.category,
                item.qty,
                formatMoney(item.unitPrice),
                formatMoney(item.amount),
              ])}
            />

            <BillSection
              title="Prescription Bill"
              total={prescriptionTotal}
              headers={['Medicine', 'Dosage', 'Qty', 'Unit Price', 'Amount']}
              rows={prescriptionBills.map((item) => [
                item.medicine,
                item.dosage,
                item.qty,
                formatMoney(item.unitPrice),
                formatMoney(item.amount),
              ])}
            />

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Payment History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Method</th>
                      <th className="px-6 py-4 text-left font-semibold">Reference</th>
                      <th className="px-6 py-4 text-left font-semibold">Amount</th>
                      <th className="px-6 py-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.reference} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 text-slate-700">{payment.method}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{payment.reference}</td>
                        <td className="px-6 py-4 text-slate-700">{formatMoney(payment.amount)}</td>
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

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Invoice Totals</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-700">
                <SummaryRow label="Consultation" value={formatMoney(consultationTotal)} />
                <SummaryRow label="Lab" value={formatMoney(labTotal)} />
                <SummaryRow label="Prescription" value={formatMoney(prescriptionTotal)} />
                <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
                <SummaryRow label="Discount" value={formatMoney(discount)} />
                <SummaryRow label="Paid" value={formatMoney(paidAmount)} />
                <div className="flex items-center justify-between rounded-2xl bg-sky-50 p-4 text-sky-800">
                  <span className="font-medium">Grand Total</span>
                  <span className="text-lg font-bold">{formatMoney(grandTotal)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4 text-amber-800">
                  <span className="font-medium">Balance</span>
                  <span className="text-lg font-bold">{formatMoney(balance)}</span>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Actions</h2>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Record Payment
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Print Receipt
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Apply Discount
                </button>
                <button className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Send to Insurance
                </button>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </div>
  );
}

function BillSection({ title, total, headers, rows }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800">
          Total: {new Intl.NumberFormat('en-TZ').format(total)} TZS
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-4 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-slate-100 hover:bg-slate-50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-6 py-4 ${cellIndex === 0 ? 'font-medium text-slate-900' : 'text-slate-700'}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
