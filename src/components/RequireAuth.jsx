
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NavigationLeft from './NavigationLeft';
import Toolbox from './Toolbox';

//import { jwtDecode } from 'jwt-decode';

const RequireAuth = ({ allowedRoles }) => {

  const userInfo = useSelector(state => {
    return state.userroles
  })


  const location = useLocation();

  const roles = userInfo?.roles || []
   const rol = roles.find( role => allowedRoles?.includes(role)) 

  return (

    roles.find(role => allowedRoles?.includes(role))
      ?
      <>
        <div className="min-h-screen bg-slate-100 text-slate-900">
          <div className="flex min-h-screen">

            <NavigationLeft />

            <div className="flex min-w-0 flex-1 flex-col">

              <Toolbox />

              <main className="flex-1 overflow-auto p-6 lg:p-8">

                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </>
      : userInfo?.userId
        ? <Navigate to='/unauthorized' state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />


  )
}

export default RequireAuth
