import './styles.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ModalWindows({ setStatusButtonMW, setStatusConnect, setStatusInfo, setStatusQuiz, nomeUsuario }) {
    const navigate = useNavigate();
    const [sigla, setSigla] = useState('')

    function pageRegistro() {
        if (localStorage.getItem('token')) {
            navigate('/registro')
        }
    }

    function homeLogin() {
        if (!localStorage.getItem('token')) {
            setStatusButtonMW(false)
            navigate('/')
            setStatusConnect(true)
            setStatusInfo(false)
            setStatusQuiz(false)
        }
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token')
            navigate('/')
            setStatusButtonMW(false)
            setStatusConnect(true)
            setStatusInfo(false)
            setStatusQuiz(false)

        }
    }

    function irParaPageHome(n) {
        if (n === 1) {
            setStatusButtonMW(false)
            navigate('/')
            setStatusConnect(true)
            setStatusInfo(false)
            setStatusQuiz(false)
        } else if (n === 2) {
            setStatusButtonMW(false)
            navigate('/')
            setStatusConnect(false)
            setStatusInfo(true)
            setStatusQuiz(false)
        } else if (n === 3) {
            setStatusButtonMW(false)
            navigate('/')
            setStatusConnect(false)
            setStatusInfo(false)
            setStatusQuiz(true)
        } else if (n === 4 && localStorage.getItem('token')) {
            setStatusButtonMW(false)
            navigate('/home')
        } else if (n === 5 && localStorage.getItem('token')) {
            setStatusButtonMW(false)
            navigate('/registro')
        }
    }

    function pegarSiglasNome() {
        if (nomeUsuario) {
            let array = nomeUsuario.toUpperCase().split(' ')
            setSigla(array[0].slice(0, 1) + array[1].slice(0, 1))

        }
    }

    useEffect(() => {
        pegarSiglasNome()
    },
        // eslint-disable-next-line 
        [nomeUsuario])

    return (
        <div className='modal-windows'>
            <header className='modal-header'>
                <button onClick={() => setStatusButtonMW(false)}>
                    <ArrowBackIcon sx={{
                        color: '#d3d3d3', width: '80%', height: '80%',
                        ':hover': {
                            color: 'black'
                        }
                    }} />
                </button>
                <div>
                    <h1>Menu</h1>
                </div>
                <button style={{ backgroundColor: '#ffffff00' }}></button>
            </header>

            <main className='main-windows'>
                <nav className='nav-list'>
                    <ul>
                        <li onClick={() => irParaPageHome(1)}>CONNECT</li>
                        <li onClick={() => irParaPageHome(2)}>INFO</li>
                        <li onClick={() => irParaPageHome(3)}>QUIZ</li>
                        {localStorage.getItem('token') && (<>
                            <li onClick={() => irParaPageHome(4)}>Home</li>
                            <li onClick={() => irParaPageHome(5)}>Perfil</li>
                        </>)}
                    </ul>
                </nav>
                <footer className='windows-footer'>
                    <div onClick={() => pageRegistro()}>
                        <h1>{localStorage.getItem('token') ? sigla : 'JS'}</h1>
                    </div>
                    <button onClick={() => homeLogin()}>
                        <h1>{!localStorage.getItem('token') ? 'Entra' : 'Logout'}</h1>
                        <LogoutIcon sx={{
                            color: '#d3d3d3', width: '28px', height: '28px'
                        }} />
                    </button>
                </footer>
            </main>
        </div>
    );
}