import React, { useCallback, useState, createContext, useEffect, useReducer } from 'react';
import { User } from '../interfaces/user.interface';

type UserAction = { type: 'LOGIN'; user: User } | { type: 'LOGOUT' };

const userReducer = (state: User, action: Readonly<UserAction>): User | void => {};

export interface AuthContextType {
  userState: User | null;
  addUserContext: (user: User) => void;
  removeUserContext: () => void;
}

const getLocalUser: () => User | null = () => {
  const user = localStorage.getItem('parcelNerd-user');
  if (!user) {
    return null;
  }
  return JSON.parse(user);
};

const initialState = getLocalUser();

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [userState, setUserState] = useState<User | null>(initialState);

  const addUserContext = useCallback(
    (user: User) => {
      setUserState(user);
    },
    [setUserState]
  );

  const removeUserContext = useCallback(() => {
    setUserState(null);
  }, [setUserState]);

  // const [user, dispatch] = useReducer((state, action) => {
  //   switch(action.type) {
  //     case 'LOGIN':
  //       return  action.payload
  //     default:
  //       return state
  //   }
  // }, initialState);

  return (
    <AuthContext.Provider value={{ userState, addUserContext, removeUserContext }}>{children}</AuthContext.Provider>
  );
};
