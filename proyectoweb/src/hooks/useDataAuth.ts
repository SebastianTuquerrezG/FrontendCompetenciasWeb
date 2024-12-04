import { useUserContext } from "@/context/userContext";

export const useDataAuth = () => {
    //const {dataAuth} = useUserContext();
    const dataAuth = "";
    if(!dataAuth){
        throw new Error("El usuario no se ha autenticado.");
    }

    return dataAuth;
}