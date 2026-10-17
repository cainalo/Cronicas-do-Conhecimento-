// Artefatos do inventário: um por tópico do edital, conquistado ao demonstrar domínio.
// Nomes e descrições são provisórios (narrativa ainda em definição com o usuário).
export interface Artifact {
  topicId: string;
  name: string;
  lore: string;
}

export const artifacts: Artifact[] = [
  { topicId: 'ti.seguranca.criptografia', name: 'Chave de Sete Dentes', lore: 'Abre qualquer cofre cujo segredo você saiba guardar.' },
  { topicId: 'ti.ia-eng.llm', name: 'Oráculo de Latão', lore: 'Prevê a próxima palavra, mas às vezes inventa o passado.' },
  { topicId: 'ti.ia-eng.contexto', name: 'Lente da Janela', lore: 'Mostra só o que cabe no seu campo de visão.' },
  { topicId: 'ti.ia.generativa', name: 'Índice dos Mil Pergaminhos', lore: 'Encontra o trecho certo antes que o oráculo fale.' },
  { topicId: 'ti.ia-eng.agentes', name: 'Autômato Aprendiz', lore: 'Trabalha sozinho, mas pede licença antes de quebrar algo.' },
  { topicId: 'ti.ia-eng.mcp', name: 'Conector das Três Portas', lore: 'Ferramentas, recursos e preces num só encaixe.' },
  { topicId: 'ti.ia-eng.qualidade', name: 'Balança do Revisor', lore: 'Pesa o código que nenhuma mão humana escreveu.' },
  { topicId: 'ti.dev.apis', name: 'Ponte de Pedra Idempotente', lore: 'Atravessá-la duas vezes leva ao mesmo lugar.' },
  { topicId: 'ti.dev.auth', name: 'Selo do Portador', lore: 'Quem o porta passa; por isso nunca o mostre em estrada aberta.' },
  { topicId: 'ti.infra.redes', name: 'Bússola dos Pacotes', lore: 'Aponta o caminho de cada mensagem pelo reino.' },
  { topicId: 'ti.infra.perimetro', name: 'Escudo da Muralha', lore: 'Guarda a cidade, mas deixa passar os mensageiros autorizados.' },
  { topicId: 'ti.infra.nuvem', name: 'Castelo Alugado', lore: 'Cresce e encolhe conforme os visitantes chegam.' },
];
