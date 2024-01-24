import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Home from './Pages/Home/index';
import Login from './Pages/Login';
import Register from './Pages/Register';



function ProtectedRoutes({ redirectTo }) {

    const isAuthenticated = true;//Troca depois para autorize

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function Rotas() {


    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/cadastrar' element={<Register />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path='/home' element={<Home />} />
            </Route>
        </Routes>
    );
}