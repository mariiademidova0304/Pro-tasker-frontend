import { createContext, useState, useMemo, useEffect } from "react";

export const CurrentUserContext = createContext({
    jwt: null,
    login: () => { },
    logout: () => { },
    register: () => { }
});

export function CurrentUserProvider({ children }) {
    const [jwt, setJwt] = useState(() => {
        const jwtFromStorage = JSON.parse(localStorage.getItem('jwt'));
        return jwtFromStorage ? jwtFromStorage : null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'username': username,
                    'email': email,
                    'password': password
                })
            }
            //setting up a signal that, when cleanup suddenly runs on updated url, controller cancels this request
            const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/users/register`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            return true;
        } catch (error) {
            setLoading(false);
            setError(error);
            return false;
        } finally {
            setLoading(false);
        }
    }
    
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'email' : email,
                    'password': password
                })
            }
            //setting up a signal that, when cleanup suddenly runs on updated url, controller cancels this request
            const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/users/login`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error! Could not get response due to: ${response.status}`)
            }
            const result = await response.json();
            setJwt(result.token);
            localStorage.setItem('jwt', JSON.stringify(result.token));
            return true;
        } catch (error) {
            console.log(error.message);
            setLoading(false);
            setError(error);
            return false;
        } finally{
            setLoading(false);
        }
    }

    const logout = () => {
        setJwt(null);
        localStorage.removeItem('jwt');
    }

    const jwtValue = useMemo(() => ({ jwt, login, logout, register, error, loading }), [jwt, error, loading]);

    return (
        <CurrentUserContext.Provider value={jwtValue}>
            {children}
        </CurrentUserContext.Provider>
    )
}

