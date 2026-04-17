import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import { setAccessToken } from '../state/tokenSlice'
import { useNavigate } from "react-router-dom";


const useAxiosPrivate = () => {


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const userTokens = useSelector(state => {
        return state.token
    })

    //return response.data.accessToken;

    const claims = userTokens?.accessToken ? jwtDecode(userTokens?.accessToken) : { exp: 0 }

    const expiration = new Date(claims.exp * 1000);
    const now = new Date();
    now.setSeconds(now.getSeconds() - 10)

    const refresh = useRefreshToken();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            async config => {

                if (now > expiration) {

                    const response = await refresh(userTokens?.refreshToken)

                    if (response.status === 200) {
                        const newAccessToken = response.data.accessToken
                        dispatch(setAccessToken(newAccessToken))
                    } else if (response.status === 401) {
                        navigate('/login', { replace: true })
                    }

                }
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${userTokens?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const response = await refresh(userTokens?.refreshToken);
                    console.error('RESPONSE: ', response)
                    if (response.status === 200) {
                        const newAccessToken = response.data.accessToken
                        dispatch(setAccessToken(newAccessToken))

                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    } else if (response.status === 401) {
                        navigate('/login', { replace: true })
                    }

                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error);
            }
        )
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [userTokens, refresh])

    return axiosPrivate;
}



export default useAxiosPrivate
