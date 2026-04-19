import axios from "../api/axios";

const useRefreshToken = () => {

    const refresh = async (refreshToken) => {
        try{
 const response = await axios.post('/auth/refresh-token',{refreshToken}, {
            withCredentials: true
        });
         console.error('BEFOR RETURN')
        return response;
        }catch(err){
            console.error('THROW ', err)
            return err
        }
       
       
        
    }
  return refresh
}

export default useRefreshToken
