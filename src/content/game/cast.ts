// Elenco recorrente das Crônicas do Arquivo Real (kit de reformulação, seção 8.3). Cada personagem
// tem um objetivo próprio e um ponto em que discorda dos outros; as missões usam estas fichas para
// que as falas sejam coerentes de uma missão para a outra.
export interface CastMember {
  id: string;
  name: string;
  role: string;
  goal: string;
  /** Onde costuma discordar dos outros. */
  tension: string;
  /** Cor do personagem nas falas e na cena 3D. */
  color: string;
}

export const cast: Record<string, CastMember> = {
  isolda: {
    id: 'isolda',
    name: 'Isolda',
    role: 'Arquivista-mor e mentora',
    goal: 'Reconstruir os registros da Coroa e formar auditores que decidam com evidência.',
    tension: 'Recusa conclusões apressadas, mesmo quando o Conselho tem pressa.',
    color: '#1f5c45',
  },
  bubo: {
    id: 'bubo',
    name: 'Bubo',
    role: 'Coruja de Isolda',
    goal: 'Acompanhar o aprendiz e lembrar o que ele já estudou.',
    tension: 'Prefere uma pergunta bem feita a uma resposta pronta.',
    color: '#9a5b20',
  },
  brites: {
    id: 'brites',
    name: 'Brites',
    role: 'Engenheira da Oficina',
    goal: 'Pôr os sistemas de registro de pé de novo, rápido.',
    tension: 'Quer consertar antes de entender a causa; discorda de Isolda sobre o ritmo.',
    color: '#2c5f6e',
  },
  tome: {
    id: 'tome',
    name: 'Tomé',
    role: 'Mensageiro das Torres',
    goal: 'Descobrir por que as mensagens se perdem entre as torres.',
    tension: 'Desconfia do Conselho, que cortou a verba das torres.',
    color: '#5b6b2e',
  },
  leonor: {
    id: 'leonor',
    name: 'Leonor',
    role: 'Auditora do Conselho',
    goal: 'Entregar ao Conselho conclusões que resistam a qualquer recurso.',
    tension: 'Só aceita prova documental; exige que o aprendiz mostre a consulta, não só o resultado.',
    color: '#4a4f57',
  },
  ambrosio: {
    id: 'ambrosio',
    name: 'Ambrósio',
    role: 'Mestre dos Contratos',
    goal: 'Comprar logo a solução que promete resolver tudo.',
    tension: 'Prefere o menor preço; irrita-se quando cobram requisitos.',
    color: '#7a4a1e',
  },
  valerio: {
    id: 'valerio',
    name: 'Conde Valério',
    role: 'Tesoureiro-Mor',
    goal: 'Oficialmente, proteger o erário. Na prática, ninguém sabe.',
    tension: 'Ajuda e atrapalha ao mesmo tempo; é a figura ambígua do Conselho.',
    color: '#6b2a22',
  },
};
