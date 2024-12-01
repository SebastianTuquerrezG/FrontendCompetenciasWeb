import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";

const urlAuth = "http://localhost:8081/api/auth/verifyToken";
const urlUser = "http://localhost:8081/api/controller/getUserWithUsername";

export interface Data {
    id: number;
    identity: string;
    typeId: string;
    name: string;
    lastname: string;
    degree: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    state: string;
    rol: string;
    authorities: Object;
}

export interface DataAuth {
    token: string;
    expireIn: number;
}

interface UserContextType {
    user: Data | null;
    setUser: (user: Data) => void;
    dataAuth: DataAuth | null;
    setDataAuth: (dataAuth: DataAuth) => void;
    isAuthenticated: boolean;
    clearUser: () => void;
    clearDataAuth: () => void;
    logout: () => void;
}

interface GlobalProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: GlobalProps) => {
    const [user, setUser] = useState<Data | null>(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [dataAuth, setDataAuth] = useState<DataAuth | null>(null);

    const clearUser = () => setUser(null);

    const clearDataAuth = () => setDataAuth(null);

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setIsAuthenticated(false);
        clearUser();
        clearDataAuth();
        window.location.reload();
    }

    useEffect(() => {
        async function settingUser() {
            const cookies = Cookies.get();
            const username = cookies.user;

            if(!dataAuth?.token){
                setIsAuthenticated(false);
                clearUser();
                return clearDataAuth();
            }

            const body: Object = {
                username: username,
            }

            try{
                const response = await fetch(urlUser, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${dataAuth.token}`,
                    },
                });
        
                if (!response.ok) {
                    throw new Error(`Error en la petición: ${response.statusText}`);
                }

                const userData: Data = await response.json();
                setUser(userData);
            }catch(err){
                console.log(err);
                setIsAuthenticated(false);
                clearDataAuth();
                clearUser();
            }
        }
        settingUser();
    },[dataAuth]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            const token = cookies.token;

            if (!token) {
                setIsAuthenticated(false);
                clearUser();
                return clearDataAuth();
            }

            const body: Object = {
                token: token,
            }

            try {
                const result = await fetch(urlAuth, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {"Content-Type": "application/json"},
                })

                if(!result.ok){
                    throw new Error(`Error en la petición: ${result}`);
                }

                setDataAuth({ token: token, expireIn: 3600000 });
                setIsAuthenticated(true);
            } catch (err) {
                console.log(err);
                setIsAuthenticated(false);
                clearDataAuth();
                clearUser();
            }
        }
        checkLogin();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, dataAuth, setDataAuth, isAuthenticated, clearUser, clearDataAuth, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}