import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import ViewIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Button, Tooltip } from '@mui/material';

import TableToolbar from './TableToolbar';
import { getJSDateFromDb } from '../Utilities/DateTime';
import OrderForm from './OrderForm';


const Order = () => {
    const axios = useAxiosPrivate();

    let api_message = {
        success: false,
        message: ''
    }

    let edit_form = {
        load_form: false,
        is_new: false,
        is_edit: true,
        entity: {}
    }
    const [apiMessage, setApiMessage] = useState({})
    const [editForm, setEditForm] = useState(edit_form)

    const [entities, setEntities] = useState([])

    const handleEditEntity = id => {

        const entity = entities.filter( dat => dat.id=== id)
        if (entity.length> 0)
            setEditForm({load_form: true, is_new: false, is_edit: true, entity: entity[0] })
        
    }

    const handleSetEditForm = () => {
        setEditForm({...editForm, load_form: false})
    }

    const handleAddNew = () => {
        setEditForm({load_form: true, is_new: true, is_edit: false, entity: {} })
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const entityResult = await axios.get('/sales/orders');
                if (entityResult.status === 200) {
                    console.error('ORDER: ', entityResult.data)
                    api_message.success = true
                    api_message.message = entityResult?.data?.length ?? 0 + ' Items found'
                    setApiMessage(api_message)
                    setEntities(entityResult.data)
                } else {
                    api_message.success = false
                    api_message.message = 'unable to get list of items: error - ' + entityResult.status
                }
            } catch (err) {

                api_message.success = false
                api_message.message = err.response.data.error.message
                setApiMessage(api_message)
            }

        }

        fetchOrders()
    }, []
    );


    const columns = [
        { field: 'customer_id', headerName: 'Customer Name', width: 250 },
        { field: 'total_price', headerName: 'Total amount', width: 130 },
        { field: 'order_date', headerName: 'Order date', width: 200 },
        { field: 'created_by', headerName: 'Created By', width: 200 },
        { field: 'order_status', headerName: 'Order Status', width: 200 },
        { field: 'is_active', headerName: 'Active', width: 150 },
        {
            field: 'action', headerName: '', width: 150,
            renderCell: (params) =>
                <Tooltip
                    title={`View ${params.row.first_name} details`}
                    leaveDelay={100}
                >
                    <Button onClick={()=>handleEditEntity(params.row.id)}><ViewIcon /></Button>
                </Tooltip>
        }


    ];


    const rows = (entities || entities.length > 0) ?
        entities.map(entity => (
            {
                id: entity.id,
                customer_id: entity.Customer.customer_name,
                total_price: entity.total_price,
                order_date: getJSDateFromDb( entity.createdAt),
                order_status: entity.OrderStatus.name,
                is_active: entity.is_active,
                created_by: entity.CreatedBy?.Contact?.first_name + ', ' + entity.CreatedBy?.Contact?.last_name,
            })
        )
        : [];

    const paginationModel = { page: 0, pageSize: 5 };


    return (
        <> 
        {
               editForm.load_form ? 
               <div style={{ height: '100vh'}}><OrderForm isEdit={editForm.is_edit} entity={editForm.entity}  setEditForm = {handleSetEditForm}  /> </div>:
                <Paper className='table-container'>
                    <TableToolbar handleAddNew = {handleAddNew} caption="Available Orders" />
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
}




export default Order
