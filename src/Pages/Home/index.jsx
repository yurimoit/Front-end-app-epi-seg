import './styles.css';
import Header from '../../components/Header/index';
import ModalWindows from '../../components/ModalWindows';
import { useState } from 'react';

function Home() {
  const [statusButtonMW, setStatusButtonMW] = useState(false)


  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.log('Erro ao registrar o Service Worker:', error);
        });
    });
  }


  return (
    <div className="home">
      <Header
        setStatusButtonMW={setStatusButtonMW}
      />
      <main onClick={() => setStatusButtonMW(false)}>
        <div className='main-header'>
          <nav className='nav-pages'>
            <button>Connect</button>
            <button>Info</button>
            <button>Quiz</button>
          </nav>
        </div>
      </main>

      {statusButtonMW &&
        <ModalWindows
          setStatusButtonMW={setStatusButtonMW}
        />}
    </div>
  );
}

export default Home;
