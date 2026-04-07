import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { setAccessToken, setRefreshToken } from '../state/tokenSlice'
import { setLicenseInfo } from '../state/messagesSlice'
import { setUserDetail } from '../state/userSlice'
import { setLookups } from '../state/lookupsSlice';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {

  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const userRef = useRef()
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL

  const LOGIN_URL = BASE_URL + "/auth/login"
  const LOOKUP_URL = BASE_URL + "/lookups/get-all-lookups"

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.pathname || '/'

  useEffect(() => {
    userRef.current.focus()
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = (formData.get('identity') || '').toString().trim();
    const password = (formData.get('password') || '').toString().trim();
    const remember = formData.get('remember') === 'on';

    if (!email || !password) {
      setError("Please enter both email and password")
      return;
    } else {
      setError("")
    }

    try {

      const response = await axios.post(LOGIN_URL, JSON.stringify({email, password }),
        {
          headers: { 'Content-Type': 'application/json' },

          withCredentials: true
        })

        let requestErr = ''
        if (response.status === 200){
          dispatch(setAccessToken(response.data.accessToken))
          dispatch(setRefreshToken(response.data.refreshToken))
          dispatch(setLicenseInfo(response.data.licensingInfo))

          const userInfo = jwtDecode(response.data?.accessToken)
          dispatch(setUserDetail({ userName: userInfo.userName, userId: userInfo.userId, tenantId: userInfo.tenantId, roles: userInfo.roles }))

          const lookupsResponse = await axios.get(LOOKUP_URL, null, { headers: { 'Content-Type': 'application/json' } })
          if (lookupsResponse.status === 200) {
            dispatch(setLookups(lookupsResponse.data))
            navigate (from, {replace: true})
          }else{
            setError(lookupsResponse)
          }

        }else{
          setError(response)
        }

    } catch (err) {
      console.error(err)
         if (!err?.response) {
          setError('No Server Response');
        } else if (err.response?.status === 400) {
          setError('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setError('Unathorized');
        } else {
          setError('Login Failed: ' + err.response.data.error.message);
        }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
        <section className="hidden lg:flex flex-col justify-between bg-linear-to-br from-sky-700 to-cyan-500 text-white p-10">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] opacity-80">
              Health Management System
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Smart care starts with a secure login
            </h1>
            <p className="mt-4 text-base opacity-90 max-w-md">
              Access patient records, appointments, pharmacy, billing, and
              hospital operations from one secure platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-semibold">24/7</div>
              <div className="text-sm opacity-90 mt-1">System availability</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-semibold">Role-Based</div>
              <div className="text-sm opacity-90 mt-1">Secure access control</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-semibold">Fast</div>
              <div className="text-sm opacity-90 mt-1">Quick staff sign-in</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-semibold">Unified</div>
              <div className="text-sm opacity-90 mt-1">One hospital platform</div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
                HMS Portal
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                Welcome back
              </h2>
              {
                !error?
              <p className="mt-2 text-slate-600">
                Sign in to continue.
              </p>
              :
              <p className="mt-2 text-danger text-red-700">
                {error} 
              </p>
}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="identity"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Login ID
                </label>
                <input
                  ref={userRef}
                  id="identity"
                  name="identity"
                  type="text"
                  placeholder="Enter your email or staff ID"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-sky-700 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="rounded border-slate-300"
                  />
                  Remember me
                </label>
                <span className="text-slate-500">Secure staff access</span>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-600 py-3.5 text-white font-semibold shadow-lg hover:bg-sky-700 transition"
              >
                Sign In
              </button>
            </form>



            <p className="mt-6 text-center text-xs text-slate-500">
              Protected hospital access. Authorized users only.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
