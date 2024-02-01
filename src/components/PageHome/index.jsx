import './styles.css'
import Header from '../Header'
import Footer from '../Footer'
import ModalWindows from '../ModalWindows'
import SearchIcon from '@mui/icons-material/Search';
import ModalFuncionarios from '../ModalFuncionario';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalExcluir from '../ModalExcluir';
import ModalEditar from '../ModalEditar';
import ModalDetalhar from '../ModalDetalhar';

export default function PageHome({ statusButtonMW, setStatusButtonMW }) {
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false)
    const [abrirModalExcluir, setAbrirModalExcluir] = useState(false)
    const [abrirModalEditar, setAbrirModalEditar] = useState(false)
    const [abrirModalDetalhar, setAbrirModalDetalhar] = useState(false)


    return (
        <div className='page-home'>
            <Header
                setStatusButtonMW={setStatusButtonMW}
            />

            <main className='page-home-main'>
                <nav className='page-home-nav'>
                    <h1>Pesquisa avançada</h1>
                    <div className='page-home-input'>
                        <input
                            type='text'
                            placeholder='Pesquise por nome,cargo...'
                        />
                        <SearchIcon className='page-home-input-search' />
                    </div>
                </nav>
                <section className='section-lista'>
                    <div className='page-home-lista-title'>
                        <h1>Lista de funcionarios</h1>
                        <ul>
                            <li className='li-lista-left-title'>ID</li>
                            <li className='li-lista-rigth-title'>Nome</li>
                            <li className='li-lista-rigth-opcoes'>Editar</li>
                            <li className='li-lista-rigth-opcoes'>Excluir</li>
                        </ul>
                    </div>
                    <div className='page-home-lista'>
                        <ul>
                            <li onClick={() => setAbrirModalDetalhar(true)} className='li-lista-left'>9785</li>
                            <li className='li-lista-rigth'>Yuri</li>
                            <button onClick={() => setAbrirModalEditar(true)} className='li-lista-button'>
                                <EditIcon sx={{ color: 'rgb(32, 208, 32)', width: '80%', height: '80%' }} />
                            </button>
                            <button onClick={() => setAbrirModalExcluir(true)} className='li-lista-button'>
                                <DeleteForeverIcon sx={{ color: 'red', width: '80%', height: '80%' }} />
                            </button>
                        </ul>
                        <ul>
                            <li className='li-lista-left'>9798</li>
                            <li className='li-lista-rigth'>Rogeiro</li>
                            <button className='li-lista-button'></button>
                            <button className='li-lista-button'></button>
                        </ul>
                    </div>
                </section>
                <div className='page-home-button'>
                    <button onClick={() => setAbrirModalCadastro(true)}>+ Adicionar</button>
                </div>
            </main>
            <Footer />

            {abrirModalCadastro && (<ModalFuncionarios
                abrirModalCadastro={abrirModalCadastro}
                setAbrirModalCadastro={setAbrirModalCadastro}
            />)}

            {statusButtonMW &&
                <ModalWindows
                    setStatusButtonMW={setStatusButtonMW}
                />}

            {abrirModalExcluir &&
                (<ModalExcluir
                    abrirModalExcluir={abrirModalExcluir}
                    setAbrirModalExcluir={setAbrirModalExcluir}
                />)
            }

            {abrirModalEditar && (
                <ModalEditar
                    abrirModalEditar={abrirModalEditar}
                    setAbrirModalEditar={setAbrirModalEditar}
                />
            )}

            {abrirModalDetalhar && (
                <ModalDetalhar
                    abrirModalDetalhar={abrirModalDetalhar}
                    setAbrirModalDetalhar={setAbrirModalDetalhar}
                />
            )}

        </div>

    )
}