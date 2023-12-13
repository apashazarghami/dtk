import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthenticate } from '../context/AuthenticateProvider';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {

  const { state } = useAuthenticate();
  const navigate = useNavigate()

  useEffect(() => {
    state.isAuthenticated ? navigate('/dashboard') : navigate('/')
  }, [state.isAuthenticated, navigate])

  return children
};

export default ProtectedRoute;
