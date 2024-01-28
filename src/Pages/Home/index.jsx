import './styles.css';
import Header from '../../components/Header/index';
import ModalWindows from '../../components/ModalWindows';
import { useState } from 'react';
import ModalQuiz from '../../components/MoldalQuiz';

function Home() {
  const [statusButtonMW, setStatusButtonMW] = useState(false)
  const [statusQuiz, setStatusQuiz] = useState(false)

  function abrirModal(n) {
    if (n === 1) {

    } else if (n === 2) {

    } else if (n === 3) {
      setStatusQuiz(true)
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
          <nav className='nav-pages'>
            <button>Connect</button>
            <button>Info</button>
            <button style={{ backgroundColor: `${statusQuiz ? 'rgb(153, 146, 11)' : ''}`, color: `${statusQuiz ? 'black' : ''}` }} onClick={() => abrirModal(3)}>Quiz</button>
          </nav>
        </div>

        {statusQuiz &&
          <ModalQuiz />
        }
      </main>

      {statusButtonMW &&
        <ModalWindows
          setStatusButtonMW={setStatusButtonMW}
        />}
    </div>
  );
}

export default Home;
