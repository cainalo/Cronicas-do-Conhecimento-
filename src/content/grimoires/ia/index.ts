import type { Chapter, Grimoire } from '@/content/types';
import c1s1 from './cap01-llm-rag/01-llm.md?raw';
import c1s2 from './cap01-llm-rag/02-prompts.md?raw';
import c1s3 from './cap01-llm-rag/03-contexto.md?raw';
import c1s4 from './cap01-llm-rag/04-rag.md?raw';
import c1s5 from './cap01-llm-rag/05-vetores.md?raw';
import c1s6 from './cap01-llm-rag/06-resumo.md?raw';
import c2s1 from './cap02-agentes-mcp/01-agentes.md?raw';
import c2s2 from './cap02-agentes-mcp/02-ciclo.md?raw';
import c2s3 from './cap02-agentes-mcp/03-mcp.md?raw';
import c2s4 from './cap02-agentes-mcp/04-skills.md?raw';
import c2s5 from './cap02-agentes-mcp/05-qualidade.md?raw';

export const grimorioIa: Grimoire = {
  id: 'grim.ia',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.ia-eng',
  title: 'Inteligência Artificial',
  epithet: 'Inteligência Artificial',
  description:
    'Modelos de linguagem, prompts e contexto, RAG, agentes de programação e MCP; aprendizado de máquina, redes neurais e PLN; ética, LGPD aplicada à IA, EBIA, ciência de dados e Big Data. Cobre os dois blocos de IA do edital (9 questões).',
  chapterIds: ['cap.ia.01', 'cap.ia.02', 'cap.ia.03', 'cap.ia.04'],
  sigil: 'pena',
  binding: 'floresta',
};

