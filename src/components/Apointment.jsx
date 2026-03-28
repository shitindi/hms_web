export default function Appointment() {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert('Appointment booked successfully.');
  };

  const availableSlots = [
    '08:00 AM',
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:30 AM',
    '11:00 AM',
    '02:00 PM',
    '02:30 PM',
  ];

  const recentAppointments = [
    {
      patient: 'Amina Hassan',
      doctor: 'Dr. Michael',
      department: 'General Medicine',
      date: '27 Mar 2026',
      time: '09:00 AM',
      status: 'Confirmed',
    },
    {
      patient: 'John Peter',
      doctor: 'Dr. Neema',
      department: 'Pediatrics',
      date: '27 Mar 2026',
      time: '09:30 AM',
      status: 'Waiting',
    },
    {
      patient: 'Grace Daniel',
      doctor: 'Dr. Joseph',
      department: 'Cardiology',
      date: '27 Mar 2026',
      time: '10:15 AM',
      status: 'Checked In',
    },
  ];

  const getStatusClasses = (status) => {
    if (status === 'Confirmed') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (status === 'Waiting') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    return 'bg-sky-50 text-sky-700 border border-sky-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Appointments / Booking</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Appointment Booking</h1>
            <p className="mt-2 text-slate-600">
              Schedule patient visits, assign doctors, choose time slots, and manage booking details.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              View Calendar
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              Appointment List
            </button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Patient & Visit Details</h2>
                  <p className="mt-1 text-sm text-slate-500">Select the patient and define the visit information.</p>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  Required
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="patient" className="mb-2 block text-sm font-medium text-slate-700">
                    Patient
                  </label>
                  <select
                    id="patient"
                    name="patient"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select patient</option>
                    <option>Amina Hassan</option>
                    <option>John Peter</option>
                    <option>Grace Daniel</option>
                    <option>Salim Omari</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="visitType" className="mb-2 block text-sm font-medium text-slate-700">
                    Visit Type
                  </label>
                  <select
                    id="visitType"
                    name="visitType"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select visit type</option>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Review</option>
                    <option>Emergency Review</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="department" className="mb-2 block text-sm font-medium text-slate-700">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select department</option>
                    <option>General Medicine</option>
                    <option>Pediatrics</option>
                    <option>Cardiology</option>
                    <option>Orthopedics</option>
                    <option>Gynecology</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="doctor" className="mb-2 block text-sm font-medium text-slate-700">
                    Doctor
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select doctor</option>
                    <option>Dr. Michael</option>
                    <option>Dr. Neema</option>
                    <option>Dr. Esther</option>
                    <option>Dr. Joseph</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="appointmentDate" className="mb-2 block text-sm font-medium text-slate-700">
                    Appointment Date
                  </label>
                  <input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="priority" className="mb-2 block text-sm font-medium text-slate-700">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select priority</option>
                    <option>Normal</option>
                    <option>Urgent</option>
                    <option>High Priority</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="reason" className="mb-2 block text-sm font-medium text-slate-700">
                    Reason for Appointment
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="4"
                    placeholder="Enter the reason for the appointment"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Available Time Slots</h2>
              <p className="mt-1 text-sm text-slate-500">Choose an available consultation time for the selected doctor.</p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {availableSlots.map((slot) => (
                  <label
                    key={slot}
                    className="flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                  >
                    <input type="radio" name="timeSlot" value={slot} className="sr-only" />
                    {slot}
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Notifications & Notes</h2>
              <p className="mt-1 text-sm text-slate-500">Control reminders and add extra booking notes.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    <input type="checkbox" name="smsReminder" className="mt-1" />
                    <span>Send SMS reminder to patient</span>
                  </label>
                  <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    <input type="checkbox" name="emailReminder" className="mt-1" />
                    <span>Send email reminder</span>
                  </label>
                  <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    <input type="checkbox" name="queueNumber" className="mt-1" />
                    <span>Generate queue number automatically</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="notes" className="mb-2 block text-sm font-medium text-slate-700">
                    Internal Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="6"
                    placeholder="Add internal scheduling notes"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Booking Summary</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Booking ID</div>
                  <div className="mt-1">Generated after confirmation</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Estimated Fee</div>
                  <div className="mt-1">Based on visit type and doctor selection</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Queue Status</div>
                  <div className="mt-1">Assigned after successful booking</div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Recent Appointments</h2>
              <div className="mt-5 space-y-4">
                {recentAppointments.map((item) => (
                  <div key={item.patient + item.time} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">{item.patient}</div>
                        <div className="mt-1 text-sm text-slate-600">{item.department}</div>
                        <div className="mt-1 text-sm text-slate-500">{item.doctor}</div>
                      </div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-slate-600">
                      {item.date} • {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Actions</h2>
              <div className="mt-5 space-y-3">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Reset Form
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}
