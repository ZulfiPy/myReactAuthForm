const Login = () => {
    return (
        <section>
            <h1>Sign In</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="type a username"
                />

                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    required
                    autoComplete="off"
                    placeholder="type a password"
                />

                <button type="submit" disabled>Sign In</button>
            </form>

            <p>Need an Account?</p><br />
            <span className="line">
                <a href="#">Sign Up</a>
            </span>
        </section>
    )
}

export default Login;