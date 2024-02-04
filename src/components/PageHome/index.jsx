import './styles.css'
import Header from '../Header'
import Footer from '../Footer'
import ModalWindows from '../ModalWindows'
import SearchIcon from '@mui/icons-material/Search';
import ModalFuncionarios from '../ModalFuncionario';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalExcluir from '../ModalExcluir';
import ModalEditar from '../ModalEditar';
import ModalDetalhar from '../ModalDetalhar';
import api from '../../services/api';

export default function PageHome({ statusButtonMW, setStatusButtonMW, statusConnect, setStatusConnect, statusInfo, setStatusInfo, statusQuiz, setStatusQuiz, nomeUsuario, setNomeUsuario }) {
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false)
    const [abrirModalExcluir, setAbrirModalExcluir] = useState(false)
    const [abrirModalEditar, setAbrirModalEditar] = useState(false)
    const [abrirModalDetalhar, setAbrirModalDetalhar] = useState(false)
    const [lista, setLista] = useState([''])
    const [index, setIndex] = useState(null)
    const [id, setId] = useState(null)
    const [nomeFuncionario, setNomeFuncionario] = useState('')


    function abrirDetalhes(index) {
        setIndex(index)
        setAbrirModalDetalhar(true)
    }

    function editarFuncionario(index) {
        setIndex(index)
        setAbrirModalEditar(true)
    }

    function excluirFuncionario(id, nome) {
        setId(id)
        setNomeFuncionario(nome)
        setAbrirModalExcluir(true)
    }


    async function listagemFuncionarios() {
        try {
            const response = await api.get('/listagem/funcionarios', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data) {
                console.log(response);
                setLista([...response.data])
            }

        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.mensagem);
            }
            return;
        }
    }


    async function filtraCliente(pesquisa2) {
        try {
            const response = await api.get(`/buscar/funcionarios?busca=${pesquisa2}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data) {
                console.log(response.data);
                // setResultadoNaoEncontrado(false);
                setLista([...response.data])
            }
        } catch (error) {
            // setResultadoNaoEncontrado(true);
            console.log(error);
        }
    }


    useEffect(() => {
        listagemFuncionarios()
    }, [abrirModalCadastro, abrirModalEditar, abrirModalExcluir])

    console.log("aqui lista");
    console.log(lista);

    return (
        <div className='page-home'>
            <Header
                setStatusButtonMW={setStatusButtonMW}
            />

            <main onClick={() => setStatusButtonMW(false)} className='page-home-main'>
                <nav className='page-home-nav'>
                    <h1>Pesquisa avançada</h1>
                    <div className='page-home-input'>
                        <input
                            type='text'
                            name='pesquisa'
                            placeholder='Pesquise por nome, cargo ou cpf'
                            onChange={(e) => filtraCliente(e.target.value)}
                        />
                        <button onClick={() => filtraCliente("")} className='page-home-input-search'>
                            <SearchIcon sx={{ width: '100%', height: '100%', color: 'black' }} />
                        </button>
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
                        {/* <div >
                            <ul >
                                <li onClick={() => setAbrirModalDetalhar(true)} className='li-lista-left'>9077</li>
                                <li className='li-lista-rigth'>Yuri</li>
                            </ul>
                            <button onClick={() => setAbrirModalEditar(true)} className='li-lista-button'>
                                <EditIcon sx={{ color: 'rgb(32, 208, 32)', width: '80%', height: '80%' }} />
                            </button>
                            <button onClick={() => setAbrirModalExcluir(true)} className='li-lista-button'>
                                <DeleteForeverIcon sx={{ color: 'red', width: '80%', height: '80%' }} />
                            </button>
                        </div> */}
                        {lista.map((item, index) => (
                            <div className='page-home-lista-div' key={index}>
                                <ul >
                                    <li onClick={() => abrirDetalhes(index)} className='li-lista-left'>{item.id}</li>
                                    <li className='li-lista-rigth'>{item.nome}</li>
                                </ul>
                                <button onClick={() => editarFuncionario(index)} className='li-lista-button'>
                                    <EditIcon sx={{ color: 'rgb(32, 208, 32)', width: '80%', height: '80%' }} />
                                </button>
                                <button onClick={() => excluirFuncionario(item.id, item.nome)} className='li-lista-button'>
                                    <DeleteForeverIcon sx={{ color: 'red', width: '80%', height: '80%' }} />
                                </button>
                            </div>
                        ))}
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
                    setStatusConnect={setStatusConnect}
                    setStatusInfo={setStatusInfo}
                    setStatusQuiz={setStatusQuiz}
                    nomeUsuario={nomeUsuario}
                />}

            {abrirModalExcluir &&
                (<ModalExcluir
                    abrirModalExcluir={abrirModalExcluir}
                    setAbrirModalExcluir={setAbrirModalExcluir}
                    id={id}
                    nomeFuncionario={nomeFuncionario}
                />)
            }

            {abrirModalEditar && (
                <ModalEditar
                    abrirModalEditar={abrirModalEditar}
                    setAbrirModalEditar={setAbrirModalEditar}
                    lista={lista}
                    index={index}
                />
            )}

            {abrirModalDetalhar && (
                <ModalDetalhar
                    abrirModalDetalhar={abrirModalDetalhar}
                    setAbrirModalDetalhar={setAbrirModalDetalhar}
                    lista={lista}
                    index={index}
                />
            )}

        </div>

    )
}