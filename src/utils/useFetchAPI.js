import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/ContextAPI";

//NEED TO ADD JWT TOKEN
//remember this hook from lesson material, tried to really understand what it all means
export default function useFetchAPI(url) {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { jwt } = useContext(CurrentUserContext);

    useEffect(() => {
        //if url is not full yet don't do anything to nit get errors
        if (!url) return;

        const controller = new AbortController;
        setApiData(null);
        setLoading(true);
        setError(null);

        const fetchAPI = async () => {
            try {
                //setting up a signal that, when cleanup suddenly runs on updated url, controller cancels this request
                const response = await fetch(url, { signal: controller.signal,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}`
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error(`Error! Could not get response due to: ${response.status}`)
                }
                const result = await response.json();
                setApiData(result);
            } catch (error) {
                //since we manually set up cancelling of the request with controller, we don't need this error
                if (error.name !== 'AbortError') {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchAPI();

        return () => {
            controller.abort();
        }
    }, [url, jwt])

    return { apiData, loading, error };

}