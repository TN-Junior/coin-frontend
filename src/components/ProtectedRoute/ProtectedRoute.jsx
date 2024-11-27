import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedTypes }) => {
    const isLogged = localStorage.getItem('token') !== null; // Verifica se o token existe
    const userType = sessionStorage.getItem('userType'); // Obtém o tipo do usuário

    if (!isLogged || !allowedTypes.includes(userType)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
