// import './styles.css'
// import Modal from "@mui/material/Modal";

// export default function ModalFuncionarios() {
//     return (
//         <section className='modal-funcionario'>
//             <Modal
//                 open={true}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//                 className='modal-class'
//             >
//                 <div className='modal-funcionario-div'>
//                     <div>

//                     </div>
//                     <div>

//                     </div>
//                 </div>
//             </Modal>

//         </section>
//     )
// }

import "./styles.css";
import CloseIcon from '@mui/icons-material/Close'
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { IMaskInput } from "react-imask";
import toast from 'react-hot-toast';
import api from "../../services/api";
import clienteDark from '../../assets/clienteDark.svg';


export default function ModalFuncionarios({ abrirModalCadastro, setAbrirModalCadastro, setFinalizarCDCliente }) {


    const [errorNome, setErrorNome] = useState('');
    const [errorCargo, setErrorCargo] = useState('');
    const [errorCategoria, setErrorCategoria] = useState('');
    const [errorCPF, setErrorCPF] = useState('');
    const [errorTelefone, setErrorTelefone] = useState('');
    const [form, setForm] = useState({
        nome: '',
        cargo: '',
        categoria: '',
        cpf: '',
        telefone: '',
    })
    const [formCategoria, setFormCategoria] = useState({
        categorias: [], // Inicialize conforme necessário
    });

    const handleOnChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);

        setFormCategoria({
            ...formCategoria,
            categorias: selectedOptions,
        });
    };



    function handleOnchage(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrorNome('');
        setErrorCategoria('')
        setErrorCargo('')
        setErrorCPF('');
        setErrorTelefone('');
        document.querySelectorAll('input').forEach((inputElement) => {
            inputElement.style.border = '1.5px solid #7b7979a6';
        });

    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!form.nome || !form.cpf || !form.telefone) {
                return toast.error('Preencha todo os campos obrigatorios!');
            }

            if (!form.nome.trim().includes(' ')) {
                document.getElementById('nome').style.border = '1.5px solid red'
                setErrorNome('Preencha o campo Nome e sobrenome corretamente!');
                return;
            }

            if (!form.categoria.trim().includes(' ')) {
                document.getElementById('categoria').style.border = '1.5px solid red'
                setErrorNome('Escolha uma opção de Categoria corretamente!');
                return;
            }

            if (!form.cargo.trim().includes(' ')) {
                document.getElementById('cargo').style.border = '1.5px solid red'
                setErrorCargo('Preencha o campo Cargo corretamente!');
                return;
            }


            if (form.cpf && (form.cpf.replace(/[^0-9]/g, '').length !== 11)) {
                setErrorCPF('O campo CPF precisa conter 11 números!');
                document.getElementById('cpf').style.border = '1.5px solid red'
                return;
            }

            if (form.telefone && (form.telefone.replace(/[^0-9]/g, '').length !== 11)) {
                setErrorTelefone('O campo Telefone precisa conter 11 números!');
                document.getElementById('telefone').style.border = '1.5px solid red'
                return;
            }





            const response = await api.post('/cadastrar/cliente', {
                nome: form.nome,
                cpf: form.cpf.replace(/[^0-9]/g, ''),
                telefone: form.telefone.replace(/[^0-9]/g, ''),
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);

            setForm({
                nome: '',
                cpf: '',
                telefone: '',
            });
            setAbrirModalCadastro(false)
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
                open={abrirModalCadastro}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal"
            >
                <div className="borda-cliente-cc" >
                    <div className="modal-content-cliente-cc">
                        <div className="titulo-funcionario">
                            <section>
                                <img src={clienteDark} alt='cliente-dark' />
                                <h1>Cadastrar funcionario</h1>
                            </section>
                            <button type="button" onClick={() => setAbrirModalCadastro(false)}>
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
                                    placeholder="Digite seu nome"
                                    onChange={(e) => handleOnchage(e)}

                                />
                                <span style={{ marginBottom: '10px' }}>{errorNome}</span>

                                <label>Cargo*</label>
                                <input
                                    id="cargo"
                                    type="text"
                                    name="cargo"
                                    value={form.cargo}
                                    placeholder="Digite o Cargo"
                                    onChange={(e) => handleOnchage(e)}

                                />
                                <span > {errorCargo}</span>
                            </section>


                            <section className="cpf-telefone-cliente">

                                <label>CPF*</label>
                                <IMaskInput
                                    id="cpf"
                                    mask="000.000.000-00"
                                    placeholder="Digite o seu CPF"
                                    name="cpf"
                                    value={form.cpf}
                                    onChange={(e) => handleOnchage(e)}

                                />
                                <span style={{ marginBottom: '10px' }}> {errorCPF}</span>


                                <label>Telefone*</label>
                                <IMaskInput
                                    id="telefone"
                                    mask="(00) 00000-0000"
                                    placeholder="Digite o seu telefone"
                                    name="telefone"
                                    value={form.telefone}
                                    onChange={(e) => handleOnchage(e)}

                                />
                                <span style={{ marginBottom: '10px' }}>{errorTelefone}</span>

                                <label className='titulo-label'>Categorias de EPI:</label>
                                <select
                                    className='b-categorias'
                                    name="categorias"
                                    value={formCategoria.categorias}
                                    onChange={(e) => handleOnChange(e)}
                                    multiple
                                >
                                    <option value="8h">8h</option>
                                    <option value="10h">10h</option>
                                    <option value="11h">11h</option>
                                    <option value="14h">14h</option>
                                    <option value="15h">15h</option>
                                    <option value="16h">16h</option>
                                </select>

                                <span >{errorCategoria}</span>

                            </section>


                            <section className="bnts-cliente">
                                <button type='button1' onClick={() => setAbrirModalCadastro(false)} className="btn-cancelar">
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-aplicar">
                                    Aplicar
                                </button>
                            </section>
                        </form>
                    </div>
                </div>
            </Modal>
        </div >
    );
}
