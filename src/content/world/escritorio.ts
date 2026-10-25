// Escritório 2D do primeiro cenário (pacote v4, etapa 2). O caso "servidor lento" acontece pelo
// mapa: o chamado está no balcão da Recepção, a Marta coordena o Suporte (com o terminal na mesa
// dela), o João trabalha nos Relatórios e o console fica na Sala de servidores. Pessoas e dados
// são fictícios.
import type { World } from '@/lib/world';

export const escritorio: World = {
  id: 'mundo.escritorio',
  version: 1,
  title: 'Escritório de TI',
  // '#' parede · '.' piso · B balcão · R rack · T console · D mesa · P planta
  grid: [
    '################',
    '#BB...####.RRR.#',
    '#.....####.....#',
    '#.P...####...T.#',
    '###.########.###',
    '#..............#',
    '###.########.###',
    '#.....####.....#',
    '#.DD..####.DD..#',
    '#.....####.....#',
    '#P....####....P#',
    '################',
  ],
  rooms: [
    { id: 'recepcao', name: 'Recepção', from: { x: 1, y: 1 }, to: { x: 5, y: 3 }, label: { x: 3, y: 3 } },
    { id: 'servidores', name: 'Sala de servidores', from: { x: 10, y: 1 }, to: { x: 14, y: 3 }, label: { x: 10, y: 3 } },
    { id: 'corredor', name: 'Corredor', from: { x: 1, y: 4 }, to: { x: 14, y: 6 } },
    { id: 'suporte', name: 'Suporte', from: { x: 1, y: 7 }, to: { x: 5, y: 10 }, label: { x: 2, y: 10 } },
    { id: 'relatorios', name: 'Relatórios', from: { x: 10, y: 7 }, to: { x: 14, y: 10 }, label: { x: 10, y: 10 } },
  ],
  start: { x: 4, y: 2 },
  actors: [
    {
      id: 'paula',
      name: 'Paula',
      role: 'atendimento (personagem fictícia)',
      at: { x: 1, y: 2 },
      look: { shirt: '#1f5c7a', hair: '#2b2118', skin: '#c68a5e', hairStyle: 'coque' },
      idle: 'Bom dia! O chamado 2318 está aqui no balcão. A Marta, do Suporte, está esperando você lá embaixo, à esquerda.',
    },
    {
      id: 'marta',
      name: 'Marta',
      role: 'coordenadora do suporte (personagem fictícia)',
      at: { x: 4, y: 9 },
      look: { shirt: '#c8402a', hair: '#5a3a22', skin: '#e0b48f', hairStyle: 'longo' },
      idle: 'Estou acompanhando os outros chamados. Se precisar, é só chamar.',
    },
    {
      id: 'joao',
      name: 'João',
      role: 'analista de relatórios (personagem fictício)',
      at: { x: 13, y: 8 },
      look: { shirt: '#346834', hair: '#1b1a17', skin: '#8d5b3e', hairStyle: 'curto' },
      idle: 'Os relatórios de hoje dependem do servidor relat-01. Espero que resolvam logo!',
    },
  ],
  objects: [
    { id: 'chamado', label: 'o chamado 2318, no balcão', tiles: [{ x: 1, y: 1 }, { x: 2, y: 1 }], evidenceIds: ['ev.chamado'] },
    { id: 'terminal', label: 'o terminal na mesa do Suporte', tiles: [{ x: 2, y: 8 }, { x: 3, y: 8 }], evidenceIds: ['ev.top', 'ev.vmstat'] },
    {
      id: 'console',
      label: 'o console da Sala de servidores',
      tiles: [{ x: 13, y: 3 }],
      evidenceIds: ['ev.depois'],
      availableFrom: 'n.fim',
      locked: 'O console mostra o servidor relat-01 ainda sob carga. Por enquanto, não há o que conferir aqui.',
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
