import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import ProfileIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { setDoctorsDetail } from '../state/doctorsSlice'
import { setPatientsDetail } from '../state/patientsSlice'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import UserContext from '../context/UserProvider';
import PatientMenu from './toolmenus/PatientMenu';
import { Link, useLocation } from 'react-router-dom';
import DoctorMenu from './toolmenus/DoctorMenu';
import AppointmentMenu from './toolmenus/AppointmentMenu';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

const Toolbox = () => {



  const axios = useAxiosPrivate()
  const dispatch = useDispatch()
  const userContext = useContext(UserContext)

  const location = useLocation()

  const [ userInfo, doctors, patients] = useSelector(state => {
    return [state.userroles,, state.doctors, state.patients]
  })

    const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (doctors && doctors.lenght > 0)
          return

        const entityResult = await axios.get('/doctors/doctors')
        if (entityResult.status === 200)
          dispatch(setDoctorsDetail(entityResult.data))
      } catch (err) {
        console.log('LOADING_Doctors: ', err)
      }
    }

    const fetchPatients = async () => {
      try {
        if (patients && patients.lenght > 0)
          return

        const entityResult = await axios.get('/patients/patients')
        if (entityResult.status === 200)
          dispatch(setPatientsDetail(entityResult.data))
      } catch (err) {
        console.log('LOADING_Patients: ', err)
      }
    }

    fetchDoctors()
    fetchPatients()
  }, [])


  const selectToolMenu = ()=>{

    const url = location.pathname.replace('/','')
     switch(url)
     {
        case 'home':
          return
        case 'patients':
          return <PatientMenu data={userContext.state} />
         case 'doctors':
          return <DoctorMenu data={userContext.state} />
          case 'appointments':
          return <AppointmentMenu data={userContext.state} />
        default:
         // return <PatientMenu />    
     }
  }

    const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


   const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //const profileMenuItems = ['Profile', 'Account Settings', 'Notifications', 'Help', 'Logout'];


  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">


        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
         <ToastContainer position='top-center' />
         {
         /* 
            lOAD ELEMENT HERE
          */
          selectToolMenu()
         }

          <div className="relative">
        

        
               <Box sx={{ flexGrow: 0 ,}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo.userName.toUpperCase()} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem onClick={handleCloseUserMenu} component={Link} to='/profile'>
              <ProfileIcon />
                <Typography sx={{ textAlign: 'center' , marginLeft: 1}}>My Profile</Typography>
              </MenuItem>
              <hr style={{width: '180px'}} />
              <MenuItem onClick={handleCloseUserMenu} component={Link} to='/logout'>
              <LogoutIcon />
                <Typography sx={{ textAlign: 'center', marginLeft: 1 }}>Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>

    
          </div>
        </div>
      </div>
    </header>

  )
}

export default Toolbox
