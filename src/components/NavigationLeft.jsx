import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserProvider';

const NavigationLeft = () => {

  const user = useContext(UserContext)

    const navigationItems = [
    {name:'Home', url: "/"},
    {name: 'Patients', url: '/patients'},
    {name: 'Appointments', url: '/appointment'},
    {name: 'Doctors', url: '/doctors'},
    {name: 'Laboratory', url: '/laboratory'},
    {name: 'Pharmacy', url: 'pharmacy'},
    {name: 'Billing', url: 'pharmacyh'},
    {name: 'Admissions', url: 'admissions'},
    {name: 'Reports', url: 'reports'},
  ];

  const location = useLocation();
  
  let menuIndex =0
  navigationItems.forEach( (item, index) => {
    if (item.url === location.pathname){
      menuIndex = index
      return
    }
  })

  const [menuIdex, setMenuIndex] = useState(menuIndex)

  const navigate = useNavigate()

  const handleLinkClick = (url, index) =>{
    user.setState({
        component: url.replace('/',''),
        action: 4,    
        entity_id: 0,
        entities: []
    })
    navigate(url)
    setMenuIndex(index)

  }

  return (

   
       <aside className="w-62 shrink-0 border-r border-slate-200 bg-slate-900 text-slate-100" >


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
                <button onClick={()=> handleLinkClick(item.url, index)}
                  key={item.name}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${index === menuIdex
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                  {item.name} 
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

     
        </aside>
  )
}

export default NavigationLeft
