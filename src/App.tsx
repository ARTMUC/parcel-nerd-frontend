import React, { useState } from 'react';
import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages/Dashboard';

import { ProtectedRoute } from './ProtectedRoute';
import { ToastMessageContextProvider } from './context/ToastMessageContext';
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import { useAuthContext } from './hooks/useAuthContext';
import { AuthContextProvider } from './context/AuthContext';
import { ProjectSelect } from './pages/ProjectSelect/ProjectSelect';

export const App = () => {



  return (
    <AuthContextProvider>
      <ToastMessageContextProvider>

        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/select-project'
            element={
              <ProtectedRoute>
                <ProjectSelect />
              </ProtectedRoute>
            }
          />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </ToastMessageContextProvider>
    </AuthContextProvider >

  );
}


