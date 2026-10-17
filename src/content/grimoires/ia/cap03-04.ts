import type { Chapter, Lesson } from '@/content/types';
import c3s1 from './cap03-fundamentos/01-aprendizado.md?raw';
import c3s2 from './cap03-fundamentos/02-redes-neurais.md?raw';
import c3s3 from './cap03-fundamentos/03-pln.md?raw';
import c4s1 from './cap04-etica-dados/01-etica.md?raw';
import c4s2 from './cap04-etica-dados/02-lgpd-ebia.md?raw';
import c4s3 from './cap04-etica-dados/03-ciencia-dados.md?raw';
import c4s4 from './cap04-etica-dados/04-big-data.md?raw';

export const capIaFundamentos: Chapter = {
  id: 'cap.ia.03',
  grimoireId: 'grim.ia',
  number: 3,
  title: 'Aprendizado de Máquina, Redes Neurais e PLN',
  subtitle: 'Como a máquina aprende com exemplos, com recompensas e com as palavras',
  topicIds: ['ti.ia.fundamentos'],
  review: 'nao-revisado',
  estimatedMinutes: 45,
  sections: [
    { id: 'aprendizado', title: '1. Fundamentos e tipos de aprendizado', body: c3s1 },
    { id: 'redes', title: '2. Redes neurais e deep learning', body: c3s2 },
    { id: 'pln', title: '3. Processamento de linguagem natural', body: c3s3 },
  ],
  glossary: [
    { term: 'Aprendizado supervisionado', definition: 'Treino com dados rotulados; inclui classificação (classes) e regressão (valores contínuos).' },
    { term: 'Aprendizado por reforço', definition: 'Agente aprende uma política de ações a partir de recompensas recebidas do ambiente.' },
    { term: 'k-means', definition: 'Algoritmo de agrupamento não supervisionado em que o número de grupos k é definido antes.' },
    { term: 'Overfitting', definition: 'Modelo que se ajusta demais ao treino e generaliza mal para dados novos (alta variância).' },
    { term: 'PCA', definition: 'Análise de componentes principais: técnica não supervisionada de redução de dimensionalidade.' },
    { term: 'Função de ativação', definition: 'Função não linear aplicada à soma ponderada do neurônio (sigmoide, tanh, ReLU, softmax).' },
    { term: 'Retropropagação', definition: 'Cálculo dos gradientes da perda em relação aos pesos, da saída para a entrada, pela regra da cadeia.' },
    { term: 'CNN', definition: 'Rede neural convolucional, indicada para dados com estrutura espacial, como imagens.' },
    { term: 'Lematização', definition: 'Redução da palavra à forma de dicionário (lema), com análise morfológica.' },
    { term: 'TF-IDF', definition: 'Peso que combina a frequência do termo no documento com a raridade dele na coleção.' },
    { term: 'NER', definition: 'Reconhecimento de entidades nomeadas: identifica pessoas, organizações, locais, datas e valores no texto.' },
  ],
  references: [
    { title: 'RUSSELL, S.; NORVIG, P.', detail: 'Inteligência Artificial: uma abordagem moderna. 4. ed. Rio de Janeiro: GEN LTC, 2022.' },
    { title: 'GÉRON, A.', detail: 'Mãos à Obra: Aprendizado de Máquina com Scikit-Learn, Keras & TensorFlow. 2. ed. Rio de Janeiro: Alta Books, 2021.' },
    { title: 'GOODFELLOW, I.; BENGIO, Y.; COURVILLE, A.', detail: 'Deep Learning. MIT Press, 2016.' },
    { title: 'SUTTON, R. S.; BARTO, A. G.', detail: 'Reinforcement Learning: An Introduction. 2. ed. MIT Press, 2018.' },
    { title: 'JURAFSKY, D.; MARTIN, J. H.', detail: 'Speech and Language Processing. 3. ed. (rascunho disponível em web.stanford.edu/~jurafsky/slp3).' },
    { title: 'VASWANI, A. et al.', detail: 'Attention Is All You Need. NeurIPS, 2017.' },
  ],
  lessonIds: ['lic.ia.03'],
};

