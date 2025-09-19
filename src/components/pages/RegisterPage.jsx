import { useContext, useState } from 'react'
import { CurrentUserContext } from '../../context/ContextAPI';
import { useNavigate, Navigate } from 'react-router-dom';

export default function RegisterPage() {
    const { jwt, login, register, error, loading } = useContext(CurrentUserContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();

    if (jwt) {
        return <Navigate to='/dashboard' replace />
    }

    const handleUsernameChange = (event) => {
        setUsername((event.target.value).trim());
    }

    const validateUsername = () => {
        if (username.trim() === '') {
            setUsernameError("Username field can not be empty");
            return false;
        } else if (username.length < 3) {
            setUsernameError("Username must be at least 3 symbols");
            return false;
        } else {
            setUsernameError('');
            return true;
        }
    }

    const handleEmailChange = (event) => {
        setEmail((event.target.value).trim());
    }

    const validateEmail = () => {
        if (email.trim() === '') {
            setEmailError("Email field can not be empty");
            return false;
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email must be a valid email");
            return false;
        } else {
            setEmailError('');
            return true;
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const validatePassword = () => {
        if (password.trim() === '') {
            setPasswordError("Password field can not be empty");
            return false;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 symbols");
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        if (validateUsername() && validateEmail() && validatePassword()) {
            const isRegistered = await register(username, email, password);
            if (isRegistered) {
                const loggedIn = await login(email, password);
                if (loggedIn) {
                    navigate('/dashboard');
                } else {
                    setSubmitError('Password or username is invalid');
                }
            }
        } else {
            setSubmitError('Please, check the fields for errors. Username and email must be unique');
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmitForm} noValidate>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        placeholder='Username must be unique and at least 3 symbols'
                        value={username}
                        onBlur={validateUsername}
                        onChange={handleUsernameChange}
                        required
                    />
                    {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Email must be unique'
                        value={email}
                        onBlur={validateEmail}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Password must be at least 8 symbols'
                        value={password}
                        minLength={8}
                        onBlur={validatePassword}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <button type='submit'>Register</button>
                {/**currently not seeing this line at all, default validation works first */}
                {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
                {loading && <p style={{ color: 'blue' }}>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
            </form>
        </div>
    )
}