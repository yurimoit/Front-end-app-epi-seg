import { useEffect, useState } from 'react';
import './styles.css';




export default function ModalQuiz() {
    const [iniciaPegunta, setIniciaPergunta] = useState(false)
    const [tempo, setTempo] = useState(0)
    const [match, setMatch] = useState(0)
    const [contador, setContador] = useState(0)
    const [primeira, setPrimeira] = useState('')
    const [segunda, setSegunda] = useState('')
    const [terceira, setTerceira] = useState('')
    const [quarta, setQuarta] = useState('')
    const [marcada, setMarcada] = useState(0)
    const [finalizaPergunta, setFinalizaPergunta] = useState(false)
    const [tempoAcabou, setTempoAcabou] = useState(false)
    const [porcentagemBarraProgresso, setPorcentagemBarraProgresso] = useState(9.6)
    const [numeroporcentagemBarraProgresso, setNumeroPorcentagemBarraProgresso] = useState(10)
    const [terminoulQuiz, setTerminoulQuiz] = useState(false)

    const arrayPerguntas = [{
        pergunta: '1°. O que é equipamento de proteção individual (EPI)?',
        primeira_r: 'Equipamento de proteção individual',
        segunda_r: 'Equipamento de proteção inspecionada',
        terceira_r: 'Equipamento de proteção infalível',
        quarta_r: 'Equipamento de proteção coletiva',
        resposta: 1
    }, {
        pergunta: '2°. O equipamento de proteção individual (EPI) previne a ocorrência de acidente?',
        primeira_r: 'Sim',
        segunda_r: 'Não',
        terceira_r: 'Às vezes',
        quarta_r: 'Muitas vezes',
        resposta: 2
    },
    {
        pergunta: '3°. Quem fiscaliza a distribuição de EPIs de acordo com os riscos?',
        primeira_r: 'Órgão do trabalhador',
        segunda_r: 'Pelo SESMT ou órgão fiscalizadores',
        terceira_r: 'Pela empresa',
        quarta_r: 'Pela empresa',
        resposta: 2
    },
    {
        pergunta: '4°. O equipamento de proteção individual (EPI) precisa estar sempre?',
        primeira_r: 'Desgastado',
        segunda_r: 'Bonito',
        terceira_r: 'Lavado',
        quarta_r: 'Em boas condições de uso',
        resposta: 4
    },
    {
        pergunta: '5°. Qual NR especifica o uso de EPI?',
        primeira_r: 'NR 01',
        segunda_r: 'NR 06',
        terceira_r: 'NR 35',
        quarta_r: 'NR 17',
        resposta: 2
    },
    {
        pergunta: '6°. Quais as opções abaixo não é um equipamento de proteção individual (EPI)?',
        primeira_r: 'Luva',
        segunda_r: 'Capacete de proteção',
        terceira_r: 'Óculos de proteção',
        quarta_r: 'Protetor solar',
        resposta: 4
    },
    {
        pergunta: '7°. Quantos tipos de equipamento de proteção individual (EPI) existem?',
        primeira_r: '04',
        segunda_r: '05',
        terceira_r: '07',
        quarta_r: '08',
        resposta: 3
    },
    {
        pergunta: '8°. Qual o equipamento de proteção individual mais importante?',
        primeira_r: 'Luva',
        segunda_r: 'óculos',
        terceira_r: 'Bota',
        quarta_r: 'Capacete de proteção',
        resposta: 4
    },
    {
        pergunta: '9°. Para que serve os equipamentos de proteção?',
        primeira_r: 'Proteger os trabalhadores de acidentes',
        segunda_r: 'Atrapalhar os trabalhadores',
        terceira_r: 'Ajudar a criar acidentes',
        quarta_r: 'Para combinar com a roupa',
        resposta: 1
    }]

    function cronometro() {
        if (tempo < 30) {
            setTimeout(() => {
                setTempo(tempo + 1)
            }, 1000)
        }

        if (tempo === 30) {
            setTempoAcabou(true)

            setTimeout(() => {
                setFinalizaPergunta(true)
            }, 500)
        }
    }

    function questaoMarcada(n) {
        if (n === 1) {
            setMarcada(n)
            if (n === arrayPerguntas[contador].resposta) {
                setMatch(match + 1)
                setPrimeira('green')
            } else {
                setPrimeira('red')
            }
        } else if (n === 2) {
            setMarcada(n)
            if (n === arrayPerguntas[contador].resposta) {
                setMatch(match + 1)
                setSegunda('green')
            } else {
                setSegunda('red')
            }
        } else if (n === 3) {
            setMarcada(n)
            if (n === arrayPerguntas[contador].resposta) {
                setMatch(match + 1)
                setTerceira('green')
            } else {
                setTerceira('red')
            }
        } else if (n === 4) {
            setMarcada(n)
            if (n === arrayPerguntas[contador].resposta) {
                setMatch(match + 1)
                setQuarta('green')
            } else {
                setQuarta('red')
            }
        }

        if (contador === 8) {
            setTimeout(() => {
                setFinalizaPergunta(true)
            }, 500)
            setTimeout(() => {
                setTerminoulQuiz(true)
            }, 1100)
            setTimeout(() => {
                setIniciaPergunta(false)
                setPorcentagemBarraProgresso(9.6)
                setNumeroPorcentagemBarraProgresso(10)
                setPrimeira('')
                setSegunda('')
                setTerceira('')
                setQuarta('')
                setMarcada(0)
                setContador(0)
                setTerminoulQuiz(false)
                setMatch(0)
            }, 3300)

        } else {
            setTimeout(() => {
                setFinalizaPergunta(true)
            }, 500)
        }


    }

    console.log("primeira:");
    console.log(primeira);
    console.log("Segunda:");
    console.log(segunda);
    console.log("Terceira:");
    console.log(terceira);
    console.log("Quarta:");
    console.log(quarta);
    console.log("Contador:");
    console.log(contador);

    useEffect(() => {
        setPrimeira(primeira)
        setSegunda(segunda)
        setTerceira(terceira)
        setQuarta(quarta)

        if (finalizaPergunta) {
            setTimeout(() => {
                setTempoAcabou(false)
                setPrimeira('')
                setSegunda('')
                setTerceira('')
                setQuarta('')
                setMarcada(0)
                if (contador < 8 && iniciaPegunta === true) {
                    setContador(contador + 1)
                    setPorcentagemBarraProgresso(porcentagemBarraProgresso + 9.6)
                    setNumeroPorcentagemBarraProgresso(numeroporcentagemBarraProgresso + 10)
                }
                setFinalizaPergunta(false)
                setTempo(0)
            }, 2800)
        }


    }, [primeira, segunda, terceira, quarta, marcada, match, contador, finalizaPergunta, tempoAcabou, porcentagemBarraProgresso, numeroporcentagemBarraProgresso, iniciaPegunta])




    useEffect(() => {
        if (iniciaPegunta && !finalizaPergunta) {
            cronometro()
        } else if (finalizaPergunta) {
            setTempo(0)

        }
    },
        // eslint-disable-next-line 
        [iniciaPegunta, tempo, finalizaPergunta])

    return (
        <div className='quiz'>
            {iniciaPegunta ? (
                <div className='quiz-div1'>
                    <div className='pergunta'>
                        <h1>{tempo}</h1>
                        <div>
                            <h1>{arrayPerguntas[contador].pergunta}</h1>
                        </div>
                    </div>
                    <div className='opcoes'>
                        {!finalizaPergunta ? (
                            <>
                                <ul>
                                    <li style={{ backgroundColor: `${primeira}` }} onClick={() => questaoMarcada(1)}>{arrayPerguntas[contador].primeira_r}</li>
                                    <li style={{ backgroundColor: `${segunda}` }} onClick={() => questaoMarcada(2)}>{arrayPerguntas[contador].segunda_r}</li>
                                    <li style={{ backgroundColor: `${terceira}` }} onClick={() => questaoMarcada(3)}>{arrayPerguntas[contador].terceira_r}</li>
                                    <li style={{ backgroundColor: `${quarta}` }} onClick={() => questaoMarcada(4)}>{arrayPerguntas[contador].quarta_r}</li>
                                </ul>
                                <div >
                                    <div className='progresso-div'>
                                        <section style={{ width: `${porcentagemBarraProgresso}%` }} className='barra-de-progresso'></section>
                                    </div>
                                    <h1>{numeroporcentagemBarraProgresso}%</h1>
                                </div>
                            </>
                        ) : (
                            <div className='status-desempenho'>
                                {!terminoulQuiz ? (
                                    !tempoAcabou ? (
                                        <h1 style={{ color: `${marcada === arrayPerguntas[contador].resposta ? '#235608' : 'red'}` }}>{marcada === arrayPerguntas[contador].resposta ? 'Você acertou' : "Você errou"}</h1>
                                    ) : (
                                        <h1 style={{ color: 'red' }}>O tempo acabou!!!</h1>
                                    )
                                ) : (
                                    <>
                                        {match < 5 ? (<h1 style={{ color: 'red' }}>Tente novamente!!!</h1>) : (<h1 style={{ color: '#235608' }}>Parabéns</h1>)}
                                        <h1 style={{ color: `${match < 5 ? 'red' : '#235608'}` }}>{match} acertos</h1>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='tela-inicial-quiz'>
                    <div>
                        <h1>Quiz</h1>
                        <button onClick={() => setIniciaPergunta(true)}>inicia</button>
                        <h2>10 perguntas</h2>
                    </div>
                </div>
            )}
        </div>
    )
}