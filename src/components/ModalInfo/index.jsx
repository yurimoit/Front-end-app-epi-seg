import './styles.css'
import fotoTema1 from '../../assets/tema1.jpeg'
import fotoTema2 from '../../assets/tema2.jpeg'
import fotoTema3 from '../../assets/tema3.jpeg'
import fotoTema4 from '../../assets/tema4.jpeg'
import fotoTema5 from '../../assets/tema5.jpeg'

export default function ModalInfo() {
    const arrayTextos = [
        {
            foto: `${fotoTema1}`,
            tema: 'O Papel do EPI na Segurança do Trabalhador',
            texto: 'Os Equipamentos de Proteção Individual (EPIs) são cruciais para garantir a segurança dos trabalhadores, protegendo-os contra riscos específicos, como substâncias tóxicas ou impactos. Sua utilização é fundamental para preservar a saúde e a integridade física dos profissionais em variados ambientes laborais.'
        },
        {
            foto: `${fotoTema2}`,
            tema: ' A Importância da Fiscalização na Distribuição de EPIs',
            texto: 'A fiscalização adequada, conduzida por órgãos como o SESMT ou entidades fiscalizadoras, assegura que os trabalhadores recebam os EPIs apropriados, alinhando-se aos riscos inerentes às suas atividades. Essa prática é essencial para a conformidade com as normas de segurança no trabalho.'
        },
        {
            foto: `${fotoTema3}`,
            tema: 'EPI versus EPC: Entendendo as Diferenças',
            texto: 'Compreender a diferença entre Equipamento de Proteção Individual (EPI) e Equipamento de Proteção Coletiva (EPC) é fundamental. Enquanto o EPI visa proteger individualmente, o EPC é aplicado no ambiente de trabalho para segurança coletiva, abrangendo riscos de forma ampla.'
        },
        {
            foto: `${fotoTema4}`,
            tema: 'Conservação e Manutenção Adequadas dos EPIs',
            texto: 'A conservação dos EPIs é essencial para sua eficácia. Evitar desgastes, garantir limpeza regular e substituir itens danificados são práticas indispensáveis. Dessa forma, os trabalhadores podem contar sempre com equipamentos em condições ideais para sua proteção.'
        },
        {
            foto: `${fotoTema5}`,
            tema: 'Conformidade com Normas Regulamentadoras (NRs)',
            texto: 'A determinação do uso de EPIs está vinculada a normas específicas, como a NR 06 no Brasil. Seguir essas normas é crucial para garantir a segurança no trabalho, fornecendo orientações precisas sobre o uso, fornecimento e fiscalização adequada dos Equipamentos de Proteção Individual.'
        }
    ]

    return (
        <main className='info-main'>
            <div className='info-card'>
                {arrayTextos.map((item, index) => (
                    < div className='info-card-div' key={index}>
                        <div className='card-foto-info'>
                            <img src={item.foto} alt='info-logo' />
                        </div>
                        <div className='card-texto'>
                            <h1>{item.tema}</h1>
                            <p>{item.texto}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}