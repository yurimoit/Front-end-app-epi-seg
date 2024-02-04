import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Home from './Pages/Home/index';
import PageHome from './components/PageHome';
import UsuarioRegister from './Pages/UsuarioRegister';
import { useState } from 'react';



function ProtectedRoutes({ redirectTo }) {

    const isAuthenticated = localStorage.getItem('token');//Troca depois para autorize

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function Rotas() {
    const [statusQuiz, setStatusQuiz] = useState(false)
    const [statusInfo, setStatusInfo] = useState(true)
    const [statusConnect, setStatusConnect] = useState(false)
    const [statusButtonMW, setStatusButtonMW] = useState(false)
    const [nomeUsuario, setNomeUsuario] = useState('')

    return (
        <Routes>
            <Route path='/' element={<Home
                statusButtonMW={statusButtonMW}
                setStatusButtonMW={setStatusButtonMW}
                statusConnect={statusConnect}
                setStatusConnect={setStatusConnect}
                statusInfo={statusInfo}
                setStatusInfo={setStatusInfo}
                statusQuiz={statusQuiz}
                setStatusQuiz={setStatusQuiz}
                nomeUsuario={nomeUsuario}
                setNomeUsuario={setNomeUsuario}
            />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path='/home' element={<PageHome
                    statusButtonMW={statusButtonMW}
                    setStatusButtonMW={setStatusButtonMW}
                    statusConnect={statusConnect}
                    setStatusConnect={setStatusConnect}
                    statusInfo={statusInfo}
                    setStatusInfo={setStatusInfo}
                    statusQuiz={statusQuiz}
                    setStatusQuiz={setStatusQuiz}
                    nomeUsuario={nomeUsuario}
                    setNomeUsuario={setNomeUsuario}
                />} />
                <Route path='/registro' element={<UsuarioRegister
                    statusButtonMW={statusButtonMW}
                    setStatusButtonMW={setStatusButtonMW}
                    statusConnect={statusConnect}
                    setStatusConnect={setStatusConnect}
                    statusInfo={statusInfo}
                    setStatusInfo={setStatusInfo}
                    statusQuiz={statusQuiz}
                    setStatusQuiz={setStatusQuiz}
                    nomeUsuario={nomeUsuario}
                    setNomeUsuario={setNomeUsuario}
                />} />
            </Route>
        </Routes>
    );
}