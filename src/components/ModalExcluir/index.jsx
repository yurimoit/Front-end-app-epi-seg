
import "./styles.css";
import Modal from '@mui/material/Modal';
import toast from 'react-hot-toast';
import api from "../../services/api";


export default function ModalExcluir({ abrirModalExcluir, setAbrirModalExcluir, setFinalizarCDCliente }) {



    async function excluirItem() {

        try {

            const response = await api.post('/cadastrar/cliente', {

            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);
            setAbrirModalExcluir(false)
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
                open={abrirModalExcluir}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-excluir"
            >
                <div className="borda-excluir" >
                    <h1>Deseja excluir permanentemente</h1>
                    <div className="borda-excluir-button">
                        <button onClick={() => setAbrirModalExcluir(false)} style={{ backgroundColor: 'blue' }}>Não</button>
                        <button onClick={() => excluirItem()} style={{ backgroundColor: 'red' }}>Sim</button>
                    </div>
                </div>
            </Modal>
        </div >
    );
}
