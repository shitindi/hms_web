export default function DoctorRegistration() {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert('Doctor registered successfully.');
  };

  const departments = [
    'General Medicine',
    'Pediatrics',
    'Cardiology',
    'Orthopedics',
    'Gynecology',
    'Neurology',
    'Dermatology',
  ];

  const specializations = [
    'General Practitioner',
    'Pediatrician',
    'Cardiologist',
    'Orthopedic Surgeon',
    'Gynecologist',
    'Neurologist',
    'Dermatologist',
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Doctors / Registration Portal</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Doctor Registration Portal</h1>
            <p className="mt-2 text-slate-600">
              Register doctors, assign departments, define schedules, and create secure portal access.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Import Doctors
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              View Doctor List
            </button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
                  <p className="mt-1 text-sm text-slate-500">Basic identity details for the doctor.</p>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  Required
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="mb-2 block text-sm font-medium text-slate-700">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dob" className="mb-2 block text-sm font-medium text-slate-700">
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-700">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="4"
                    placeholder="Enter residential address"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Professional Information</h2>
              <p className="mt-1 text-sm text-slate-500">Department, specialization, licensing, and employment details.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="doctorId" className="mb-2 block text-sm font-medium text-slate-700">
                    Doctor ID / Staff Code
                  </label>
                  <input
                    id="doctorId"
                    name="doctorId"
                    type="text"
                    placeholder="Enter staff code"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
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
                    {departments.map((department) => (
                      <option key={department}>{department}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="specialization" className="mb-2 block text-sm font-medium text-slate-700">
                    Specialization
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select specialization</option>
                    {specializations.map((specialization) => (
                      <option key={specialization}>{specialization}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="licenseNumber" className="mb-2 block text-sm font-medium text-slate-700">
                    License Number
                  </label>
                  <input
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    placeholder="Enter license number"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="qualification" className="mb-2 block text-sm font-medium text-slate-700">
                    Highest Qualification
                  </label>
                  <input
                    id="qualification"
                    name="qualification"
                    type="text"
                    placeholder="e.g. MD, MBBS, MSc"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="mb-2 block text-sm font-medium text-slate-700">
                    Years of Experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    placeholder="Enter years of experience"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="employmentType" className="mb-2 block text-sm font-medium text-slate-700">
                    Employment Type
                  </label>
                  <select
                    id="employmentType"
                    name="employmentType"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select employment type</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Visiting Consultant</option>
                    <option>Locum</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="joinDate" className="mb-2 block text-sm font-medium text-slate-700">
                    Joining Date
                  </label>
                  <input
                    id="joinDate"
                    name="joinDate"
                    type="date"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Portal Access & Schedule</h2>
              <p className="mt-1 text-sm text-slate-500">Set login credentials, consultation days, and working hours.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-700">
                    Portal Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Create username"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                    Temporary Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create temporary password"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-medium text-slate-700">Available Days</label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <label
                        key={day}
                        className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                      >
                        <input type="checkbox" name="availableDays" value={day} />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="startTime" className="mb-2 block text-sm font-medium text-slate-700">
                    Start Time
                  </label>
                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="endTime" className="mb-2 block text-sm font-medium text-slate-700">
                    End Time
                  </label>
                  <input
                    id="endTime"
                    name="endTime"
                    type="time"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-medium text-slate-700">Portal Permissions</label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      'Access patient records',
                      'Write consultation notes',
                      'Create prescriptions',
                      'Request lab tests',
                      'View billing summary',
                      'Manage own appointments',
                    ].map((permission) => (
                      <label
                        key={permission}
                        className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700"
                      >
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <span>{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Registration Summary</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Doctor Profile</div>
                  <div className="mt-1">Created after submission</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Portal Account</div>
                  <div className="mt-1">Username and password generated</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Schedule Status</div>
                  <div className="mt-1">Available once working days are selected</div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Checklist</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>License verified</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Department approved</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Portal credentials reviewed</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Work schedule confirmed</span>
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Actions</h2>
              <div className="mt-5 space-y-3">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700"
                >
                  Register Doctor
                </button>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Save Draft
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
