import { useState } from 'react'
import './styles.css'

export default function ModalConnectar() {
    const [buttonStatus, setButtonStatus] = useState(true)



    return (
        <main className='connect'>
            <div className='connect-div'>
                <nav>
                    <button style={{ background: `${!buttonStatus ? '#fff' : ''}`, color: `${!buttonStatus ? 'black' : ''}` }} onClick={() => setButtonStatus(true)}>Login</button>
                    <button style={{ background: `${buttonStatus ? '#fff' : ''}`, color: `${buttonStatus ? 'black' : ''}` }} onClick={() => setButtonStatus(false)}>Cadastrar</button>
                </nav>
                {buttonStatus ? (
                    <div className='connect-form'>
                        <form>
                            <h1>Login</h1>
                            <section className='connect-input'>
                                <label>E-mail</label>
                                <input
                                    type='text'
                                    placeholder='Digite seu E-mail'
                                />
                            </section>
                            <section className='connect-input'>
                                <label>Senha</label>
                                <input
                                    type='password'
                                    placeholder='Digite sua senha'
                                />
                            </section>
                            <button type='submit'>Entar</button>
                        </form>
                    </div>
                ) : (
                    <div className='connect-form'>
                        <form>
                            <h1>Cadastrar</h1>
                            <section className='connect-input'>
                                <label>Nome</label>
                                <input
                                    type='text'
                                    placeholder='Digite seu Nome'
                                />
                            </section>
                            <section className='connect-input'>
                                <label>E-mail</label>
                                <input
                                    type='text'
                                    placeholder='Digite seu E-mail'
                                />
                            </section>
                            <button type='submit'>Prosseguir</button>
                        </form>
                    </div>
                )}
            </div>
        </main>
    )
}