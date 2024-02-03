import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ModalWindows from '../../components/ModalWindows';
import './styles.css';
import api from '../../services/api';
import toast from 'react-hot-toast';
import ModalEditarUsuario from '../../components/ModalEditarUsuario';
import ModalExcluirUsuario from '../../components/ModalExcluirUsuario';

function UsuarioRegister({ statusButtonMW, setStatusButtonMW, statusConnect, setStatusConnect, statusInfo, setStatusInfo, statusQuiz, setStatusQuiz }) {

  const [abrirModalEditarUsuario, setAbrirModalEditarUsuario] = useState(false)
  const [abrirModalExcluirUsuario, setAbrirModalExcluirUsuario] = useState(false)

  const [form, setForm] = useState({
    nome: 'xxxx',
    email: 'xxxx',
    cpf: '00000000000',
    telefone: '00000000000',
  })

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }


  async function buscarDadosUsuario() {
    try {
      const response = await api.get('buscar/usuario', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.data) {
        console.log(response);
        setForm({
          nome: response.data.nome,
          email: response.data.email,
          cpf: `${response.data.cpf ? response.data.cpf : '00000000000'}`,
          telefone: `${response.data.telefone ? response.data.telefone : '00000000000'}`,
        })
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.mensagem);
      }
      return;
    }
  }


  useEffect(() => {
    buscarDadosUsuario()
  }, [abrirModalEditarUsuario])

  return (
    <div className="register">

      <Header
        setStatusButtonMW={setStatusButtonMW}
      />

      <main onClick={() => setStatusButtonMW(false)} className='register-main'>
        <div className='registro-div'>
          <section className='registro-title'>
            <h1>Informações cadastrais</h1>
          </section>
          <section className="registro-informacoes">
            <div className="input-informacoes">
              <h1>Nome e sobrenome</h1>
              <h2>{capitalize(form.nome)}</h2>
            </div>

            <div className="input-informacoes">
              <h1>E-mail</h1>
              <h2>{form.email}</h2>
            </div>

            <div className="input-informacoes">
              <h1>CPF</h1>
              <h2>{form.cpf.slice(0, 3) +
                "." +
                form.cpf.slice(3, 6) +
                "." +
                form.cpf.slice(6, 9) +
                "-" +
                form.cpf.slice(9)}</h2>
            </div>

            <div className="input-informacoes">
              <h1>Telefone</h1>
              <h2>{"(" +
                form.telefone.slice(0, 2) +
                ") " +
                form.telefone.slice(2, 7) +
                "-" +
                form.telefone.slice(7)}</h2>
            </div>
          </section>
          <section className='registro-buttons'>
            <button onClick={() => setAbrirModalEditarUsuario(true)} style={{ backgroundColor: '#20ba20' }}>Editar informações</button>
            <button onClick={() => setAbrirModalExcluirUsuario(true)} style={{ backgroundColor: 'red' }}>Excluir conta</button>
          </section>
        </div>
      </main>

      {abrirModalEditarUsuario && <ModalEditarUsuario
        abrirModalEditarUsuario={abrirModalEditarUsuario}
        setAbrirModalEditarUsuario={setAbrirModalEditarUsuario}
        formUsuario={form}
      />}

      {abrirModalExcluirUsuario && <ModalExcluirUsuario
        abrirModalExcluirUsuario={abrirModalExcluirUsuario}
        setAbrirModalExcluirUsuario={setAbrirModalExcluirUsuario}
      />}

      <Footer />

      {statusButtonMW &&
        <ModalWindows
          setStatusButtonMW={setStatusButtonMW}
          setStatusConnect={setStatusConnect}
          setStatusInfo={setStatusInfo}
          setStatusQuiz={setStatusQuiz}
        />}
    </div>
  );
}

export default UsuarioRegister;
