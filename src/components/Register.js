import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";

const BIRTHDATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.([0-9]{4})$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register'

const Register = () => {
    const userRef = useRef(null);
    const errRef = useRef(null);

    const [firstname, setFirstname] = useState('');
    const [firstnameFocus, setFirstnameFocus] = useState(false);

    const [lastname, setLastname] = useState('');
    const [lastnameFocus, setLastnameFocus] = useState(false);

    const [birthDate, setBirthDate] = useState('');
    const [validBirthDate, setValidBirthDate] = useState(false);
    const [birthDateFocus, setBirthDateFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [validPassword, setValidPassword] = useState(false);
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const allInputsExist = [firstname, lastname, validBirthDate, validUsername, validPassword, validMatch].every(Boolean);

    useEffect(() => {
        userRef.current.focus()
    }, []);

    useEffect(() => {
        setValidBirthDate(BIRTHDATE_REGEX.test(birthDate));
    }, [birthDate])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const birthdateRegExTest = BIRTHDATE_REGEX.test(birthDate);
        const usernameRegExTest = USER_REGEX.test(username);
        const passwordRegExTest = PASSWORD_REGEX.test(password);

        const inputTest = [birthdateRegExTest, usernameRegExTest, passwordRegExTest].every(Boolean);

        if (!inputTest) {
            setErrMsg('Invalid Data Provided');
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, password, firstname, lastname, birthDate }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response));

            setSuccess(true);
            setFirstname("");
            setLastname("");
            setBirthDate("");
            setUsername("");
            setPassword("");
            setMatchPassword("");
            console.log("done")
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username taken")
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
            console.log(err?.response);
        }

    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Sign In</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstname">
                            First name:
                            <FontAwesomeIcon icon={faCheck} className={firstname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={!firstname && firstnameFocus ? "invalid" : "hide"} />
                        </label>
                        <input
                            id="firstname"
                            type="text"
                            required
                            placeholder="type your first name"
                            autoComplete="off"
                            ref={userRef}
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            onFocus={() => setFirstnameFocus(true)}
                            onBlur={() => setFirstnameFocus(false)}
                        />

                        <label htmlFor="lastname">
                            Last name:
                            <FontAwesomeIcon icon={faCheck} className={lastname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={!lastname && lastnameFocus ? "invalid" : "hide"} />
                        </label>
                        <input
                            id="lastname"
                            type="text"
                            required
                            placeholder="type your last name"
                            autoComplete="off"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            onFocus={() => setLastnameFocus(true)}
                            onBlur={() => setLastnameFocus(false)}
                        />

                        <label htmlFor="birthdate">
                            Birth date:

                            <FontAwesomeIcon icon={faCheck} className={validBirthDate ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={!validBirthDate && birthDateFocus ? "invalid" : "hide"} />
                        </label>
                        <input
                            id="birthdate"
                            type="text"
                            required
                            placeholder="type your birth date"
                            autoComplete="off"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            onFocus={() => setBirthDateFocus(true)}
                            onBlur={() => setBirthDateFocus(false)}
                        />
                        <p className={birthDateFocus && !validBirthDate ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Birth date should be provided in the next format:<br />
                            Format - dd.mm.yyyy<br />
                            Example - 01.12.1999<br />
                            dd - 01 - day<br />
                            mm - 12 - month<br />
                            yyyy - 1999 - year<br />
                        </p>

                        <label htmlFor="username">
                            Username:

                            <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={!validUsername && usernameFocus ? "invalid" : "hide"} />
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            placeholder="type a username"
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            aria-invalid={validUsername ? false : true}
                            aria-describedby="uidnote"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p id="uidnote" className={usernameFocus && !validUsername ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={!validPassword ? "hide" : "valid"} />
                            <FontAwesomeIcon icon={faTimes} className={(!validPassword && passwordFocus) ? "invalid" : "hide"} />
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            placeholder="type a password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-invalid={validPassword ? false : true}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirmPassword">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={!validMatch ? "invalid" : "hide"} />
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            placeholder="confirm a password"
                            autoComplete="off"
                            value={matchPassword}
                            onChange={(e) => setMatchPassword(e.target.value)}
                            aria-invalid={matchPassword ? false : true}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchPasswordFocus(true)}
                            onBlur={() => setMatchPasswordFocus(false)}
                        />
                        <p id="confirmnote" className={matchPasswordFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button type="submit" disabled={!allInputsExist}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/login">Sign In</Link>
                        </span>
                    </p>
                </section >
            )}
        </>
    )
}

export default Register;