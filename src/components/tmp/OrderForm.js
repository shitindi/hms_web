import { useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Paper,
    Checkbox,
    MenuItem,
    Tooltip,
} from "@mui/material";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ViewIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

const OrderForm = (props) => {
    const { entity, isEdit, setEditForm } = props

    const [userInfo, customers, products, orderStatuses] = useSelector(state => {

        return [state.userroles, state.customers, state.products, state.lookups.order_statuses]
    })

    const navigate = useNavigate()

    const axios = useAxiosPrivate()
    //const usr = entity

    const [form, setForm] = useState({
        id: entity?.id ?? 0,
        customer_id: entity?.Customer?.id,
        total_price: entity?.total_price ?? 0,
        order_items: entity?.OrderItem ?? [],
        created_by: entity?.CreatedBy?.id ?? userInfo.userId,
        is_active: entity?.is_active,
        order_status: entity?.OrderStatus?.id ?? 1,
        tenant_id: userInfo?.tenantId ?? 0
    });

    const initialSubForm = { product_id: 0, product_name: '', price: 0, order_id: 0, quantity: 0, total_price: 0 }

    const [items, setItems] = useState(form.order_items)

   console.log('Products: ', items)

    const [itemForm, setItemForm] = useState(initialSubForm)



    const [errors, setErrors] = useState({});

    let api_message = {
        success: false,
        message: ''
    }
    const [apiMessage, setApiMessage] = useState({})


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleItemsChange = (e) => {
        setItemForm({ ...itemForm, [e.target.name]: e.target.value })
    }

    const handleCheck = (e) => {
        setForm({ ...form, [e.target.name]: e.target.checked });

    }

    const validate = () => {
        const errs = {};
        if (!form.total_price > 0) errs.customer_name = "Total price is required";
        if (!form.order_items.length > 0) errs.tin_number = "Order items is required";
        if (!form.order_status) errs.tin_number = "Order status is required";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        api_message.success = true
        api_message.message = `Order created successfuly `

        const errs = validate();
        setErrors(errs);

         form.order_items = items

        if (form.order_items?.length === 0){
            toast.error('Order item is missing!')
            return
        }
       

        if (Object.keys(errs).length === 0) {
            // Submit form data
            let response;
            try {


                response = await axios.post('/sales/order', form)

                if (response.status === 200) {
                    //Registration was successfully!
                    api_message.success = true
                    api_message.message = `Order created successfuly `

                    setApiMessage(api_message)
                    toast.success(api_message.message)
                    setEditForm()
                    navigate('/orders', { replace: true })

                } else {
                    api_message.success = false
                    api_message.message = response.data
                    setApiMessage(api_message)
                    toast.error(api_message.message)
                }

            } catch (err) {
                api_message.success = false
                api_message.message = err.response.data.error.message
                toast.error(api_message.message)
                //setApiMessage(api_message)
            }

        }
    };

    const handleCancel = (e) => {
        // navigate('http://wwww.byteware.co.tz', {replace: true})
        setEditForm()
        navigate('/orders', { replace: true })

    }

    const handleDelete = (productId) => {
        //form.total_price
        try {
            let _items = []
            _items = items.filter(item => item.product_id != productId)
            let newTotal = 0

            if (!_items || _items.length == 0)
                newTotal = 0
            else
                newTotal = _items.reduce((prevVal, newVal) => Number.parseInt(prevVal.total_price) + Number.parseInt(newVal.total_price))


            newTotal = newTotal?.total_price ?? newTotal


            setForm({ ...form, total_price: newTotal })
            setItems(_items)
        } catch (err) {
            console.error('DELETING: ', err)
        }

        // console.error('DELETED: ', productId, _items)
    }



    const handleAdditem = (e) => {
        const product = products.find(value => {
            return value.id === itemForm.product_id
        })

        itemForm.total_price = itemForm.quantity * (product?.price ?? 0)
        itemForm.Product = { id: product.id, name: product.name, price: product?.price }
        let productFound = false;

        let totalPrice = 0

        items.forEach(item => {

            totalPrice = Number.parseInt(totalPrice) + Number.parseInt(item.total_price)
            if (item.product_id === itemForm.product_id) {
                productFound = true

                item.quantity = Number.parseInt(item.quantity) + Number.parseInt(itemForm.quantity)
                item.total_price = item.quantity * (product?.price ?? 0)
            }
        })

        totalPrice = Number.parseInt(totalPrice) + Number.parseInt(itemForm.total_price)

        if (!productFound)
            setItems([...items, itemForm])
        else
            setItems(items)

        setItemForm(initialSubForm)

        setForm({ ...form, total_price: totalPrice })
    }

    const handleAddSingleItem = (productId) => {

         const productItem = items.find(value => {
            return value.product_id === productId
        })

        if (!productItem) 
            return

        // if (productItem.quantity === 1)
        //     handleDelete(productId)

        productItem.quantity = Number.parseInt(productItem.quantity) + 1

        productItem.total_price = productItem.quantity * (productItem?.Product?.price ?? 0)

        let productFound = false;

        let totalPrice = 0

        items.forEach(item => {

            totalPrice = Number.parseInt(totalPrice) + Number.parseInt(item.total_price)
            if (item.product_id === productId) {
                productFound = true

                item.quantity = Number.parseInt(productItem.quantity) // Number.parseInt(item.quantity) + Number.parseInt(productItem.quantity)
                item.total_price = item.quantity * (productItem?.Product?.price ?? 0)
               // totalPrice = Number.parseInt(totalPrice) + Number.parseInt(productItem?.Product?.price ?? 0)
            }
        })

        

        
        setItems(items)

        setItemForm(initialSubForm)

        setForm({ ...form, total_price: totalPrice })
         //console.warn('handleAddSingleItem: ', productId)
    }

     const handleRemoveSingleItem = (productId) => {
       const productItem = items.find(value => {
            return value.product_id === productId
        })

        if (!productItem) 
            return

        if (productItem.quantity === 1){
            handleDelete(productId)
            return
        }
            

        productItem.quantity = Number.parseInt(productItem.quantity) - 1

        productItem.total_price = productItem.quantity * (productItem?.Product?.price ?? 0)

        let productFound = false;

        let totalPrice = 0

        items.forEach(item => {

            totalPrice = Number.parseInt(totalPrice) + Number.parseInt(item.total_price)
            if (item.product_id === productId) {
                productFound = true

                item.quantity = Number.parseInt(productItem.quantity) // Number.parseInt(item.quantity) + Number.parseInt(productItem.quantity)
                item.total_price = item.quantity * (productItem?.Product?.price ?? 0)
               // totalPrice = Number.parseInt(totalPrice) + Number.parseInt(productItem?.Product?.price ?? 0)
            }
        })

        

        
        setItems(items)

        setItemForm(initialSubForm)

        setForm({ ...form, total_price: totalPrice })
    }

    return (
        <div>
            <Container sx={{ py: 4 }} >
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" component="h1" gutterBottom>

                        {
                            isEdit ? 'Update Order' : 'Create new Order'
                        }
                    </Typography>
                    <div className={apiMessage.success ? "api-message" : "api-message-error"}>
                        {apiMessage.message}
                    </div>


                    <Typography variant="h7" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
                        Order Details
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>

                        <Grid container spacing={4} sx={{ mb: 8, mt: 2 }}>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                <TextField size="small" select name="customer_id" label="Customer" fullWidth value={form.customer_id}
                                    onChange={handleChange} error={!!errors.customer_id} helperText={errors.customer_id}>
                                    <MenuItem value="">Select Customer</MenuItem>
                                    {
                                        (customers && customers.length > 0) &&
                                        customers.map(item => <MenuItem value={item.id} key={item.id}>{item.customer_name}</MenuItem>)
                                    }

                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                <TextField size="small" type="number" name="total_price" label="Total price" fullWidth value={form.total_price}
                                    error={!!errors.total_price} helperText={errors.total_price} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}  >
                                <Checkbox name="is_active" checked={form.is_active} onChange={handleCheck} /> Active
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                                <TextField size="small" select name="order_status" label="Order status" fullWidth value={form.order_status}
                                    onChange={handleChange} error={!!errors.order_status} helperText={errors.order_status}>
                                    <MenuItem value="">Order status</MenuItem>
                                    {

                                        (orderStatuses && orderStatuses.length > 0) &&
                                        orderStatuses.map(item => <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>)
                                    }

                                </TextField>
                            </Grid>
                        </Grid>

                        <Typography variant="h7" fontWeight="bold" sx={{ mb: 10 }} >
                            Order Items
                        </Typography>
                        <Grid container columnSpacing={2} sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }} >
                                <TextField size="small" select name="product_id" label="Product" fullWidth value={itemForm.product_id}
                                    onChange={handleItemsChange} error={!!errors.product_id} helperText={errors.product_id}>
                                    <MenuItem value="">Select Product</MenuItem>
                                    {

                                        (products && products.length > 0) &&
                                        products.map(item => <MenuItem value={item.id} key={item.id}>{`${item.name} (${item.price})`}</MenuItem>)
                                    }

                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 2, lg: 2 }} >
                                <TextField size="small" type="number" name="quantity" label="Quantity" fullWidth value={itemForm.quantity}
                                    error={!!errors.quantity} helperText={errors.quantity} onChange={handleItemsChange} />
                            </Grid>
                            <Grid size={{ xs: 9, sm: 9, md: 2, lg: 2 }} ></Grid>
                            <Grid >
                                <Button variant="outlined" color="primary" onClick={handleAdditem}>
                                    Add item
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container  >
                            {showOrderItem(items, handleDelete, handleAddSingleItem, handleRemoveSingleItem)}
                        </Grid>

                        <Grid container sx={{ mt: 6 }}>
                            <Grid >
                                <Button type="submit" variant="outlined" color="primary" sx={{ mt: 4, minWidth: 120 }} >
                                    Save
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} ></Grid>
                            <Grid >
                                <Button variant="outlined" color="error" sx={{ mt: 4 }} onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}

