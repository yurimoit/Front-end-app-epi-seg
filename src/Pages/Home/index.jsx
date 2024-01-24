import './styles.css';
import Header from '../../components/Header/index';
import ModalWindows from '../../components/ModalWindows';
import { useState } from 'react';

function Home() {
  const [statusButtonMW, setStatusButtonMW] = useState(false)
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
