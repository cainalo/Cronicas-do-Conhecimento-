// Escritório 2D do primeiro cenário (pacote v4, etapa 2; refeito em 25/10/2026 em tela cheia, mais
// ambientes e detalhes). O caso "servidor lento" acontece pelo mapa: o chamado está no balcão da
// Recepção, a Marta coordena o Suporte (o terminal fica na mesa dela), o João trabalha nos Relatórios e
// o console fica na Sala de servidores. A copa e a sala de reunião dão vida ao escritório: dá para
// conversar e examinar coisas, sem mexer no caso. Pessoas e dados são fictícios.
import type { World } from '@/lib/world';

const top = '#........#.....#.......#';
const doorsA = [4, 12, 19];
const doorsB = [4, 12, 19];
const wallWithDoors = (doors: number[]) => [...'#'.repeat(24)].map((c, x) => (doors.includes(x) ? '.' : c)).join('');

export const escritorio: World = {
  id: 'mundo.escritorio',
  version: 2,
  title: 'Escritório de TI',
  grid: [
    '#'.repeat(24),
    top,
    top,
    top,
    top,
    wallWithDoors(doorsA),
    '#' + '.'.repeat(22) + '#',
    '#' + '.'.repeat(22) + '#',
    wallWithDoors(doorsB),
    top,
    top,
    top,
    top,
    top,
    top,
    '#'.repeat(24),
  ],
  rooms: [
    { id: 'recepcao', name: 'Recepção', from: { x: 1, y: 1 }, to: { x: 8, y: 4 } },
    { id: 'copa', name: 'Copa', from: { x: 10, y: 1 }, to: { x: 14, y: 4 } },
    { id: 'servidores', name: 'Sala de servidores', from: { x: 16, y: 1 }, to: { x: 22, y: 4 } },
    { id: 'corredor', name: 'Corredor', from: { x: 1, y: 5 }, to: { x: 22, y: 8 } },
    { id: 'suporte', name: 'Suporte', from: { x: 1, y: 9 }, to: { x: 8, y: 14 } },
    { id: 'reuniao', name: 'Sala de reunião', from: { x: 10, y: 9 }, to: { x: 14, y: 14 } },
    { id: 'relatorios', name: 'Relatórios', from: { x: 16, y: 9 }, to: { x: 22, y: 14 } },
  ],
  decor: [
    // Recepção
    { kind: 'balcao', x: 1, y: 1, w: 3 },
    { kind: 'sofa', x: 6, y: 1, w: 2 },
    { kind: 'planta', x: 8, y: 1 },
    { kind: 'bebedouro', x: 8, y: 4 },
    { kind: 'tapete', x: 4, y: 2, w: 3, h: 2 },
    { kind: 'planta', x: 1, y: 4 },
    // Copa
    { kind: 'bancada', x: 10, y: 1, w: 3 },
    { kind: 'geladeira', x: 14, y: 1 },
    { kind: 'mesaCafe', x: 11, y: 3, w: 2 },
    { kind: 'cadeira', x: 10, y: 3 },
    { kind: 'cadeira', x: 13, y: 3, v: 1 },
    // Sala de servidores
    { kind: 'rack', x: 17, y: 1 },
    { kind: 'rack', x: 18, y: 1 },
    { kind: 'rack', x: 19, y: 1 },
    { kind: 'rack', x: 20, y: 1 },
    { kind: 'nobreak', x: 22, y: 1 },
    { kind: 'arcond', x: 16, y: 1 },
    { kind: 'console', x: 21, y: 3, w: 2 },
    // Corredor
    { kind: 'planta', x: 1, y: 6 },
    { kind: 'planta', x: 22, y: 7 },
    { kind: 'quadro', x: 9, y: 6, solid: true },
    // Suporte
    { kind: 'quadro', x: 1, y: 9, w: 2 },
    { kind: 'mesa', x: 2, y: 11, w: 2 },
    { kind: 'mesa', x: 6, y: 11, w: 2 },
    { kind: 'mesa', x: 2, y: 13, w: 2 },
    { kind: 'mesa', x: 6, y: 13, w: 2 },
    { kind: 'cadeira', x: 2, y: 12 },
    { kind: 'cadeira', x: 7, y: 12 },
    { kind: 'cadeira', x: 3, y: 14 },
    { kind: 'planta', x: 8, y: 9 },
    // Sala de reunião
    { kind: 'tv', x: 13, y: 9, w: 2 },
    { kind: 'mesaGrande', x: 11, y: 11, w: 3, h: 2 },
    { kind: 'cadeira', x: 10, y: 11 },
    { kind: 'cadeira', x: 10, y: 12 },
    { kind: 'cadeira', x: 14, y: 11, v: 1 },
    { kind: 'cadeira', x: 14, y: 12, v: 1 },
    // Relatórios
    { kind: 'mesa', x: 17, y: 11, w: 2 },
    { kind: 'mesa', x: 20, y: 11, w: 2 },
    { kind: 'mesa', x: 17, y: 13, w: 2 },
    { kind: 'cadeira', x: 18, y: 12 },
    { kind: 'cadeira', x: 21, y: 12 },
    { kind: 'impressora', x: 22, y: 14 },
    { kind: 'armario', x: 16, y: 9, w: 2 },
    { kind: 'planta', x: 22, y: 9 },
  ],
  start: { x: 5, y: 3 },
  actors: [
    {
      id: 'paula',
      name: 'Paula',
      role: 'atendimento (personagem fictícia)',
      at: { x: 2, y: 2 },
      look: { shirt: '#1f5c7a', hair: '#2b2118', skin: '#c68a5e', hairStyle: 'coque' },
      idle: 'Bom dia! O chamado 2318 está aqui no balcão. A Marta, do Suporte, está esperando você: desça pelo corredor e entre na primeira sala à esquerda.',
    },
    {
      id: 'marta',
      name: 'Marta',
      role: 'coordenadora do suporte (personagem fictícia)',
      at: { x: 5, y: 12 },
      look: { shirt: '#c8402a', hair: '#5a3a22', skin: '#e0b48f', hairStyle: 'longo' },
      idle: 'Estou acompanhando os outros chamados no quadro. Se precisar, é só chamar.',
    },
    {
      id: 'joao',
      name: 'João',
      role: 'analista de relatórios (personagem fictício)',
      at: { x: 19, y: 12 },
      look: { shirt: '#346834', hair: '#1b1a17', skin: '#8d5b3e', hairStyle: 'curto' },
      idle: 'Os relatórios de hoje dependem do servidor relat-01. Espero que resolvam logo!',
    },
    {
      id: 'bruno',
      name: 'Bruno',
      role: 'técnico de redes (personagem fictício)',
      at: { x: 12, y: 2 },
      look: { shirt: '#6b4a8f', hair: '#3b2a1e', skin: '#d9a77c', hairStyle: 'curto' },
      idle: 'Pausa para o café. Se o problema for na rede, me chama; mas pelo que ouvi, o relat-01 está é sobrecarregado.',
    },
    {
      id: 'ana',
      name: 'Ana',
      role: 'gerente de TI (personagem fictícia)',
      at: { x: 13, y: 13 },
      look: { shirt: '#2c5f6e', hair: '#1d1a17', skin: '#a86f4c', hairStyle: 'longo' },
      idle: 'Estou preparando a reunião das 15h. Antes de mexer em qualquer servidor, confira os dados: decisão boa começa por evidência.',
    },
  ],
  objects: [
    { id: 'chamado', label: 'o chamado 2318, no balcão', tiles: [{ x: 1, y: 1 }, { x: 2, y: 1 }], evidenceIds: ['ev.chamado'] },
    { id: 'terminal', label: 'o terminal na mesa da Marta', tiles: [{ x: 6, y: 11 }, { x: 7, y: 11 }], evidenceIds: ['ev.top', 'ev.vmstat'] },
    {
      id: 'console',
      label: 'o console da Sala de servidores',
      tiles: [{ x: 21, y: 3 }, { x: 22, y: 3 }],
      evidenceIds: ['ev.depois'],
      availableFrom: 'n.fim',
      locked: 'O console mostra o servidor relat-01 ainda sob carga. Por enquanto, não há o que conferir aqui.',
    },
    {
      id: 'quadro-suporte',
      label: 'o quadro de chamados do Suporte',
      tiles: [{ x: 1, y: 9 }, { x: 2, y: 9 }],
      evidenceIds: [],
      info: 'Chamados abertos hoje: 2318 (relat-01 lento, prioridade alta), 2319 (troca de mouse), 2320 (acesso à pasta de contratos). A coluna "Em andamento" tem o 2318 com o seu nome.',
    },
    {
      id: 'aviso-corredor',
      label: 'o mural do corredor',
      tiles: [{ x: 9, y: 6 }],
      evidenceIds: [],
      info: 'Mural: "Janela de manutenção dos servidores: sábado, das 8h às 12h. Mudanças fora da janela só com autorização da gerência."',
    },
    {
      id: 'impressora',
      label: 'a impressora dos Relatórios',
      tiles: [{ x: 22, y: 14 }],
      evidenceIds: [],
      info: 'Fila de impressão: vazia. O painel mostra "Aguardando dados do servidor relat-01".',
    },
    {
      id: 'cafeteira',
      label: 'a cafeteira da copa',
      tiles: [{ x: 10, y: 1 }],
      evidenceIds: [],
      info: 'Café fresco. Um bilhete: "Quem esvaziar, faz outro."',
    },
  ],
  scenarioId: 'cen.suporte-lento',
  nodeActor: { 'n.inicio': 'marta', 'n.top': 'marta', 'n.acao': 'joao', 'n.fim': 'marta' },
  nodeRequires: { 'n.top': ['ev.top', 'ev.vmstat'], 'n.fim': ['ev.depois'] },
  objective: {
    'n.inicio': 'Vá até a sala de Suporte e fale com a Marta.',
    'n.top': 'Fale com a Marta sobre o que o terminal mostrou.',
    'n.acao': 'Vá ao setor de Relatórios e fale com o João.',
    'n.fim': 'Fale com a Marta para fechar o chamado.',
  },
};
