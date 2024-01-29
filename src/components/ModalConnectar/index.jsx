import { useState } from 'react'
import './styles.css'

export default function ModalConnectar() {
    const [buttonStatus, setButtonStatus] = useState(true)
    const [buttonProsseguir, setButtonProsseguir] = useState(false)

    function trocarInputs() {
        setButtonStatus(!buttonStatus)
        setButtonProsseguir(false)
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
                            </form>
                            <button type='submit'>Entar</button>
                        </div>
                    </div>
                ) : (
                    <div className='connect-form'>
                        {!buttonProsseguir ? (
                            <div>
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
                                </form>
                                <button type='button' onClick={() => setButtonProsseguir(true)}>Prosseguir</button>
                            </div>
                        ) : (
                            <div>
                                <form>
                                    <h1>Cadastrar</h1>
                                    <section className='connect-input'>
                                        <label>Senha</label>
                                        <input
                                            type='password'
                                            placeholder='Digite sua senha'
                                        />
                                    </section>
                                    <section className='connect-input'>
                                        <label>Repeti senha</label>
                                        <input
                                            type='password'
                                            placeholder='Repita sua senha'
                                        />
                                    </section>
                                </form>
                                <button type='submit'>Cadastrar</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}