export const capIaEticaDados: Chapter = {
  id: 'cap.ia.04',
  grimoireId: 'grim.ia',
  number: 4,
  title: 'Ética, LGPD, Ciência de Dados e Big Data',
  subtitle: 'Quem responde pela máquina, que dados ela pode usar e como se mede o que ela acerta',
  topicIds: ['ti.ia.etica', 'ti.ia.dados'],
  review: 'nao-revisado',
  estimatedMinutes: 55,
  sections: [
    { id: 'etica', title: '1. Ética, IA responsável, explicabilidade e governança', body: c4s1 },
    { id: 'lgpd-ebia', title: '2. LGPD aplicada à IA e Estratégia Brasileira de IA', body: c4s2 },
    { id: 'ciencia-dados', title: '3. Ciência de dados, estatística e avaliação de modelos', body: c4s3 },
    { id: 'big-data', title: '4. Big Data e processamento distribuído', body: c4s4 },
  ],
  glossary: [
    { term: 'XAI', definition: 'Inteligência artificial explicável: técnicas para tornar compreensíveis as decisões de modelos.' },
    { term: 'SHAP', definition: 'Técnica de explicação baseada nos valores de Shapley da teoria dos jogos.' },
    { term: 'LIME', definition: 'Explicação local que aproxima o modelo complexo por um modelo simples em torno de uma instância.' },
    { term: 'Art. 20 da LGPD', definition: 'Direito do titular de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado.' },
    { term: 'EBIA', definition: 'Estratégia Brasileira de Inteligência Artificial, instituída pela Portaria MCTI nº 4.617/2021, com nove eixos.' },
    { term: 'Precisão', definition: 'VP / (VP + FP): dos casos apontados como positivos, a fração que é positiva de fato.' },
    { term: 'Revocação (recall)', definition: 'VP / (VP + FN): dos positivos reais, a fração que o modelo encontrou.' },
    { term: 'Validação cruzada k-fold', definition: 'Treinar e testar k vezes, cada vez com uma parte diferente dos dados como teste.' },
    { term: 'RMSE', definition: 'Raiz do erro quadrático médio; penaliza mais os erros grandes.' },
    { term: 'HDFS', definition: 'Sistema de arquivos distribuído do Hadoop; NameNode guarda metadados e DataNodes guardam blocos replicados.' },
    { term: 'Schema-on-read', definition: 'Esquema aplicado na leitura dos dados, típico do data lake.' },
    { term: 'ELT', definition: 'Extrair, carregar e só então transformar os dados no destino.' },
  ],
  references: [
    { title: 'Lei nº 13.709/2018', detail: 'Lei Geral de Proteção de Dados Pessoais (arts. 6º, 7º, 11, 12, 20, 23 e 38), com alterações da Lei nº 13.853/2019.' },
    { title: 'MCTI', detail: 'Portaria MCTI nº 4.617, de 6 de abril de 2021 (institui a Estratégia Brasileira de Inteligência Artificial), alterada pela Portaria MCTI nº 4.979/2021.' },
    { title: 'MCTI', detail: 'Plano Brasileiro de Inteligência Artificial 2024–2028: IA para o Bem de Todos (consultado via fontes secundárias).' },
    { title: 'RIBEIRO, M. T.; SINGH, S.; GUESTRIN, C.', detail: '"Why Should I Trust You?": Explaining the Predictions of Any Classifier. KDD, 2016.' },
    { title: 'LUNDBERG, S. M.; LEE, S.-I.', detail: 'A Unified Approach to Interpreting Model Predictions. NeurIPS, 2017.' },
    { title: 'ISO/IEC 42001:2023', detail: 'Information technology. Artificial intelligence. Management system.' },
    { title: 'NIST', detail: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), 2023.' },
    { title: 'UNESCO', detail: 'Recomendação sobre a Ética da Inteligência Artificial, 2021.' },
    { title: 'PROVOST, F.; FAWCETT, T.', detail: 'Data Science para Negócios. Rio de Janeiro: Alta Books, 2016.' },
    { title: 'DEAN, J.; GHEMAWAT, S.', detail: 'MapReduce: Simplified Data Processing on Large Clusters. OSDI, 2004.' },
    { title: 'Apache Software Foundation', detail: 'Documentação oficial do Apache Hadoop e do Apache Spark (hadoop.apache.org, spark.apache.org).' },
  ],
  lessonIds: ['lic.ia.04'],
};

