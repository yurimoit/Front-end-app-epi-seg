import './styles.css'
import MenuIcon from '@mui/icons-material/Menu';


export default function Header({ setStatusButtonMW }) {
    return (
        <header className='header'>
            <button onClick={() => setStatusButtonMW(true)}>
                <MenuIcon sx={{
                    color: 'rgb(228, 218, 23)', width: '90%', height: '90%',
                    ':hover': {
                        color: 'black'
                    }
                }} />
            </button>
            <div>
                <h1>EPI-SEG</h1>
            </div>
            <button style={{ backgroundColor: '#ffffff00' }}></button>
        </header>
    );
}