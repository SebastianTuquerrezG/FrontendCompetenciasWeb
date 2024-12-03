import { DataAuth, useUserContext } from "@/context/userContext";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const urlAuth = "http://localhost:8081/api/auth/login";

interface Props {
    username: string;
    password: string;
    onReset: () => void;
}

export const AuthenticateUser = ({ username, password, onReset }: Props) => {
    const router = useRouter();
    // We're using a context to save the data of the user.
    const { setDataAuth } = useUserContext();

    // Si la autenticación es exitosa, redirige a la página principal
    const authResponse = useFetch<DataAuth>(urlAuth, "POST", { username: username, password: password });


    if (!authResponse.data) {
        onReset();
        return (
            <div>Usuario no autenticado...</div>
        );
    }

    setDataAuth(authResponse.data);


    // Save the token with js-cookie
    Cookies.set("token", authResponse.data.token, { expires: authResponse.data.expireIn, secure: true });
    Cookies.set("user", username);

    router.push("/main");

    return (
        <div>Usuario autenticado...</div>
    );
}