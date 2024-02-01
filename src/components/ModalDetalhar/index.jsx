
import "./styles.css";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import toast from 'react-hot-toast';
import api from "../../services/api";
import clienteDark from '../../assets/clienteDark.svg';


export default function ModalDetalhar({ abrirModalDetalhar, setAbrirModalDetalhar, setFinalizarCDCliente }) {


    const [form, setForm] = useState({
        nome: '',
        cargo: '',
        categoria: '',
        cpf: '',
        telefone: '',
    })



    setForm()



    async function handleSubmit(e) {
        e.preventDefault();

        try {

            const response = await api.post('/cadastrar/cliente', {
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);


            setAbrirModalDetalhar(false)
            setFinalizarCDCliente(true);

        } catch (error) {
            if (error.response.data.mensagem) {
                toast.error(error.response.data.mensagem);
            }
            return;
        }
    }



    return (
        <div>
            <Modal
                open={abrirModalDetalhar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-editar"
            >
                <div className="borda-cliente-cc" >
                    <div className="modal-content-cliente-cc">
                        <div className="titulo-funcionario">
                            <section>
                                <img src={clienteDark} alt='cliente-dark' />
                                <h1>Editar cadastro</h1>
                            </section>
                            <button type="button" onClick={() => setAbrirModalDetalhar(false)}>
                                <CloseIcon sx={{ width: '100%', height: '100%' }} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="input-modal-funcionario"  >
                            <section className="input-section-funcionario">
                                <label>Nome e sobrenome*</label>
                                <input
                                    id="nome"
                                    type="text"
                                    name="nome"
                                    value={form.nome}

                                />
                                <span style={{ marginBottom: '10px' }}></span>

                                <label>Cargo*</label>
                                <input
                                    id="cargo"
                                    type="text"
                                    name="cargo"
                                    value={form.cargo}

                                />
                            </section>


                            <section className="cpf-telefone-cliente">

                                <label>CPF*</label>
                                <input
                                    id="cpf"
                                    name="cpf"
                                    value={form.cpf}

                                />
                                <span style={{ marginBottom: '10px' }}></span>


                                <label>Telefone*</label>
                                <input
                                    id="telefone"
                                    name="telefone"
                                    value={form.telefone}

                                />
                                <span style={{ marginBottom: '10px' }}></span>

                                <label className='titulo-label'>Categorias de EPI:</label>

                                <textarea></textarea>


                            </section>

                        </form>
                    </div>
                </div>

            </Modal>
        </div >
    );
}