export const capIaLlm: Chapter = {
  id: 'cap.ia.01',
  grimoireId: 'grim.ia',
  number: 1,
  title: 'Modelos de Linguagem, Contexto e RAG',
  subtitle: 'Como a máquina escreve, o que ela enxerga e onde busca o que não sabe',
  topicIds: ['ti.ia-eng.llm', 'ti.ia-eng.contexto', 'ti.ia.generativa'],
  review: 'nao-revisado',
  estimatedMinutes: 50,
  sections: [
    { id: 'llm', title: '1. O que é um LLM', body: c1s1 },
    { id: 'prompts', title: '2. Engenharia de prompts', body: c1s2 },
    { id: 'contexto', title: '3. Engenharia de contexto e memória', body: c1s3 },
    { id: 'rag', title: '4. Geração aumentada por recuperação (RAG)', body: c1s4 },
    { id: 'vetores', title: '5. Embeddings e bancos vetoriais', body: c1s5 },
    { id: 'resumo', title: '6. Quadro-resumo e pegadinhas', body: c1s6 },
  ],
  glossary: [
    { term: 'ANN', definition: 'Busca de vizinho mais próximo aproximado; troca um pouco de precisão por velocidade em grandes coleções de vetores.' },
    { term: 'Chunking', definition: 'Divisão de documentos em trechos antes da geração de embeddings, no RAG.' },
    { term: 'Embedding', definition: 'Vetor numérico que representa o sentido de um conteúdo.' },
    { term: 'Few-shot', definition: 'Técnica de prompt que inclui alguns exemplos da tarefa, sem alterar os pesos do modelo.' },
    { term: 'HNSW', definition: 'Índice em grafo hierárquico para busca vetorial aproximada.' },
    { term: 'Janela de contexto', definition: 'Limite de tokens que o modelo considera de uma vez.' },
    { term: 'pgvector', definition: 'Extensão do PostgreSQL para armazenar vetores e fazer busca por similaridade.' },
    { term: 'RAG', definition: 'Geração aumentada por recuperação: busca trechos relevantes e os insere no contexto antes de gerar.' },
    { term: 'Temperatura', definition: 'Parâmetro que controla a aleatoriedade da geração.' },
    { term: 'Token', definition: 'Unidade de texto processada pelo modelo (palavra, parte de palavra ou sinal).' },
  ],
  references: [
    { title: 'VASWANI, A. et al.', detail: 'Attention Is All You Need. NeurIPS, 2017.' },
    { title: 'BROWN, T. et al.', detail: 'Language Models are Few-Shot Learners. NeurIPS, 2020.' },
    { title: 'WEI, J. et al.', detail: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models. NeurIPS, 2022.' },
    { title: 'LEWIS, P. et al.', detail: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. NeurIPS, 2020.' },
    { title: 'LIU, N. F. et al.', detail: 'Lost in the Middle: How Language Models Use Long Contexts. 2023.' },
    { title: 'OWASP', detail: 'Top 10 for Large Language Model Applications (LLM01: Prompt Injection).' },
    { title: 'pgvector', detail: 'Documentação oficial da extensão (github.com/pgvector/pgvector).' },
  ],
  lessonIds: ['lic.ia.01.a', 'lic.ia.01.b'],
};

export const capIaAgentes: Chapter = {
  id: 'cap.ia.02',
  grimoireId: 'grim.ia',
  number: 2,
  title: 'Agentes de Programação e o Protocolo MCP',
  subtitle: 'Quando o modelo passa a agir: ferramentas, ciclo agentivo, protocolos e validação',
  topicIds: ['ti.ia-eng.agentes', 'ti.ia-eng.mcp', 'ti.ia-eng.qualidade'],
  review: 'nao-revisado',
  estimatedMinutes: 45,
  sections: [
    { id: 'agentes', title: '1. De assistente a agente', body: c2s1 },
    { id: 'ciclo', title: '2. O ciclo agentivo de desenvolvimento', body: c2s2 },
    { id: 'mcp', title: '3. Model Context Protocol (MCP)', body: c2s3 },
    { id: 'skills', title: '4. Skills, hooks e extensibilidade', body: c2s4 },
    { id: 'qualidade', title: '5. Qualidade, segurança e ética', body: c2s5 },
  ],
  glossary: [
    { term: 'Agente', definition: 'Sistema em que um LLM persegue um objetivo em laço, usando ferramentas e observando os resultados.' },
    { term: 'Hook', definition: 'Ação executada automaticamente pela aplicação em um evento; garante comportamento sem depender do modelo.' },
    { term: 'Host (MCP)', definition: 'Aplicação de IA que contém os clientes MCP.' },
    { term: 'JSON-RPC 2.0', definition: 'Formato de mensagens de chamada remota usado pelo MCP.' },
    { term: 'Menor privilégio', definition: 'Conceder somente as permissões necessárias para a tarefa.' },
    { term: 'Self-healing', definition: 'Capacidade do agente de detectar e corrigir os próprios erros a partir do retorno das ferramentas.' },
    { term: 'Skill', definition: 'Pacote de instruções e materiais carregado sob demanda pelo agente (divulgação progressiva).' },
    { term: 'Slopsquatting', definition: 'Registro malicioso de pacotes com nomes que modelos de IA costumam inventar.' },
    { term: 'Tool use', definition: 'Mecanismo pelo qual o modelo pede a execução de uma ferramenta, executada pela aplicação.' },
  ],
  references: [
    { title: 'Model Context Protocol', detail: 'Especificação e documentação oficial (modelcontextprotocol.io).' },
    { title: 'Anthropic', detail: 'Documentação do Claude Code: memória (CLAUDE.md), permissões, hooks, subagentes, skills e MCP (docs.anthropic.com / code.claude.com).' },
    { title: 'Anthropic', detail: 'Documentação de uso de ferramentas (tool use) da API Claude.' },
    { title: 'TCE-GO', detail: 'Resolução Administrativa nº 24/2024, sobre o uso de ferramentas de IA (citada no edital).' },
    { title: 'Lei nº 13.709/2018', detail: 'Lei Geral de Proteção de Dados Pessoais.' },
  ],
  lessonIds: ['lic.ia.02.a', 'lic.ia.02.b'],
};