export const licoesIa34: Lesson[] = [
  {
    id: 'lic.ia.03',
    chapterId: 'cap.ia.03',
    title: 'O Aprendiz de Exemplos e Recompensas',
    goal: 'Distinguir os tipos de aprendizado, reconhecer overfitting, entender o treino de redes neurais e as etapas clássicas de PLN.',
    cards: [
      {
        title: 'Três formas de aprender',
        body: '**Supervisionado**: dados rotulados. Classificação (classe) ou regressão (número). Regressão logística classifica.\n\n**Não supervisionado**: sem rótulo. Agrupamento (k-means, *k* definido antes), redução de dimensionalidade (PCA).\n\n**Por reforço**: agente, ambiente, ação, recompensa; aprende uma **política**.',
      },
      {
        title: 'Redes neurais',
        body: 'Neurônio: soma ponderada + viés + **ativação não linear** (ReLU, sigmoide, softmax).\n\nTreino: perda, **retropropagação** (gradientes) e **gradiente descendente** (taxa de aprendizado). CNN para imagens, RNN/LSTM para sequências, transformer com atenção.\n\nOverfitting = alta variância; underfitting = alto viés.',
      },
      {
        title: 'PLN clássico',
        body: 'Tokenizar, normalizar, tirar stopwords. **Stemming** corta sufixos; **lematização** dá a forma de dicionário.\n\nBag-of-words ignora a ordem. **TF-IDF** derruba o peso de termos comuns. Embeddings são densos. NER acha pessoas, órgãos, datas e valores.',
      },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.ia.03.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.ia.04',
    chapterId: 'cap.ia.04',
    title: 'O Selo da Prestação de Contas',
    goal: 'Dominar ética e explicabilidade, LGPD aplicada à IA, EBIA, métricas de avaliação e fundamentos de Big Data.',
    cards: [
      {
        title: 'Ética e lei',
        body: 'Viés não some só por tirar a variável sensível (*proxies*). **LIME**: explicação local por modelo simples. **SHAP**: valores de Shapley.\n\nLGPD **art. 20**: revisão de decisão unicamente automatizada e informação sobre critérios. Dez bases legais no art. 7º. Necessidade = minimização.\n\n**EBIA**: Portaria MCTI nº 4.617/2021, nove eixos (3 transversais, 6 verticais).',
      },
      {
        title: 'Métricas',
        body: 'Precisão = VP/(VP+FP). Revocação = VP/(VP+FN). F1 = média harmônica das duas.\n\nAcurácia engana com classes desbalanceadas. AUC 0,5 = acaso. RMSE pune mais os erros grandes que o MAE. Mediana resiste a *outliers*.',
      },
      {
        title: 'Big Data',
        body: 'Três Vs originais: **volume, velocidade, variedade** (+ veracidade e valor).\n\nHDFS: NameNode (metadados), DataNodes (blocos replicados). MapReduce: map, shuffle, reduce. Spark: em memória, avaliação preguiçosa.\n\nData lake: schema-on-read. Warehouse: schema-on-write. ELT transforma depois de carregar.',
      },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.ia.04.${String(i + 1).padStart(3, '0')}`),
  },
];
