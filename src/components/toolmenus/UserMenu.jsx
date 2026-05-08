import React, { useContext } from 'react'
import UserContext from '../../context/UserProvider'



const UserMenu = (prop) => {

  const user = useContext(UserContext)

  const handleAddUser = () => {
    if (user.state.action===1)
      return

    user.setState({ ...user.state, action: 1 , component: 'staffs'})
  }
  return (
    ( prop?.data?.action !==4) ? 
    <></> 
    :
    <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-start">
       <input
            type="text"
            placeholder="Search Ssers..."
            className="w-full lg:w-72 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
          />

          <div className="flex flex-wrap gap-2">

            <button onClick={handleAddUser}
              className="rounded-2xl border border-slate-300 bg-sky-600 px-4 py-3 text-sm font-medium text-white hover:bg-sky-700"
            >
              Add User
            </button>

      
           
          </div>
    </div>
  )
}

export default UserMenu
