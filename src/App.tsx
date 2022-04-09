import React, { useState } from 'react';
import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages/Dashboard';

import { ProtectedRoute } from './ProtectedRoute';
import { User } from './interfaces/user.interface';
import { RegisterData } from './interfaces/register-data.interface';
import { ToastMessageContextProvider } from './context/ToastMessageContext';
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import { useAuthContext } from './hooks/useAuthContext';
import { AuthContextProvider } from './context/AuthContext';

export const App = () => {

  const authCtx = useAuthContext()

  return (
    <ToastMessageContextProvider>
      <AuthContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute user={authCtx?.userState}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </AuthContextProvider>
    </ToastMessageContextProvider>
  );
}


