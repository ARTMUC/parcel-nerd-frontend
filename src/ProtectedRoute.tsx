import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { User } from "./interfaces/user.interface";



export const ProtectedRoute = (
    { children }: ProtectedRouteProps) => {

    const authCtx = useAuthContext()
    const user = authCtx?.userState

    if (!user) {
        return <Navigate to='/signin' replace />;
    }


    return children
};


type ProtectedRouteProps = {
    children: JSX.Element
};