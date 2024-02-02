import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Editor = () => {
    const { auth } = useAuth();

    return (
        <section>
            <h1>Editor Page</h1>
            <br />
            <p>Welcome, to the Editor page {auth.username ? auth.username : "undefined user"}!</p>
            <Link to="/">Home</Link>        
        </section>
    )
}

export default Editor;