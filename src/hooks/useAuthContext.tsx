import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";

export const useAuthContext = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) { throw new Error('Missing AuthContext data') }

    return authContext
}