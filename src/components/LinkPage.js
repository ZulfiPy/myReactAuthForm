import { Link } from "react-router-dom";

const Linkpage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <br />
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <Link to="/">Home</Link>
            <Link to="/editor">Editors Page</Link>
            <Link to="/admin">Admin Page</Link>
        </section>
    )
}

export default Linkpage;