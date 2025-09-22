import { createContext, useState, useMemo, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

//creating context to be able to use jwt, login, logout and register across different components
export const CurrentUserContext = createContext({
    jwt: null,
    login: () => { },
    logout: () => { },
    register: () => { }
});

export function CurrentUserProvider({ children }) {
//function checks whether token has already expired
    const isJwtExpired = (jwt) => {
        try {
            const decodedJWT = jwtDecode(jwt);
            const currentTime = Date.now() / 1000;
            return decodedJWT.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    }
    
//setting up jwt state, trying to get it from localstorage and checking whether it's expired or not, 
// if expired - setting it to null
//is probably useless since i have automatic logout that removes expired jwt from localStorage
    const [jwt, setJwt] = useState(() => {
        const jwtFromStorage = JSON.parse(localStorage.getItem('jwt'));
        if(jwtFromStorage){
           return isJwtExpired(jwtFromStorage) ? null : jwtFromStorage
        } else {
            return null;
        }
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'email': email,
                    'password': password
                })
            }
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
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setJwt(null);
        localStorage.removeItem('jwt');
    }

    //setting automatic logout on token expiration: when token gets created, we check it's expiration time,
    //then count time left till the token is expired and set timer that will run logout when the time comes
    useEffect(()=> {
        if(!jwt) return;

        const decodedJwt = jwtDecode(jwt);
        const expirationTime = decodedJwt.exp * 1000;
        const timeTillExp = expirationTime - Date.now();

        const timer = setTimeout(() => {
            logout();
        }, timeTillExp);

        return () => clearTimeout(timer);
    }, [jwt])

    const jwtValue = useMemo(() => ({ jwt, login, logout, register, error, loading }), [jwt, error, loading]);

    return (
        <CurrentUserContext.Provider value={jwtValue}>
            {children}
        </CurrentUserContext.Provider>
    )
}

