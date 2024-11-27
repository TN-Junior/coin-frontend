import React from 'react';
import './Sidebar.css';
import Header from "../Header/Header";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Ou sessionStorage.getItem('token')
    
        try {
            // Chamar o backend para invalidar o token (opcional)
            await fetch('https://auth-coinn2-0.onrender.com/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Limpar localStorage e sessionStorage
            localStorage.removeItem('token');
            sessionStorage.removeItem('isLogged');
            sessionStorage.removeItem('userType');
    
            // Redirecionar para a tela de login
            navigate('/');
        } catch (error) {
            console.error('Erro ao deslogar:', error);
            alert('Erro ao deslogar. Tente novamente.');
        }
    };
    

    return (
        <div className='sidebar-content'>
            <aside className='sidebar'>
                <header>
                    <h1>Coin</h1>
                </header>

                <nav>
                    <ul>
                        <li><Link to="/Dashboard">Dashboard</Link></li>
                        <li><Link to="/Planejamento">Planejamento</Link></li>
                        <li><Link to="/Pagamentos">Pagamentos</Link></li>
                        <li><Link to="/Empresa">Empresas</Link></li>
                        <li className="active"><a className='activeA' href="/plano">Plano de Contas</a></li>
                        
                        <li><a onClick={handleLogout} style={{ cursor: 'pointer' }}>Sair</a></li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
