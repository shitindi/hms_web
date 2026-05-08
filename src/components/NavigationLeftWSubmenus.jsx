import { useState } from 'react';

export default function SidebarNavigationWithSubmenus() {
  const [openMenus, setOpenMenus] = useState({
    Patients: true,
  });

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Patients',
      children: [
        { label: 'Patient List', path: '/patients' },
        { label: 'Register Patient', path: '/patients/register' },
        { label: 'Medical History', path: '/patients/history' },
      ],
    },
    {
      label: 'Appointments',
      children: [
        { label: 'Book Appointment', path: '/appointments/book' },
        { label: 'Appointment List', path: '/appointments' },
        { label: 'Queue Management', path: '/appointments/queue' },
      ],
    },
    {
      label: 'Clinical',
      children: [
        { label: 'Doctor Dashboard', path: '/doctor/dashboard' },
        { label: 'Consultation', path: '/doctor/consultation' },
        { label: 'Vitals', path: '/clinical/vitals' },
        { label: 'Nursing Station', path: '/nursing/station' },
      ],
    },
    {
      label: 'Laboratory',
      children: [
        { label: 'Lab Requests', path: '/lab/requests' },
        { label: 'Lab Results', path: '/lab/results' },
        { label: 'Test Catalog', path: '/lab/catalog' },
      ],
    },
    {
      label: 'Pharmacy',
      children: [
        { label: 'Prescriptions', path: '/pharmacy/prescriptions' },
        { label: 'Dispensing', path: '/pharmacy/dispensing' },
        { label: 'Medicine Stock', path: '/pharmacy/stock' },
      ],
    },
    {
      label: 'Billing',
      children: [
        { label: 'Invoices', path: '/billing/invoices' },
        { label: 'Payments', path: '/billing/payments' },
        { label: 'Insurance Claims', path: '/billing/insurance' },
      ],
    },
    {
      label: 'Admissions',
      children: [
        { label: 'Ward Management', path: '/admissions/wards' },
        { label: 'Admissions', path: '/admissions' },
        { label: 'Discharge', path: '/admissions/discharge' },
      ],
    },
    {
      label: 'Reports',
      children: [
        { label: 'Patient Reports', path: '/reports/patients' },
        { label: 'Revenue Reports', path: '/reports/revenue' },
        { label: 'Clinical Reports', path: '/reports/clinical' },
      ],
    },
    {
      label: 'Settings',
      children: [
        { label: 'Users & Roles', path: '/settings/users' },
        { label: 'Departments', path: '/settings/departments' },
        { label: 'System Settings', path: '/settings/system' },
      ],
    },
  ];

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleNavigate = (path) => {
    console.log('Navigate to:', path);
    // With React Router, replace this with:
    // navigate(path);
  };

  return (
    <aside className="min-h-screen w-72 bg-slate-900 text-white">
      <div className="border-b border-slate-800 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-300">HMS</p>
        <h1 className="mt-1 text-2xl font-bold">Hospital System</h1>
      </div>

      <nav className="p-4">
        <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Navigation
        </div>

        <div className="space-y-2">
          {navigationItems.map((item) => {
            const hasChildren = Array.isArray(item.children);
            const isOpen = openMenus[item.label];

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() =>
                    hasChildren ? toggleMenu(item.label) : handleNavigate(item.path)
                  }
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <span>{item.label}</span>

                  {hasChildren && (
                    <span
                      className={`transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  )}
                </button>

                {hasChildren && isOpen && (
                  <div className="mt-2 space-y-1 border-l border-slate-700 pl-4 ml-4">
                    {item.children.map((child) => (
                      <button
                        key={child.path}
                        type="button"
                        onClick={() => handleNavigate(child.path)}
                        className="block w-full rounded-xl px-4 py-2 text-left text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
