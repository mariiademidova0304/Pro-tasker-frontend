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

    const login = async (email, password) => {
        try {
            //setting up a signal that, when cleanup suddenly runs on updated url, controller cancels this request
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error! Could not get response due to: ${response.status}`)
            }
            const result = await response.json();
            setJwt(result.token);
            localStorage.setItem('jwt', JSON.stringify(result.token));
        } catch (error) {
            console.log(error.message);
        }
    }

    const logout = () => {
        setJwt(null);
        localStorage.removeItem('jwt');
    }

    const jwtValue = useMemo(() => ({ jwt, login, logout }), [jwt]);

    return (
        <currentUserContext.Provider value={jwtValue}>
            {children}
        </currentUserContext.Provider>
    )
}

