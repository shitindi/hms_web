import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import ViewIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Button, Tooltip } from '@mui/material';
import UserForm from './UserForm';
import TableToolbar from './TableToolbar';


const User = () => {
    const axios = useAxiosPrivate();

    let api_message = {
        success: false,
        message: ''
    }

    let edit_form = {
        load_form: false,
        is_new: false,
        is_edit: true,
        user: {}
    }
    const [apiMessage, setApiMessage] = useState({})
    const [editForm, setEditForm] = useState(edit_form)

    const [users, setUsers] = useState([])

    const handleEditUser = id => {

        const user = users.filter( usr => usr.id=== id)
        if (user.length> 0)
            setEditForm({load_form: true, is_new: false, is_edit: true, user: user[0] })
        
    }

    const handleSetEditForm = () => {
        setEditForm({...editForm, load_form: false})
    }

    const handleAddNew = () => {
        setEditForm({load_form: true, is_new: true, is_edit: false, user: {} })
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userResult = await axios.get('/admin/users');

                if (userResult.status === 200) {
                    api_message.success = true
                    api_message.message = userResult?.data?.length ?? 0 + ' Users found'
                    setApiMessage(api_message)
                    setUsers(userResult.data)
                } else {
                    api_message.success = false
                    api_message.message = 'unable to get list of users: error - ' + userResult.status
                }
            } catch (err) {
             
                api_message.success = false
                api_message.message = err.response.data.error.message
                setApiMessage(api_message)
            }

        }

        fetchUsers()
    }, []
    );


    const columns = [
        { field: 'user_name', headerName: 'User Name', width: 150 },
        { field: 'first_name', headerName: 'First Name', width: 130 },
        { field: 'last_name', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'mobile_no', headerName: 'Mobile No', width: 130 },
        { field: 'created_by', headerName: 'Created By', width: 130 },
        { field: 'user_status', headerName: 'Status', width: 130 },
        { field: 'default_branch', headerName: 'Default Branch', width: 130 },
        {
            field: 'action', headerName: '', width: 150,
            renderCell: (params) =>
                <Tooltip
                    title={`View ${params.row.user_name} details`}
                    leaveDelay={100}
                >
                    <Button onClick={()=>handleEditUser(params.row.id)}><ViewIcon /></Button>
                </Tooltip>
        }


    ];


    const rows = (users || users.length > 0) ?
        users.map(user => (
            {
                id: user.id,
                user_name: user.user_name,
                first_name: user.Contact.first_name,
                last_name: user.Contact.last_name,
                email: user.Contact.email,
                mobile_no: user.Contact.mobile_no,
                created_by: user.Contact.CreatedBy.user_name,
                user_status: user.UserSatus.name,
                default_branch: user.default_branch ?? 'Not assigned',
            })
        )
        : [];

    const paginationModel = { page: 0, pageSize: 5 };


    return (
        <>
        {
               editForm.load_form ? 
               <div style={{ height: '100vh'}}><UserForm isEdit={editForm.is_edit} user={editForm.user}  setEditForm = {handleSetEditForm}  /> </div>:
                <Paper className='table-container'>
                    <TableToolbar handleAddNew = {handleAddNew} caption="Available Users" />
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
        }
        </>
    );
}  //19 11 




export default User
