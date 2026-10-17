import type { Lesson } from '@/content/types';

export const licoesIa: Lesson[] = [
  {
    id: 'lic.ia.01.a',
    chapterId: 'cap.ia.01',
    title: 'A Voz que Prevê a Próxima Palavra',
    goal: 'Entender como um LLM gera texto, o que é janela de contexto, temperatura e alucinação, e como redigir bons prompts.',
    cards: [
      {
        title: 'Prever o próximo token',
        body: 'Um LLM é uma rede **Transformer** treinada para prever o próximo token. A **autoatenção** pondera a relevância de cada token do contexto.\n\nTudo o que ele considera precisa caber na **janela de contexto**, medida em tokens.',
      },
      {
        title: 'Temperatura e alucinação',
        body: 'Temperatura baixa: respostas mais previsíveis. Alta: mais variadas.\n\n**Alucinação** é texto convincente e falso. Reduz-se com fontes no contexto, citações e verificação, mas não se elimina.',
      },
      {
        title: 'Como pedir',
        body: '*Zero-shot*: sem exemplos. *Few-shot*: com exemplos no prompt, sem alterar pesos. Cadeia de pensamento: raciocínio passo a passo.\n\nCuidado com a **injeção de prompt**: texto externo pode tentar dar ordens ao modelo.',
      },
    ],
    questionIds: ['q.ia.01.001', 'q.ia.01.002', 'q.ia.01.003', 'q.ia.01.004', 'q.ia.01.005', 'q.ia.01.006', 'q.ia.01.007', 'q.ia.01.008', 'q.ia.01.009', 'q.ia.01.010'],
  },
  {
    id: 'lic.ia.01.b',
    chapterId: 'cap.ia.01',
    title: 'O Arquivo que Responde',
    goal: 'Dominar memória, RAG, embeddings e bancos vetoriais.',
    cards: [
      {
        title: 'RAG em quatro verbos',
        body: 'Dividir os documentos em trechos, **vetorizar**, **buscar** os mais próximos da pergunta e **inserir** no prompt antes de gerar.\n\nConhecimento que muda e precisa de fonte pede RAG. Mudança de estilo pede ajuste fino.',
      },
      {
        title: 'Vetores e proximidade',
        body: 'Embedding é um vetor que representa o sentido. Similaridade de cosseno perto de 1 significa conteúdos parecidos.\n\nÍndices **ANN** (como HNSW) trocam um pouco de precisão por velocidade. No PostgreSQL, a extensão é o **pgvector**.',
      },
    ],
    questionIds: ['q.ia.01.011', 'q.ia.01.012', 'q.ia.01.013', 'q.ia.01.014', 'q.ia.01.015', 'q.ia.01.016', 'q.ia.01.017', 'q.ia.01.018', 'q.ia.01.019', 'q.ia.01.020'],
  },
  {
    id: 'lic.ia.02.a',
    chapterId: 'cap.ia.02',
    title: 'O Aprendiz que Usa as Mãos',
    goal: 'Compreender agentes, uso de ferramentas e o ciclo agentivo de desenvolvimento.',
    cards: [
      {
        title: 'Agente = modelo + ferramentas + laço',
        body: 'O modelo **pede** o uso de uma ferramenta (nome e argumentos). A **aplicação executa** e devolve o resultado. O laço continua até o objetivo.',
      },
      {
        title: 'O ciclo agentivo',
        body: '1. Coletar contexto. 2. Planejar. 3. Executar (arquivos e shell). 4. Verificar e corrigir (*self-healing*).\n\nMenor privilégio e confirmação humana para ações destrutivas ou externas.',
      },
    ],
    questionIds: ['q.ia.02.001', 'q.ia.02.002', 'q.ia.02.003', 'q.ia.02.004', 'q.ia.02.005', 'q.ia.02.006', 'q.ia.02.007', 'q.ia.02.008', 'q.ia.02.009', 'q.ia.02.010'],
  },
  {
    id: 'lic.ia.02.b',
    chapterId: 'cap.ia.02',
    title: 'Protocolos, Selos e Provas',
    goal: 'Dominar MCP, skills, hooks e a validação do código gerado por IA.',
    cards: [
      {
        title: 'MCP',
        body: 'Host (aplicação) contém **clientes**, cada um ligado a **um servidor**. Mensagens em **JSON-RPC 2.0**. Transportes: stdio (local) e Streamable HTTP (remoto).\n\nServidor oferece **tools** (o modelo aciona), **resources** (dados) e **prompts** (o usuário escolhe).',
      },
      {
        title: 'Orientar ou garantir',
        body: 'Instruções e skills **orientam**; hooks e permissões **garantem**. Skills usam divulgação progressiva.\n\nCódigo gerado passa pelos mesmos testes e revisões de segurança. Testes verdes só provam o que testam.',
      },
    ],
    questionIds: ['q.ia.02.011', 'q.ia.02.012', 'q.ia.02.013', 'q.ia.02.014', 'q.ia.02.015', 'q.ia.02.016', 'q.ia.02.017', 'q.ia.02.018', 'q.ia.02.019', 'q.ia.02.020'],
  },
];