const showOrderItem = (entity, handleDelete,  handleAddSingleItem, handleRemoveSingleItem) => {
    const paginationModel = { page: 0, pageSize: 5 };

    const columns = [
        { field: 'product', headerName: 'Product Name', width: 250 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'total_price', headerName: 'Total amount', width: 130 },
        {
            field: 'action', headerName: '', width: 300,
            renderCell: (params) => <>


                <Tooltip
                    title={`Add 1 item`}
                    leaveDelay={100}
                >
                    <Button onClick={() => handleAddSingleItem(params.row.id)}><AddIcon /></Button>
                </Tooltip>

                <Tooltip
                    title={`Remove 1 item`}
                    leaveDelay={100}
                >
                    <Button onClick={() => handleRemoveSingleItem(params.row.id)}><RemoveIcon /></Button>
                </Tooltip>

                <Tooltip
                    title={`Delete ${params.row.product}`}
                    leaveDelay={100}
                >
                    <Button  onClick={() => handleDelete(params.row.id)}><DeleteIcon /></Button>
                </Tooltip>

            </>
        }

    ];


    const rows = (entity || entity.length > 0) ?
        entity.map(entity => (
            {
                id: entity.product_id,
                product: entity?.Product.name,
                price: entity?.Product?.price,
                quantity: entity.quantity,
                total_price: entity.total_price,
            }
        )
        )
        : [];


    return (
        <Paper className='table-container' sx={{ mt: 1 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 15]}
                checkboxSelection={false}
                sx={{ border: 0 }}
            />
        </Paper>
    )
}

export default OrderForm
