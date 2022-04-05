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

export const App = () => {

  const [user, setUser] = useState<User | null>({
    id: '21341234123',
    email: 'asdsad',
    name: 'asdfasdf'
  });
  const handleLogin = (data: User) => setUser(data);
  const handleLogout = () => setUser(null);

  return (
    <ToastMessageContextProvider>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="signin" element={<SignIn handleLogin={handleLogin} />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </ToastMessageContextProvider>
  );
}


