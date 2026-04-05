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
} from "@mui/material";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
  import {  toast } from 'react-toastify';

const UserForm = (props) => {
    const {user, isEdit, setEditForm} = props
  
    const userInfo = useSelector(state => {
        return state.userroles
    })

    const navigate = useNavigate()

    const axios = useAxiosPrivate()
    const usr = user

    const [form, setForm] = useState({
        id: usr?.id ?? 0,
        user_id: usr?.id ?? 0,
        first_name: usr?.Contact?.first_name ?? "",
        middle_name: usr?.Contact?.middle_name,
        last_name: usr?.Contact?.last_name ?? "",
        email: usr?.Contact?.email,
        mobile_no: usr?.Contact?.mobile_no ?? "",
        phone: usr?.Contact?.phone,
        position: usr?.Contact?.position,
        address: usr?.Contact?.address,
        password: "",
        confirm_password: "",
        created_by: usr?.Contact?.created_by ?? userInfo.userId,
        user_name: usr?.user_name ?? "",
        must_change_password: true,
        is_active: usr?.is_active ?? false,
        user_status: 1,
        email_verified: 1,
        tenant_id: userInfo?.tenantId ?? 0
    });




    const [errors, setErrors] = useState({});

    let api_message = {
        success: false,
        message: ''
    }
    const [apiMessage, setApiMessage] = useState({})


    const handleChange = (e) => {
        setForm({ ...form,  [e.target.name]: e.target.value });
    };

    const handleCheck = (e) => {
        setForm({ ...form,  [e.target.name]: e.target.checked });

    }

    const validate = () => {
        const errs = {};
        if (!form.first_name.trim()) errs.first_name = "First name is required";
        if (!form.last_name.trim()) errs.last_name = "Last name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        if (!form.mobile_no.trim()) errs.mobile_no = "Mobile number is required";
        if (!form.password) errs.password = "Password is required";
        else if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
            errs.password = "Password must be at least 8 chars, include a number and uppercase letter";
        }
        if (form.confirm_password !== form.password) {
            errs.confirm_password = "Passwords must match";
        }
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        api_message.success = true
        api_message.message = `User created successfuly `

        const errs = validate();
        setErrors(errs);


        form.user_name = form.email
        if (Object.keys(errs).length === 0) {
            // Submit form data
            let response;
            try {


                response = await axios.post('/admin/user', form)

                if (response.status === 200) {
                    //Registration was successfully!
                    api_message.success = true
                    api_message.message = `User created successfuly `
                     

                        setApiMessage(api_message)
                      toast.success(api_message.message)
                     setEditForm()
                     navigate('/users', { replace: true })

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
        navigate('/users', { replace: true })
      
    }

    return (
        <div>
        <Container sx={{ py: 4 }} >
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    {console.log('EDIT: ', user)}
                {
                    isEdit ? 'Update User' : 'Create new User'
                }
                </Typography>
                <div className={apiMessage.success ? "api-message" : "api-message-error"}>
                    {apiMessage.message}
                </div>


                {/* Contact Person Details */}
                <Typography variant="h7" fontWeight="bold" gutterBottom >
                    User detais
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>

                    <Grid container spacing={4} >

                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}  >
                            <TextField size="small" required name="first_name" label="First Name" fullWidth value={form.first_name} onChange={handleChange} error={!!errors.first_name} helperText={errors.first_name} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                            <TextField size="small" name="middle_name" label="Middle Name" fullWidth value={form.middle_name} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                            <TextField size="small" required name="last_name" label="Last Name" fullWidth value={form.last_name} onChange={handleChange} error={!!errors.last_name} helperText={errors.last_name} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                            <TextField size="small" required type="email" name="email" label="Email" fullWidth value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                            <TextField size="small" required name="mobile_no" label="Mobile No" fullWidth value={form.mobile_no} onChange={handleChange} error={!!errors.mobile_no} helperText={errors.mobile_no} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                            <TextField size="small" name="phone" label="Phone" fullWidth value={form.phone} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                            <TextField size="small" name="position" label="Position" fullWidth value={form.position} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                            <TextField size="small" name="address" label="Address" fullWidth value={form.address} onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                            <TextField size="small" required type="password" name="password" label="Password" fullWidth value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                            <TextField size="small" required type="password" name="confirm_password" label="Confirm Password" fullWidth value={form.confirm_password} onChange={handleChange} error={!!errors.confirm_password} helperText={errors.confirm_password} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}  >
                            <Checkbox  name="is_active" checked={form.is_active} onChange={handleCheck}/> Active
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid >
                            <Button type="submit" variant="outlined" color="primary" sx={{ mt: 4, minWidth: 120 }} >
                                Save
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 8, md: 9, lg: 9 }} ></Grid>
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

export default UserForm
