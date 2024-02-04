import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    // Defining an asynchronous function to refresh the access token.
    const refresh = async () => {
        // Making a GET request using SIMPLE axios to get a new access token
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        // Updating the authentication state with the new access token 
        setAuth(prev => {
            console.log('prev data', JSON.stringify(prev));
            console.log('response.data.accessToken', response.data.accessToken);
            // update auth state by returning updated authentication state with the new access token
            return { ...prev, accessToken: response.data.accessToken };
        });
        // return the new access token
        return response.data.accessToken;
    }
    // return the refresh function itself
    return refresh;
}

export default useRefreshToken;