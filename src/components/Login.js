import { useState, useRef } from "react";
import axios from "../api/axios";

const LOGIN_URL = "/auth"


const Login = () => {
    const userRef = useRef(null);
    const errRef = useRef(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({
                    username, password
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            console.log(JSON.stringify(accessToken));
            console.log(JSON.stringify(roles));

            setSuccess(true);
            setUsername("");
            setPassword("");
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg("No Server Response");
            }
            else if (err.response?.status === 400) {
                setErrMsg('some of data is missing');
            } else if (err.reponse?.status === 401) {
                setErrMsg('Unauthorized: user not found')
            } else {
                setErrMsg("Login failed");
            }
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <h1>Sign In</h1 >
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            required
                            autoComplete="off"
                            placeholder="type a username"
                            ref={userRef}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            required
                            autoComplete="off"
                            placeholder="type a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit" disabled={!username || !password ? true : false}>Sign In</button>
                    </form>

                    <p>Need an Account?</p><br />
                    <span className="line">
                        <a href="#">Sign Up</a>
                    </span>
                </section >
            )}
        </>
    )
}

export default Login;