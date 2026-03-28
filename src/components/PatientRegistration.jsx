export default function PatientRegistration() {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert('Patient registration submitted successfully.');
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Patients / Registration</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Patient Registration</h1>
            <p className="mt-2 text-slate-600">
              Capture patient details, emergency contacts, insurance information, and initial visit data.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Save Draft
            </button>
            <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
              View Patient List
            </button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
                  <p className="mt-1 text-sm text-slate-500">Basic identity and demographic details.</p>
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
                    placeholder="Enter full patient address"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Medical & Visit Information</h2>
              <p className="mt-1 text-sm text-slate-500">Details useful for treatment and hospital workflow.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="bloodGroup" className="mb-2 block text-sm font-medium text-slate-700">
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select blood group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="maritalStatus" className="mb-2 block text-sm font-medium text-slate-700">
                    Marital Status
                  </label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select marital status</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
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
                    Assigned Doctor
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

                <div className="md:col-span-2">
                  <label htmlFor="complaint" className="mb-2 block text-sm font-medium text-slate-700">
                    Chief Complaint / Reason for Visit
                  </label>
                  <textarea
                    id="complaint"
                    name="complaint"
                    rows="4"
                    placeholder="Describe the patient’s main complaint or reason for visit"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Emergency Contact & Insurance</h2>
              <p className="mt-1 text-sm text-slate-500">Backup contact person and payment coverage details.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="nextOfKin" className="mb-2 block text-sm font-medium text-slate-700">
                    Next of Kin / Guardian
                  </label>
                  <input
                    id="nextOfKin"
                    name="nextOfKin"
                    type="text"
                    placeholder="Enter contact person name"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="relationship" className="mb-2 block text-sm font-medium text-slate-700">
                    Relationship
                  </label>
                  <input
                    id="relationship"
                    name="relationship"
                    type="text"
                    placeholder="e.g. Mother, Brother, Spouse"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="emergencyPhone" className="mb-2 block text-sm font-medium text-slate-700">
                    Emergency Phone
                  </label>
                  <input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    placeholder="Enter emergency phone number"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="insuranceProvider" className="mb-2 block text-sm font-medium text-slate-700">
                    Insurance Provider
                  </label>
                  <input
                    id="insuranceProvider"
                    name="insuranceProvider"
                    type="text"
                    placeholder="Enter insurance provider"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="insuranceNumber" className="mb-2 block text-sm font-medium text-slate-700">
                    Insurance Number
                  </label>
                  <input
                    id="insuranceNumber"
                    name="insuranceNumber"
                    type="text"
                    placeholder="Enter policy/member number"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="paymentType" className="mb-2 block text-sm font-medium text-slate-700">
                    Payment Type
                  </label>
                  <select
                    id="paymentType"
                    name="paymentType"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select payment type</option>
                    <option>Cash</option>
                    <option>Insurance</option>
                    <option>Mobile Money</option>
                    <option>Corporate</option>
                  </select>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Registration Summary</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Patient ID</div>
                  <div className="mt-1">Auto-generated after saving</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Visit Type</div>
                  <div className="mt-1">Outpatient Registration</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-medium text-slate-800">Registration Fee</div>
                  <div className="mt-1">Calculated after department selection</div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Checklist</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Identity details verified</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Emergency contact recorded</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Insurance details reviewed</span>
                </label>
                <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <input type="checkbox" className="mt-1" />
                  <span>Consent for treatment confirmed</span>
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
                  Register Patient
                </button>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Clear Form
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}
