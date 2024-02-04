import "./styles.css";
import Modal from '@mui/material/Modal';
import toast from 'react-hot-toast';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useState } from "react";


export default function ModalExcluirUsuario({ abrirModalExcluirUsuario, setAbrirModalExcluirUsuario }) {
    const navigate = useNavigate();
    const [statusVisibilidadeR, setStatusVisibilidadeR] = useState(false);
    const [senha, setSenha] = useState('')
    const [mensagemError, setMensagemError] = useState('')

    async function excluirItem() {

        try {

            if (!senha) {
                setMensagemError('O campo senha é obrigatorio!')
            }

            const response = await api.delete(`/excluir/usuario?senha=${senha}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data) {
                console.log(response);
                toast.success(response.data.mensagem)
            }

            setAbrirModalExcluirUsuario(false)
            localStorage.removeItem('token')
            navigate('/')


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
                open={abrirModalExcluirUsuario}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-excluir-usuario"
            >
                <div className="borda-excluir-usuario" >
                    <h1>Deseja excluir permanentemente?</h1>
                    <div className="borda-excluir-button-usuario">
                        <div className="excluir-usuario-input">
                            <label className="title-label-excluir-usuario">Senha: </label>
                            <section className='connect-input-excluir-usuario'>
                                <input
                                    type={!statusVisibilidadeR ? 'password' : 'text'}
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <button id='btn-v-excluir-usuario' onClick={() => setStatusVisibilidadeR(!statusVisibilidadeR)} type='button'>
                                    {!statusVisibilidadeR ? <VisibilityOffOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} /> : <RemoveRedEyeOutlinedIcon sx={{ width: '20px', height: '20px', color: '#747488' }} />}
                                </button>
                            </section>
                            <span>{mensagemError}</span>
                        </div>
                        <div className="excluir-usuario-buttons">
                            <button onClick={() => setAbrirModalExcluirUsuario(false)} style={{ backgroundColor: 'blue' }}>Não</button>
                            <button onClick={() => excluirItem()} style={{ backgroundColor: 'red' }}>Sim</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div >
    );
}
