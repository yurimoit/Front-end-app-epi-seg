import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Home from './Pages/Home/index';
import PageHome from './components/PageHome';
import { useState } from 'react';



function ProtectedRoutes({ redirectTo }) {

    const isAuthenticated = true;//Troca depois para autorize

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function Rotas() {
    const [statusButtonMW, setStatusButtonMW] = useState(false)

    return (
        <Routes>
            <Route path='/' element={<Home statusButtonMW={statusButtonMW} setStatusButtonMW={setStatusButtonMW} />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path='/home' element={<PageHome statusButtonMW={statusButtonMW} setStatusButtonMW={setStatusButtonMW} />} />
            </Route>
        </Routes>
    );
}