import './styles.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
    return (
        <footer className='div-footer'>

            <div className='div-footer-p'>
                <div className='footer-content'>
                    <p>Copyright© 2024 moiTec LTDA</p>
                    <div className='icon-redes'>
                        <a rel="noreferrer" target="_blank" href='https://www.facebook.com/venilson.dias.169?locale=pt_BR'><FacebookIcon sx={{ color: "#fff" }} /></a>
                        <a rel="noreferrer" target="_blank" href='https://www.instagram.com/dias.venilson14/'><InstagramIcon sx={{ color: "#fff" }} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}