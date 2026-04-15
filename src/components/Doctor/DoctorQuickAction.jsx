import React from 'react'

const DoctorQuickAction = () => {
      const quickActions = [
    'Start Consultation',
    'Open Medical Record',
    'Write Prescription',
    'Request Lab Test',
    'Book Follow-up',
    'Issue Referral',
  ];

  return (
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
  )
}

export default DoctorQuickAction
