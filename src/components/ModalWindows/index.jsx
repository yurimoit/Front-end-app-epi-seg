import './styles.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';


export default function ModalWindows({ setStatusButtonMW }) {
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
                        <li>CONNECT</li>
                        <li>INFO</li>
                        <li>QUIZ</li>
                    </ul>
                </nav>
                <footer className='windows-footer'>
                    <div>
                        <h1>YM</h1>
                    </div>
                    <button>
                        <h1>Logout</h1>
                        <LogoutIcon sx={{
                            color: '#d3d3d3', width: '28px', height: '28px'
                        }} />
                    </button>
                </footer>
            </main>
        </div>
    );
}