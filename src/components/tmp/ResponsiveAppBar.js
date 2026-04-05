import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ProfileIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';

import {setContactsDetail} from '../state/contactsSlice'
import { setSuppliersDetail } from '../state/suppliersSlice';
import { setCategoriesDetail } from '../state/categoriesSlice';
import { setProductsDetail } from '../state/productsSlice';
import { setCustomersDetail } from '../state/customerSlice';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';


const pages = ['']; //[ 'Products', 'Orders', 'Payments', 'Suppliers', 'Contacts', 'Customers', 'Categories', 'Inventory', 'Users'];
//const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    const axios = useAxiosPrivate()
    const dispatch = useDispatch()
     const [userInfo, contacts, suppliers, categories, products, customers] = useSelector(state => {
    return [state.userroles, state.contacts, state.suppliers, state.categories, state.products, state.customers]
  })
useEffect(() => {
        const fetchContacts = async () => {
            try {
                if (contacts && contacts.length > 0)
                  return
                
                const entityResult = await axios.get('/admin/contacts');
                if (entityResult.status === 200) {
                  dispatch(setContactsDetail(entityResult.data))
                } 
            } catch (err) {

              console.log('LOADING_Contacts: ', err) 
            }

        }

         const fetchSuppliers = async () => {
            try {
                if (suppliers && suppliers.length > 0)
                  return
                
                const entityResult = await axios.get('/sales/suppliers');
                if (entityResult.status === 200) {

                  dispatch(setSuppliersDetail(entityResult.data))
                } 
            } catch (err) {

              console.log('LOADING_Suppliers: ', err) 
            }

        }

        const fetchCategories = async () => {
            try {
                if (categories && categories.length > 0)
                  return
                
                const entityResult = await axios.get('/sales/categories');
                if (entityResult.status === 200) {

                  dispatch(setCategoriesDetail(entityResult.data))
                } 
            } catch (err) {

              console.log('LOADING_Categories: ', err) 
            }

        }

          const fetchProducts = async () => {
            try {
                if (products && products.length > 0)
                  return
                
                const entityResult = await axios.get('/sales/products');
                if (entityResult.status === 200) {

                  dispatch(setProductsDetail(entityResult.data))
                } 
            } catch (err) {

              console.log('LOADING_Products: ', err) 
            }

        }

        
          const fetchCustomers = async () => {
            try {
                if (customers && customers.length > 0)
                  return
                
                const entityResult = await axios.get('/sales/customers');
                if (entityResult.status === 200) {

                  dispatch(setCustomersDetail(entityResult.data))
                } 
            } catch (err) {

              console.log('LOADING_Customers: ', err) 
            }

        }

        fetchContacts()
        fetchSuppliers()
        fetchCategories()
        fetchProducts()
        fetchCustomers()
    }, []
    );


  if (!(userInfo?.userId > 0))
    return <></>




  return (
    <AppBar position="static" sx={{ height: 60, background: '#5499d1ff' }}>
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Link to="/">
            <img src="/byteware_small.png" width={150} height={50} alt="Byteware logo"></img>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' }, justifyContent: 'center' }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={page}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ToastContainer  position='top-center'/>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page} key={page}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
