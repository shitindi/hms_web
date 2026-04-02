export default function MainLayout() {
  const navigationItems = [
    'Dashboard',
    'Patients',
    'Appointments',
    'Doctors',
    'Laboratory',
    'Pharmacy',
    'Billing',
    'Admissions',
    'Reports',
    'Settings',
  ];

  const toolItems = [
    'New Patient',
    'Book Appointment',
    'Add Doctor',
    'Generate Report',
  ];

  const profileMenuItems = ['Profile', 'Account Settings', 'Notifications', 'Help', 'Logout'];

  const statCards = [
    { label: "Today's Patients", value: '128', note: '24 currently waiting' },
    { label: 'Active Doctors', value: '36', note: '5 on leave today' },
    { label: 'Admissions', value: '18', note: '6 new admissions' },
    { label: 'Pending Bills', value: '42', note: 'Needs cashier review' },
  ];

  const recentActivities = [
    'New patient registered at reception desk',
    'Doctor schedule updated for Cardiology department',
    'Lab result uploaded for patient HMS-2041',
    'Invoice generated for orthopedic consultation',
    'Two appointments rescheduled for tomorrow',
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-72 shrink-0 border-r border-slate-200 bg-slate-900 text-slate-100">
          <div className="flex h-20 items-center border-b border-slate-800 px-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-sky-300">HMS Admin</div>
              <h1 className="mt-1 text-2xl font-bold">MediCare Panel</h1>
            </div>
          </div>

          <div className="px-4 py-6">
            <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Main Navigation
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    index === 0
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="mx-4 mt-6 rounded-3xl bg-slate-800 p-4">
            <div className="text-sm font-semibold">System Status</div>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Server</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Backups</span>
                <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs text-amber-300">Due 6 PM</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 w-72 border-t border-slate-800 bg-slate-900 px-6 py-4">
            <div className="text-sm font-semibold">Administrator</div>
            <div className="mt-1 text-xs text-slate-400">admin@hospital.org</div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm text-slate-500">Friday, 27 March 2026</p>
                <h2 className="mt-1 text-2xl font-bold">Administration Workspace</h2>
              </div>

              <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
                <input
                  type="text"
                  placeholder="Search patients, doctors, invoices, reports..."
                  className="w-full lg:w-96 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
                />

                <div className="flex flex-wrap gap-2">
                  {toolItems.map((tool) => (
                    <button
                      key={tool}
                      className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {tool}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <button className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 hover:bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700">
                      AD
                    </div>
                    <div className="hidden text-left sm:block">
                      <div className="text-sm font-semibold text-slate-900">Admin User</div>
                      <div className="text-xs text-slate-500">Super Admin</div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 text-slate-500"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div className="absolute right-0 z-20 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    <div className="border-b border-slate-100 px-3 py-3">
                      <div className="text-sm font-semibold text-slate-900">Admin User</div>
                      <div className="mt-1 text-xs text-slate-500">admin@hospital.org</div>
                    </div>

                    <div className="pt-2">
                      {profileMenuItems.map((item) => (
                        <button
                          key={item}
                          className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm hover:bg-slate-50 ${
                            item === 'Logout' ? 'text-red-600 hover:bg-red-50' : 'text-slate-700'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6 lg:p-8">
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-medium text-sky-700">Dynamic Content Area</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-900">Dashboard Overview</h3>
                  <p className="mt-2 max-w-2xl text-slate-600">
                    This area is reserved for dynamic pages such as dashboard widgets, patient tables, doctor records, billing reports, and forms loaded from the selected navigation item.
                  </p>
                </div>

                <button className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700">
                  Load Module
                </button>
              </div>

              <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {statCards.map((card) => (
                  <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">{card.label}</div>
                    <div className="mt-3 text-3xl font-bold text-slate-900">{card.value}</div>
                    <div className="mt-2 text-sm text-slate-600">{card.note}</div>
                  </div>
                ))}
              </section>

              <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900">Content Placeholder</h4>
                      <p className="mt-1 text-sm text-slate-500">
                        Replace this block with routed pages or selected module content.
                      </p>
                    </div>
                    <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Configure
                    </button>
                  </div>

                  <div className="mt-6 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                    <div className="text-lg font-semibold text-slate-800">Dynamic module renders here</div>
                    <p className="mt-2 text-sm text-slate-500">
                      Example: patient list, registration form, medical record, billing page, or reports dashboard.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h4 className="text-xl font-semibold text-slate-900">Recent Activity</h4>
                  <div className="mt-5 space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
