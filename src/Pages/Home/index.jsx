import './styles.css';
import Header from '../../components/Header/index';
import ModalWindows from '../../components/ModalWindows';
import { useState } from 'react';
import ModalQuiz from '../../components/MoldalQuiz';
import ModalInfo from '../../components/ModalInfo';
import ModalConnectar from '../../components/ModalConnectar';
import Footer from '../../components/Footer';

function Home() {
  const [statusButtonMW, setStatusButtonMW] = useState(false)
  const [textLogo, setTextLogo] = useState('A importância da segurança do trabalho.')
  const [statusQuiz, setStatusQuiz] = useState(false)
  const [statusInfo, setStatusInfo] = useState(true)
  const [statusConnect, setStatusConnect] = useState(false)

  function abrirModal(n) {
    if (n === 1) {
      setTextLogo('Faça seu Login ou Cadastre-se!')
      setStatusInfo(false)
      setStatusQuiz(false)
      setStatusConnect(true)
    } else if (n === 2) {
      setTextLogo('A importância da segurança do trabalho.')
      setStatusInfo(true)
      setStatusQuiz(false)
      setStatusConnect(false)
    } else if (n === 3) {
      setTextLogo('Teste suas habilidades agora!')
      setStatusQuiz(true)
      setStatusInfo(false)
      setStatusConnect(false)
    }
  }


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
          <div>
            <h1>{textLogo}</h1>
            <nav className='nav-pages'>
              <button style={{ background: `${statusConnect ? '#ffffff73' : ''}`, color: `${statusConnect ? 'black' : ''}` }} onClick={() => abrirModal(1)}>CONNECT</button>
              <button style={{ background: `${statusInfo ? '#ffffff73' : ''}`, color: `${statusInfo ? 'black' : ''}` }} onClick={() => abrirModal(2)}>INFO</button>
              <button style={{ background: `${statusQuiz ? '#ffffff73' : ''}`, color: `${statusQuiz ? 'black' : ''}` }} onClick={() => abrirModal(3)}>QUIZ</button>
            </nav>
          </div>
        </div>

        {statusConnect && <ModalConnectar />}

        {statusInfo &&
          <ModalInfo />
        }

        {statusQuiz &&
          <ModalQuiz />
        }
      </main>

      {statusButtonMW &&
        <ModalWindows
          setStatusButtonMW={setStatusButtonMW}
        />}

      <Footer />
    </div>
  );
}

export default Home;
