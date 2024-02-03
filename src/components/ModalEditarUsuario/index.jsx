import "./styles.css";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import toast from 'react-hot-toast';
import api from "../../services/api";
import clienteDark from '../../assets/clienteDark.svg';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


export default function ModalEditarUsuario({ abrirModalEditarUsuario, setAbrirModalEditarUsuario, formUsuario }) {


    const [errorNome, setErrorNome] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorSenha, setErrorSenha] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('')
    const [errorCPF, setErrorCPF] = useState('');
    const [statusVisibilidadeR2, setStatusVisibilidadeR2] = useState(false);
    const [statusVisibilidadeL, setStatusVisibilidadeL] = useState(false);
    const [errorTelefone, setErrorTelefone] = useState('');

    const [form, setForm] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        senha: '',
    })


    useEffect(() => {
        if (formUsuario) {
            setForm({
                nome: formUsuario.nome,
                email: formUsuario.email,
                cpf: formUsuario.cpf,
                telefone: formUsuario.telefone,
            });

        }
    },
        // eslint-disable-next-line 
        [formUsuario])





    function handleOnchage(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrorNome('');
        setErrorSenha('')
        setErrorEmail('')
        setErrorCPF('');
        setErrorTelefone('');
        document.querySelectorAll('input').forEach((inputElement) => {
            inputElement.style.border = '1.5px solid #7b7979a6';
        });

    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!form.nome || !form.email || !form.telefone || !form.cpf) {
                return toast.error('Preencha todo os campos obrigatorios!');
            }

            if (!form.nome.trim().includes(' ')) {
                document.getElementById('nome').style.border = '1.5px solid red'
                setErrorNome('Preencha o campo Nome e sobrenome corretamente!');
                return;
            }

            if (senhaRepetida || form.senha) {
                if (form.senha !== senhaRepetida) {
                    document.getElementById('senha').style.border = '1.5px solid red'
                    document.getElementById('senha1').style.border = '1.5px solid red'
                    setErrorSenha('As senhas são diferentes!');
                    return;
                }

                if (form.senha.length < 8 && senhaRepetida.length < 8) {
                    document.getElementById('senha').style.border = '1.5px solid red'
                    document.getElementById('senha1').style.border = '1.5px solid red'
                    setErrorSenha('As senhas precisam de no minino 8 digitos!');
                    return;
                }
            }

            if (!form.email.includes('@') || !form.email.includes('.com')) {
                document.getElementById('email').style.border = '1.5px solid red'
                setErrorEmail('Preencha o campo Cargo corretamente!');
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



            const response = await api.post(`/atualizar/usuario`, {
                nome: form.nome,
                email: form.email,
                cpf: form.cpf.replace(/[^0-9]/g, ''),
                telefone: form.telefone.replace(/[^0-9]/g, ''),
                novaSenha: form.senha
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });



            if (response.data) {
                console.log(response);
                toast.success(response.data.mensagem)
            }

            setForm({
                nome: '',
                email: '',
                senha: '',
                cpf: '',
                telefone: '',
            });

            setAbrirModalEditarUsuario(false)

        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.mensagem);
            }
            return;
        }
    }



    return (
        <div>
            <Modal
                open={abrirModalEditarUsuario}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-editar"
            >
                <div className="borda-usuario-editar" >
                    <div className="modal-content-cliente-cc">
                        <div className="titulo-funcionario">
                            <section>
                                <img src={clienteDark} alt='cliente-dark' />
                                <h1>Editar cadastro</h1>
                            </section>
                            <button type="button" onClick={() => setAbrirModalEditarUsuario(false)}>
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

                                <label>Email*</label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    placeholder="Digite seu E-mail"
                                    onChange={(e) => handleOnchage(e)}

                                />
                                <span > {errorEmail}</span>
                            </section>


                            <section className="cpf-telefone-editar-funcionario">

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

                            </section>

                            <section className="section-usuario-senhas">
                                <label className='title-label-usuario-editar'>Senha</label>
                                <section className='connect-input-usuario-editar'>
                                    <input
                                        type={!statusVisibilidadeR2 ? 'password' : 'text'}
                                        id='senha1'
                                        name='senha'
                                        placeholder="Digite sua senha"
                                        value={form.senha}
                                        onChange={(e) => handleOnchage(e)}
                                    />
                                    <button className='button-v' onClick={() => setStatusVisibilidadeR2(!statusVisibilidadeR2)} type='button'>
                                        {!statusVisibilidadeR2 ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
                                    </button>
                                </section>
                                <label className='title-label-usuario-editar'>Repeti senha</label>
                                <section className='connect-input-usuario-editar'>
                                    <input
                                        type={!statusVisibilidadeL ? 'password' : 'text'}
                                        id='senha'
                                        placeholder="Repita sua senha"
                                        value={senhaRepetida}
                                        onChange={(e) => setSenhaRepetida(e.target.value)}
                                    />
                                    <button className='button-v' onClick={() => setStatusVisibilidadeL(!statusVisibilidadeL)} type='button'>
                                        {!statusVisibilidadeL ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
                                    </button>
                                </section>
                                <span className='mensagem-error'>{errorSenha}</span>
                            </section>


                            <section className="bnts-cliente">
                                <button type='button1' onClick={() => setAbrirModalEditarUsuario(false)} className="btn-cancelar">
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-aplicar">
                                    Salvar alterações
                                </button>
                            </section>
                        </form>
                    </div>
                </div>

            </Modal>
        </div >
    );
}
