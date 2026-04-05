import axios from "../api/axios";

const useRefreshToken = () => {

    const refresh = async (refreshToken) => {

        const response = await axios.post('/auth/refresh-token',{refreshToken}, {
            withCredentials: true
        });

        return response.data.accessToken;
    }
  return refresh
}

export default useRefreshToken
