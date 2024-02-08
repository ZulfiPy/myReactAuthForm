import { Link } from "react-router-dom";
import Drivers from "./Drivers";

const Admin = () => {

    return (
        <section>
            <h1>Admin Page</h1>
            <br />
            <Drivers />
            <br />
            <Link to="/">Home</Link>
        </section>
    )
}

export default Admin;