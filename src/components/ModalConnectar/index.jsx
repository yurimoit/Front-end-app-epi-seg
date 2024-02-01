import { useState } from 'react'
import './styles.css'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

export default function ModalConnectar() {
    const [buttonStatus, setButtonStatus] = useState(true)
    const [buttonProsseguir, setButtonProsseguir] = useState(false)
    const navigate2 = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [messagemError, setMessagemError] = useState('');
    const [statusVisibilidadeR, setStatusVisibilidadeR] = useState(false);
    const [statusVisibilidadeR2, setStatusVisibilidadeR2] = useState(false);
    const [statusVisibilidadeL, setStatusVisibilidadeL] = useState(false);
    const [repetirSenha, setrepetirSenha] = useState('');


    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    function verificaProgresso() {

        if (!form.email || !form.nome) {
            return setMessagemError('Preencha os campos acima!!');
        }

        return setButtonProsseguir(true)
    }

    async function handleSubmitCadastro() {

        if (!form.senha || !repetirSenha) {
            return setMessagemError('Preencha os campos acima!!');
        }

        if (form.senha.length < 8 || repetirSenha.length < 8) {
            return setMessagemError('A senha precisa de no mínimo 8 digitos!!');
        }


        if (form.senha !== repetirSenha) {
            return setMessagemError('As precisam se iguais!!!')
        }


        if (verificaProgresso) {
            try {
                const cadastro = await api.post('/cadastrar/usuario', {
                    ...form
                });

                console.log(cadastro);
                setForm({
                    nome: '',
                    email: '',
                    senha: ''
                })

                toast.success('Seu cadastro foi efetuafo')
                setMessagemError('')
                setButtonStatus(!buttonStatus)
                setButtonProsseguir(false)

            } catch (error) {
                setButtonProsseguir(false)
                toast.error(error.response.data.mensagem)
                return console.log(error);
            }
        }

    }


    function handleOnchange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    function trocarInputs() {
        setButtonStatus(!buttonStatus)
        setButtonProsseguir(false)
    }

    async function handleSubmitLogin(e) {
        // e.preventDefault();

        if (!senha || !email) {
            return setMessagemError('Preencha os campos acima!!');
        }
        if (!email.includes('@') || !email.includes('.com')) {
            return setMessagemError('Preencha o campo de e-mail corretamente!');
        }

        try {
            const response = await api.post('/login', {
                email, senha
            });


            setEmail('');
            setSenha('');

            if (response.data) {
                console.log(response.data);

                const token = response.data.token;
                localStorage.setItem('token', token);

                const usuario = JSON.stringify(response.data.usuario);
                localStorage.setItem('usuario', usuario);

            }

            toast.success("Acesso permitido com sucesso!");
            navigate2('/home')
            setMessagemError('')


        } catch (error) {
            if (error.response.data.mensagem) {
                toast.error(error.response.data.mensagem);
            }
            return;
        }
    }

    return (
        <main className='connect'>
            <div className='connect-div'>
                <nav>
                    <button style={{ background: `${!buttonStatus ? '#fff' : ''}`, color: `${!buttonStatus ? 'black' : ''}` }} onClick={() => trocarInputs()}>Login</button>
                    <button style={{ background: `${buttonStatus ? '#fff' : ''}`, color: `${buttonStatus ? 'black' : ''}` }} onClick={() => trocarInputs()}>Cadastrar</button>
                </nav>
                {buttonStatus ? (
                    <div className='connect-form'>
                        <div>
                            <h1>Login</h1>
                            <form>

                                <label className='title-label'>E-mail</label>
                                <section className='connect-input'>
                                    <input
                                        type='text'
                                        value={email}
                                        placeholder='Digite seu E-mail'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </section>

                                <label className='title-label'>Senha</label>
                                <section className='connect-input'>
                                    <input
                                        type={!statusVisibilidadeR ? 'password' : 'text'}
                                        placeholder="Digite sua senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                    <button id='btn-v' onClick={() => setStatusVisibilidadeR(!statusVisibilidadeR)} type='button'>
                                        {!statusVisibilidadeR ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
                                    </button>
                                </section>
                                <span className='mensagem-error'>{messagemError}</span>
                            </form>
                            <button onClick={() => handleSubmitLogin()} className='button-confirm' type='submit'>Entar</button>
                        </div>
                    </div>
                ) : (
                    <div className='connect-form'>
                        {!buttonProsseguir ? (
                            <div>
                                <h1>Cadastrar</h1>
                                <form>
                                    <label className='title-label'>Nome</label>
                                    <section className='connect-input'>
                                        <input
                                            type='text'
                                            name='nome'
                                            placeholder="Digite seu Nome"
                                            value={form.nome}
                                            onChange={(e) => handleOnchange(e)}
                                        />
                                    </section>
                                    <label className='title-label'>E-mail</label>
                                    <section className='connect-input'>
                                        <input
                                            type='text'
                                            name='email'
                                            placeholder="Digite seu E-mail"
                                            value={form.email}
                                            onChange={(e) => handleOnchange(e)}
                                        />
                                    </section>
                                    <span className='mensagem-error'>{messagemError}</span>
                                </form>
                                <button onClick={() => verificaProgresso()} className='button-confirm' type='button' >Prosseguir</button>
                            </div>
                        ) : (
                            <div>
                                <h1>Cadastrar</h1>
                                <form>
                                    <label className='title-label'>Senha</label>
                                    <section className='connect-input'>
                                        <input
                                            type={!statusVisibilidadeR2 ? 'password' : 'text'}
                                            name='senha'
                                            placeholder="Digite sua senha"
                                            value={form.senha}
                                            onChange={(e) => handleOnchange(e)}
                                        />
                                        <button className='button-v' onClick={() => setStatusVisibilidadeR2(!statusVisibilidadeR2)} type='button'>
                                            {!statusVisibilidadeR2 ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
                                        </button>
                                    </section>
                                    <label className='title-label'>Repeti senha</label>
                                    <section className='connect-input'>
                                        <input
                                            type={!statusVisibilidadeL ? 'password' : 'text'}
                                            placeholder="Digite sua senha"
                                            value={repetirSenha}
                                            onChange={(e) => setrepetirSenha(e.target.value)}
                                        />
                                        <button className='button-v' onClick={() => setStatusVisibilidadeL(!statusVisibilidadeL)} type='button'>
                                            {!statusVisibilidadeL ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
                                        </button>
                                    </section>
                                    <span className='mensagem-error'>{messagemError}</span>
                                </form>
                                <button onClick={() => handleSubmitCadastro()} className='button-confirm' type='submit'>Cadastrar</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}