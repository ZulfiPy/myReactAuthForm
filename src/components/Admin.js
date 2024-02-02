import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Admin = () => {
    const { auth } = useAuth();

    return (
        <section>
            <h1>Admin Page</h1>
            <br />
            <p>Welcome, to the Admin page {auth.username ? auth.username : "undefined user"}!</p>
            <Link to="/">Home</Link>
        </section>
    )
}

export default Admin;