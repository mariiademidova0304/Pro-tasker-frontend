import { useState } from 'react';
import './App.css';
import { useContext } from 'react';
import { CurrentUserContext } from './context/ContextAPI';
import LoginPage from './components/pages/LoginPage';
import DashBoardPage from './components/pages/DashboardPage';
import Nav from 'react-bootstrap/Nav';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './components/pages/RegisterPage';
import ProtectedRoutes from './components/ProtectedRoute';
import ProjectDetailsPage from './components/pages/ProjectDetailsPage';

function App() {
  const { jwt, login, logout, error, loading } = useContext(CurrentUserContext);

  const NotFoundPage = () => <h2>404 - Page Not Found</h2>;
  const HomePage = () => (
    <div>
      <Nav defaultActiveKey="/" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
    </Nav>
    <h1>Welcome to Pro-tasker</h1>
    <p>To create or see Tasks you need to be logged in</p>
    </div>
  )

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={< ProtectedRoutes/>}>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/dashboard/:projectID" element={<ProjectDetailsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} /> {/* Fallback for unmatched routes */}
      </Routes>
    </div>
  )
}

export default App
