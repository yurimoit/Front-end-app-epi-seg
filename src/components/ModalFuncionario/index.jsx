
import "./styles.css";
import CloseIcon from '@mui/icons-material/Close'
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { IMaskInput } from "react-imask";
import toast from 'react-hot-toast';
import api from "../../services/api";
import clienteDark from '../../assets/clienteDark.svg';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
// import { MultiSelect } from 'primereact/multiselect';


export default function ModalFuncionarios({ abrirModalCadastro, setAbrirModalCadastro, setFinalizarCDCliente }) {


    const [errorNome, setErrorNome] = useState('');
    const [errorCargo, setErrorCargo] = useState('');
    const [errorCategoria, setErrorCategoria] = useState('');
    const [errorCPF, setErrorCPF] = useState('');
    const [errorTelefone, setErrorTelefone] = useState('');
    const [form, setForm] = useState({
        nome: '',
        cargo: '',
        cpf: '',
        telefone: '',
    })
    const [formCategoria, setFormCategoria] = useState([]);


    const animatedComponents = makeAnimated()
    const cities = [
        { value: "Capacete", label: "Capacete" },
        { value: "Luva", label: "Luva" },
        { value: "Protetor Auricular", label: "Protetor Auricular" },
        { value: "Bota", label: "Bota" },
        { value: "Cinto de segurança", label: "Cinto de segurança" },
        { value: "Óculos", label: "Óculos" },
        { value: "Máscara", label: "Máscara" },
        { value: "Outros", label: "Outros" } // Corrigido para "Foi"
    ];



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

            if (formCategoria.length < 1) {
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





            const response = await api.post('/cadastrar/funcionario', {
                nome: form.nome,
                cargo: form.cargo,
                cpf: form.cpf.replace(/[^0-9]/g, ''),
                telefone: form.telefone.replace(/[^0-9]/g, ''),
                categoria: formCategoria.map((item) => {
                    return item.value
                })
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
            if (response.data) {
                toast.success(response.data.mensagem)
            }

        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.mensagem);
            }
            return;
        }
    }

    console.log();

    return (
        <div>
            <Modal
                open={abrirModalCadastro}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-cadastra-funcionario"
            >
                <div className="borda--cadastra-funcionario" >
                    <div className="modal-content-cadastra-funcionario">
                        <div className="titulo-funcionario">
                            <section>
                                <img src={clienteDark} alt='cliente-dark' />
                                <h1>Cadastrar funcionario</h1>
                            </section>
                            <button type="button" onClick={() => setAbrirModalCadastro(false)}>
                                <CloseIcon sx={{ width: '100%', height: '100%' }} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="input-modal-cadastra-funcionario"  >
                            <section className="input-section-cadastra-funcionario">
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


                            <section className="cpf-telefone-cadastrar-funcionario">

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
                                <Select
                                    components={animatedComponents}
                                    className="select"
                                    isMulti
                                    options={cities}
                                    onChange={(e) => setFormCategoria(e)}
                                    isClearable={true}
                                    isSearchable={false}
                                    isDisabled={false}
                                    isLoading={true}
                                    isRtl={false}
                                    closeMenuOnSelect={false}
                                />
                                <span >{errorCategoria}</span>

                            </section>


                            <section className="bnts-cliente-cadastra-funcionario">
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
