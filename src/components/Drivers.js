import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";


const Drivers = () => {
    const [drivers, setdrivers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Flag to trach if the component is mounted, to prevent state updates after the components has unmounted.
        let isMounted = true;
        // AbortController to cancel the fetch request if the component unmounts before the request completes.
        const controller = new AbortController();

        const getDrivers = async () => {
            try {
                // Makes a GET request to fetch drivers, using the abort signal to cancel the request if needed.
                const response = await axiosPrivate.get('/api/drivers', {
                    signal: controller.signal
                });
                console.log("response.data", response.data);
                // If the component is still mounted, update the state with the fetched drivers.
                isMounted && setdrivers(response.data);
            } catch (err) {
                // If an error occurs an the components is still mounted, navigate to the login page.
                // This is being used for handling expired authentication tokens and other errors.
                if (isMounted) {
                    console.error(err);
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }
        }

        // Call the getDrivers function to fetch the drivers.
        getDrivers();

        // Cleanup function to set isMounted to false and abort any ongoing fetch request when the component unmounts.
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);


    return (
        <article>
            <h2>Drivers List</h2>
            {drivers?.length
                ? (
                    JSON.stringify(drivers)
                ) : <p>No drivers to display</p>}
        </article>
    );
}

export default Drivers;