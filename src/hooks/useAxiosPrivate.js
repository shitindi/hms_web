import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import { setAccessToken } from '../state/tokenSlice'


const useAxiosPrivate = () => {

    const dispatch = useDispatch()

    const userTokens = useSelector(state => {
        return state.token
    })


    const claims = userTokens?.accessToken ? jwtDecode(userTokens?.accessToken ) : {exp : 0}

    const expiration = new Date(claims.exp * 1000);
    const now = new Date();
    now.setSeconds(now.getSeconds() - 10)

    const refresh = useRefreshToken();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            async config => {

                if (now > expiration) {

                    const newAccessToken = await refresh(userTokens?.refreshToken)
                    dispatch(setAccessToken(newAccessToken))
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
                    const newAccessToken = await refresh(userTokens?.refreshToken);
                    dispatch(setAccessToken(newAccessToken))

                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
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
