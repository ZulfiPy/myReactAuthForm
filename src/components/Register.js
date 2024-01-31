import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');

    const [validPassword, setValidPassword] = useState(false);
    const [validMatch, setValidMatch] = useState(false);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    return (
        <section>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:

                    <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={!username || validUsername ? "hide" : "invalid"} />
                </label>
                <input
                    id="username"
                    type="text"
                    required
                    placeholder="type a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className={!username || validUsername ? "offscreen" : "instructions"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={!validPassword ? "hide" : "valid"} />
                    <FontAwesomeIcon icon={faTimes} className={!password || validPassword ? "hide" : "invalid"} />
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    placeholder="type a password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className={!password || validPassword ? "offscreen" : "instructions"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirmPassword">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch ? "hide" : "invalid"} />
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    required
                    placeholder="confirm a password"
                    autoComplete="off"
                    value={matchPassword}
                    onChange={(e) => setMatchPassword(e.target.value)}
                />
                <p className={validMatch ? "offscreen" : "instructions"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>

                <button type="submit" disabled={!validUsername || !validPassword || !validMatch ? true : false}>Sign Up</button>
            </form>
            <p>
                Already registered?<br />
                <span className="underline">
                    <a href="#">Sign In</a>
                </span>
            </p>
        </section>
    )
}

export default Register;