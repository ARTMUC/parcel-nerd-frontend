import React, { useCallback, useState, createContext, useEffect } from "react";
import { User } from "../interfaces/user.interface";

export interface AuthContextType {
    userState: User | null;
    addUserContext: (user: User) => void;
    removeUserContext: () => void;
};

const getLocalUser: () => User | null = () => {
    const user = localStorage.getItem('parcelNerd-user');
    if (!user) {
        return null
    }
    return JSON.parse(user);
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
    const [userState, setUserState] = useState<User | null>(null)

    useEffect(() => {
        const localUser = getLocalUser();
        setUserState(localUser);
    }, []);

    const addUserContext = useCallback(
        (user: User) => {
            setUserState(user);
        },
        [setUserState]
    );

    const removeUserContext = useCallback(
        () => {
            setUserState(null);
        },
        [setUserState]
    );

    return (
        <AuthContext.Provider value={{ userState, addUserContext, removeUserContext }}>
            {children}
        </AuthContext.Provider>
    );
}
