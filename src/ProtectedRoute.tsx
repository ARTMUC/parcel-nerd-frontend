import { Navigate, Outlet } from "react-router-dom";
import { User } from "./interfaces/user.interface";


export const ProtectedRoute = ({ user,
    children }: ProtectedRouteProps) => {
    if (!user) {
        return <Navigate to='/signup' replace />;
    }


    return children
};

type ProtectedRouteProps = {
    user: User | null,
    children: JSX.Element
};