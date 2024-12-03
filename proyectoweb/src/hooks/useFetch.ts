import { useEffect, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
    data: Data<T> | null;
    loading: boolean;
    error: ErrorType | null;
}

export const useFetch = <T>(url: string, method: string, body?: Object, headerToken?: HeadersInit): Params<T> => {
    const [data, setData] = useState<Data<T> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: method,
                    body: body? JSON.stringify(body) : undefined,
                    headers: {
                        "Content-Type": "application/json",
                        ...headerToken,
                    },
                    signal: controller.signal
                });

                if(!response.ok){
                    throw new Error(`Error en la petición: ${response.statusText}`);
                }

                const jsonData: T = await response.json();
                setData(jsonData);
                setError(null);
            } catch(err) {
                setError(err as Error);
            }finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            controller.abort();
        }

    }, [url]);

    return { data, loading, error }
}