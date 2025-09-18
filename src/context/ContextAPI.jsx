import { createContext, useState, useMemo, useEffect } from "react";

export const currentUserContext = createContext({
    jwt: null,
    login: () => { },
    logout: () => { }
});

export function currentUserProvider({ children }) {
    const [jwt, setJwt] = useState(() => {
        const jwtFromStorage = JSON.parse(localStorage.getItem('jwt'));
        return jwtFromStorage ? jwtFromStorage : null;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
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
        } catch (error) {
            console.log(error.message);
            setError(error);
        } finally{
            setLoading(false);
        }
    }

    const logout = () => {
        setJwt(null);
        localStorage.removeItem('jwt');
    }

    const jwtValue = useMemo(() => ({ jwt, login, logout, error, loading }), [jwt, error, loading]);

    return (
        <currentUserContext.Provider value={jwtValue}>
            {children}
        </currentUserContext.Provider>
    )
}

