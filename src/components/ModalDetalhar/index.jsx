import "./styles.css";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import clienteDark from '../../assets/clienteDark.svg';


export default function ModalDetalhar({ abrirModalDetalhar, setAbrirModalDetalhar, lista, index }) {


    const [form, setForm] = useState({
        nome: 'xxxx',
        cargo: 'xxxx',
        categoria: [''],
        cpf: '00000000000',
        telefone: '00000000000',
    })

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    useEffect(() => {
        if (Array.isArray(lista) && index >= 0 && index < lista.length) {
            setForm({
                nome: lista[index].nome,
                cargo: lista[index].cargo,
                categoria: lista[index].categoria,
                cpf: lista[index].cpf,
                telefone: lista[index].telefone,
            });
        }
    },
        // eslint-disable-next-line 
        [index])



    return (
        <div>
            <Modal
                open={abrirModalDetalhar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-editar"
            >
                <div className="borda-cliente-cc" >
                    <div className="modal-funcionario-detalhar">
                        <div className="titulo-funcionario">
                            <section>
                                <img src={clienteDark} alt='cliente-dark' />
                                <h1>Informações de cadastro</h1>
                            </section>
                            <button type="button" onClick={() => setAbrirModalDetalhar(false)}>
                                <CloseIcon sx={{ width: '100%', height: '100%' }} />
                            </button>
                        </div>

                        <form className="input-modal-detalhar"  >
                            <section className="input-detalhar">
                                <div className="input-detalhar-div">
                                    <h1>Nome e sobrenome</h1>
                                    <h2>{capitalize(form.nome)}</h2>
                                </div>

                                <div className="input-detalhar-div">
                                    <h1>Cargo</h1>
                                    <h2>{capitalize(form.cargo)}</h2>
                                </div>

                                <div className="input-detalhar-div">
                                    <h1>CPF</h1>
                                    <h2>{form.cpf.slice(0, 3) +
                                        "." +
                                        form.cpf.slice(3, 6) +
                                        "." +
                                        form.cpf.slice(6, 9) +
                                        "-" +
                                        form.cpf.slice(9)}</h2>
                                </div>

                                <div className="input-detalhar-div">
                                    <h1>Telefone</h1>
                                    <h2>{"(" +
                                        form.telefone.slice(0, 2) +
                                        ") " +
                                        form.telefone.slice(2, 7) +
                                        "-" +
                                        form.telefone.slice(7)}</h2>
                                </div>
                            </section>


                            <section className="cpf-telefone-cliente">
                                <h1>EPIs :</h1>
                                {form.categoria.map((item, index) => (
                                    <ul key={index}>
                                        <li>{capitalize(item)}</li>
                                    </ul>
                                ))}
                            </section>

                        </form>
                    </div>
                </div>

            </Modal>
        </div >
    );
}
