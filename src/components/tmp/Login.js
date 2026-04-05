import React, { useEffect, useRef, useState } from "react";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // using react-icons for eye icons
import axios from '../api/axios'

import {jwtDecode} from 'jwt-decode'

import { useDispatch} from 'react-redux'
import {setAccessToken, setRefreshToken} from '../state/tokenSlice'
import {setLicenseInfo} from '../state/messagesSlice'
import {setUserDetail} from '../state/userSlice'
import { setLookups } from "../state/lookupsSlice";

const   LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()

  const userRef = useRef();
  const LOGIN_URL = process.env.REACT_APP_BASE_URL+"/auth/login"
  const LOOKUP_URL = process.env.REACT_APP_BASE_URL+"/lookups/get-all-lookups"

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.pathname || '/';

  useEffect(()=> {
    userRef.current.focus();
  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else {
      setError("");
      //console.log("Logging in with", email, password);
      try{
        const response = await axios.post( LOGIN_URL, JSON.stringify({email, password}),
      {
        headers: {'Content-Type' : 'application/json'},
        
        withCredentials: true
      })

      const lookupsResponse = await axios.get(LOOKUP_URL, null,{headers: {'Content-Type' : 'application/json'}})

      if (response.status===200){
        
       dispatch(setAccessToken(response.data.accessToken))
       dispatch(setRefreshToken(response.data.refreshToken))
       dispatch(setLicenseInfo(response.data.licensingInfo))
    
       const userInfo = jwtDecode(response.data?.accessToken)

       dispatch(setUserDetail({userName: userInfo.userName, userId:userInfo.userId, tenantId:userInfo.tenantId, roles:userInfo.roles}))
       setEmail('')
       setPassword('')

      if (lookupsResponse.status === 200){
        dispatch(setLookups(lookupsResponse.data))
      }        

       navigate(from, {replace: true})

      }else{
        setError(response)
      }

      }catch(err){

        if (!err?.response){
                setError('No Server Response');
            } else if(err.response?.status === 400){
                setError('Missing Username or Password');
            } else if(err.response?.status === 401){
                setError('Unathorized');
            } else {
                setError('Login Failed: ' + err.response.data.error.message);
            }
      }
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="error">{error}</div>}

        <label htmlFor="email">Email</label>
        <input
        ref={userRef}
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <span
            className="toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Sign In</button>

        <div className="links">
          <Link to="/forgot-password">Forgot password?</Link>
          <span>|</span>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default  React.memo( LoginPage )
/* LoginPage.css additions */
/*
.password-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-container input {
  flex: 1;
  padding-right: 2.5rem;
}

.toggle-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6b7280;
  font-size: 1.25rem;
}

.toggle-icon:hover {
  color: #111827;
}
*/