import React, { useCallback, useState, createContext, useReducer } from "react";
import { User } from "../interfaces/user.interface";

export interface AuthContextType {
    userState: User | null;
    addUserContext: (user: User) => void;
    removeUserContext: () => void;
};

const isAuthenticated: () => User | null = () => {
    const user = localStorage.getItem('parcelNerd-user');
    if (!user) {
        return null
    }
    return JSON.parse(user);
};

const initialState = isAuthenticated()

export const AuthContext = createContext<AuthContextType | null>({
    userState: initialState,
    addUserContext: (user: User) => { },
    removeUserContext: () => { }
});

export const AuthContextProvider: React.FC = ({ children }) => {
    const [userState, setUserState] = useState(initialState)

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
