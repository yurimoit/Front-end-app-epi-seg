
import "./styles.css";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import toast from 'react-hot-toast';
import api from "../../services/api";
import clienteDark from '../../assets/clienteDark.svg';


export default function ModalEditar({ abrirModalEditar, setAbrirModalEditar, lista, index }) {


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
        id: -1
    })


    useEffect(() => {
        if (Array.isArray(lista) && index >= 0 && index < lista.length) {
            setForm({
                nome: lista[index].nome,
                cargo: lista[index].cargo,
                categoria: lista[index].categoria,
                cpf: lista[index].cpf,
                telefone: lista[index].telefone,
                id: lista[index].id
            });

            setFormCategoria({
                categorias: [lista[index].categoria]
            })
        }
    },
        // eslint-disable-next-line 
        [index])

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

            if (formCategoria.categorias.length < 1) {
                document.getElementById('categoria').style.border = '1.5px solid red'
                setErrorCategoria('Escolha uma opção de Categoria corretamente!');
                return;
            }

            if (!form.cargo.trim()) {
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



            const response = await api.post(`/atualizar/funcionario/${form.id}`, {
                nome: form.nome,
                cargo: form.cargo,
                cpf: form.cpf.replace(/[^0-9]/g, ''),
                telefone: form.telefone.replace(/[^0-9]/g, ''),
                categoria: formCategoria.categorias
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
                cargo: '',
                categoria: '',
                cpf: '',
                telefone: '',
                id: -1
            });
            setAbrirModalEditar(false)

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
                open={abrirModalEditar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-editar"
            >
                <div className="borda-editar-cadastro-funcionario" >
                    <div className="modal-content-editar-cadastro-funcionario">
                        <div className="titulo-funcionario-editar-cadastro-funcionario">
                            <section>
                                <img src={clienteDark} alt='cliente-dark' />
                                <h1>Editar cadastro</h1>
                            </section>
                            <button type="button" onClick={() => setAbrirModalEditar(false)}>
                                <CloseIcon sx={{ width: '100%', height: '100%' }} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="input-modal-editar-cadastro-funcionario"  >
                            <section className="input-section-editar-cadastro-funcionario">
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


                            <section className="cpf-telefone-editar-cadastro-funcionario">

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
                                    id='categoria'
                                    className='b-categorias'
                                    name="categorias"
                                    value={formCategoria.categorias}
                                    onChange={(e) => handleOnChange(e)}
                                    multiple
                                >
                                    <option value="Capacete">Capacete</option>
                                    <option value="Luva">Luva</option>
                                    <option value="Protetor Auricular">Protetor Auricular</option>
                                    <option value="Bota">Bota</option>
                                    <option value="Cinto de segurança">Cinto de segurança</option>
                                    <option value="Óculos">Óculos</option>
                                    <option value="Máscara">Máscara</option>
                                </select>

                                <span >{errorCategoria}</span>

                            </section>


                            <section className="bnts-cliente">
                                <button type='button1' onClick={() => setAbrirModalEditar(false)} className="btn-cancelar">
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
