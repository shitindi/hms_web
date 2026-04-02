import { useState, useRef, useEffect } from 'react';

export default function MainLayoutAlt() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigationItems = [
    'Dashboard','Patients','Appointments','Doctors','Laboratory','Pharmacy','Billing','Admissions','Reports','Settings'
  ];

  const toolItems = ['New Patient','Book Appointment','Add Doctor','Generate Report'];

  const profileMenuItems = ['Profile','Account Settings','Notifications','Help','Logout'];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-72 bg-slate-900 text-white p-6">
          <h1 className="text-2xl font-bold">HMS Admin</h1>
          <nav className="mt-6 space-y-2">
            {navigationItems.map((item) => (
              <button key={item} className="w-full text-left px-4 py-2 rounded-xl hover:bg-slate-800">
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col">

          {/* Topbar */}
          <header className="bg-white border-b p-4 flex justify-between items-center">

            <input
              type="text"
              placeholder="Search..."
              className="border px-4 py-2 rounded-xl w-72"
            />

            <div className="flex items-center gap-3">

              {toolItems.map((tool) => (
                <button key={tool} className="border px-3 py-2 rounded-xl text-sm">
                  {tool}
                </button>
              ))}

              {/* Avatar Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 border px-3 py-2 rounded-xl"
                >
                  <div className="w-8 h-8 bg-sky-500 text-white flex items-center justify-center rounded-full">
                    AD
                  </div>
                  <span className="text-sm">Admin</span>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50">
                    {profileMenuItems.map((item) => (
                      <button
                        key={item}
                        onClick={() => setIsOpen(false)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 ${item === 'Logout' ? 'text-red-600' : ''}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold">Dynamic Content Area</h2>
              <p className="text-slate-500 mt-2">Your pages will render here.</p>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
