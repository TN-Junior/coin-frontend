import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login';
import Signup from './components/Signup/Signup';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import PlanoContas from './components/PlanoDeContas/planoContas';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Empresa from './components/Empresa/Empresa';
import Dashboard from './components/Dashboard/dashboard';
import Planejamento from './components/Planejamento/Planejamento';
import Pagamentos from './components/Pagamentos/Pagamento';
import NotFound from './components/NotFound/NotFound'; // Importando a página de erro 404
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // Importando o ProtectedRoute

function Main() {
    return (
        <Router>
            <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Rotas protegidas */}
                <Route
                    path="/plano"
                    element={
                        <ProtectedRoute allowedTypes={['admin', 'user']}>
                            <PlanoContas />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/pagamentos"
                    element={
                        <ProtectedRoute allowedTypes={['admin', 'user']}>
                            <Pagamentos />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/empresa"
                    element={
                        <ProtectedRoute allowedTypes={['admin', 'user']}>
                            <Empresa />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowedTypes={['admin', 'user']}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/planejamento"
                    element={
                        <ProtectedRoute allowedTypes={['admin', 'user']}>
                            <Planejamento />
                        </ProtectedRoute>
                    }
                />

                {/* Página 404 para qualquer rota não encontrada */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default Main;
