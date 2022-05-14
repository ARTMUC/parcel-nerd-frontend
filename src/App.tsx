import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { ProtectedRoute } from './ProtectedRoute';
import { ToastMessageContextProvider } from './context/ToastMessageContext';
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import { AuthContextProvider } from './context/AuthContext';
import { ProjectSelectScreen } from './pages/ProjectSelect/ProjectSelectScreen';
import { ProjectContextProvider } from './context/ProjectContext';
import './App.css';

export const App = () => {
  return (
    <AuthContextProvider>
      <ProjectContextProvider>
        <ToastMessageContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/select-project"
              element={
                <ProtectedRoute>
                  <ProjectSelectScreen />
                </ProtectedRoute>
              }
            />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </ToastMessageContextProvider>
      </ProjectContextProvider>
    </AuthContextProvider>
  );
};
