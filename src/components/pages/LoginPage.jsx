import { useContext, useState } from 'react'
import { CurrentUserContext } from '../../context/ContextAPI';
import { useNavigate, Navigate } from 'react-router-dom';
import NavigateBackButton from '../page-elements/NavigateBackButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginPage() {
    const { jwt, login, error, loading } = useContext(CurrentUserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();

    if (jwt) {
        return <Navigate to='/dashboard' replace />
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
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
        if (validateEmail() && validatePassword()) {
            const loggedIn = await login(email, password);
            if (loggedIn) {
                navigate('/dashboard');
            } else {
                setSubmitError('Password or username is invalid');
            }
        } else {
            setSubmitError('Please, check the fields for errors');
        }
    }


    return (
        <div>
            <Form onSubmit={handleSubmitForm} noValidate>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        value={email}
                        onBlur={validateEmail}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        value={password}
                        minLength={8}
                        onBlur={validatePassword}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </Form.Group>
                <Button type='submit'>Login</Button>
                {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
                {loading && <p style={{ color: 'blue' }}>Loading...</p>}
                {/*{error && <p style={{ color: 'red' }}>{error.message}</p>}*/}
            </Form>
            <footer className="py-3">
            <NavigateBackButton />
            </footer>
        </div>
    )
}