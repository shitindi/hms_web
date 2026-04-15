import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate } from "react-router-dom";

import { resetMessages } from '../state/messagesSlice'
import { resetTokens } from '../state/tokenSlice'
import { resetUser } from '../state/userSlice'
import {resetLookups} from '../state/lookupsSlice'
import {resetPatients} from '../state/patientsSlice'
import {resetDoctors} from '../state/doctorsSlice'
import {resetAppointments} from '../state/appointmentSlice'
 
const Logout = () => {

    const dispatch = useDispatch()
    const axios = useAxiosPrivate()
    const navigate = useNavigate()

    useEffect(  ()  => {

        const logout = async () => {
            try {
               
                const response = await axios.post('/auth/logout')

                if (response.status === 204) {
                     dispatch(resetUser())
                     dispatch(resetTokens())
                     dispatch(resetMessages())
                     dispatch(resetLookups())
                     dispatch(resetPatients())
                     dispatch(resetDoctors())
                     dispatch(resetAppointments())
                     
                     navigate('/login', { replace: true })
                } else {
                    navigate('/', { replace: true })
                }
            } catch (err) {
                console.log('Error: ', err)
            }
            
        }

        logout()

    }, [])
    return (
        <></>
    )
}

export default React.memo( Logout)
