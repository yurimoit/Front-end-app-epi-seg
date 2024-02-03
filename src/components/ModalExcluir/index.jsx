import "./styles.css";
import Modal from '@mui/material/Modal';
import toast from 'react-hot-toast';
import api from "../../services/api";


export default function ModalExcluir({ abrirModalExcluir, setAbrirModalExcluir, id, nomeFuncionario }) {



    async function excluirItem() {

        try {

            const response = await api.delete(`/excluir/funcionario/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data) {
                console.log(response);
                toast.success(response.data.mensagem)
            }

            setAbrirModalExcluir(false)

        } catch (error) {
            if (error.response) {
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
                    <h1>Deseja excluir permanentemente <span>{nomeFuncionario}</span>?</h1>
                    <div className="borda-excluir-button">
                        <button onClick={() => setAbrirModalExcluir(false)} style={{ backgroundColor: 'blue' }}>Não</button>
                        <button onClick={() => excluirItem()} style={{ backgroundColor: 'red' }}>Sim</button>
                    </div>
                </div>
            </Modal>
        </div >
    );
}
