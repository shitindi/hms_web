import React from 'react'

const GenericMenu = () => {
  return (
    <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-start">
       <input
            type="text"
            placeholder="Search patients, doctors, invoices, reports..."
            className="w-full lg:w-96 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
          />

          <div className="flex flex-wrap gap-2">

            <button
              className="rounded-2xl border border-slate-300 bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-slate-50"
            >
              Add Patient
            </button>

            <button
              className="rounded-2xl border border-slate-300 bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-slate-50"
            >
              Add Appointment
            </button>
            <button
              className="rounded-2xl border border-slate-300 bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-slate-50"
            >
              Add Doctor
            </button>
          </div>
    </div>
  )
}

export default GenericMenu
