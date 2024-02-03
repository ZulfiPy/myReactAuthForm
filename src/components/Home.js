import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const LOGOUT_URL = '/logout';

const Home = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await axios.get(LOGOUT_URL);
            console.log(JSON.stringify(response));
            setAuth({});
            navigate("/linkpage");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the Link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Logout</button>
            </div>
        </section>
    )
}

export default Home;