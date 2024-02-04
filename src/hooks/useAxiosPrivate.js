import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        // Setting up a request interceptor to automatically adding the authorization header
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                // If the authorization header is not already present,
                // it adds the header with the current access token from auth context.
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                // return the modified config/request to proceed with the request.
                return config;
                // On failure, the request is rejected with the encountered error.
            }, (error) => Promise.reject(error)
        );

        // Setting up a response interceptor to automatically handling 403 errors (token expiration)
        const responseIntercept = axiosPrivate.interceptors.response.use(
            // for successful response, just pass the response through.
            response => response,
            async (error) => {
                // extracting the the failed request config from the error object.
                const prevRequest = error?.config;
                // checking if the error status is 403 and the request hasn't already been retried.
                if (error?.response?.status === 403 && !prevRequest.sent) {
                    // mark the request as sent to prevent infinite retry loops.
                    prevRequest.sent = true;
                    // attempt to refresh the access token.
                    const newAccessToken = await refresh();
                    // update the request with the new token.
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    // retry the request with the new token.
                    return axiosPrivate(prevRequest);
                }
                // for all other errors, the promise is rejected
                return Promise.reject(error);
            }
        );

        // cleanup function to remove the interceptors when the component unmounts or the dependencies change.
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

        // The effect depends on the auth context and the refresh function, rerunning if these change.
    }, [auth, refresh]);

    // return the configured axiosPrivate instance with interceptors attached.
    return axiosPrivate;
}

export default useAxiosPrivate;