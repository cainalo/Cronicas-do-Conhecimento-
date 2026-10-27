import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-redes/01-tcpip.md?raw';
import c1s2 from './cap01-redes/02-enderecos.md?raw';
import c1s3 from './cap01-redes/03-servicos.md?raw';
import c1s4 from './cap01-redes/04-perimetro.md?raw';
import c2s1 from './cap02-nuvem/01-modelos.md?raw';
import c2s2 from './cap02-nuvem/02-escala.md?raw';

export const grimorioInfra: Grimoire = {
  id: 'grim.infra',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.infra',
  title: 'Sistemas Operacionais, Redes e Nuvem',
  description: 'Protocolos de rede (TCP/IP, endereços, DNS, HTTP/3, firewalls, VPN), serviços de nuvem (IaaS, PaaS, SaaS, escala) e administração de sistemas (Windows, Linux, shell, PowerShell, Active Directory e virtualização).',
  chapterIds: ['cap.infra.01', 'cap.infra.02', 'cap.infra.03'],
};

export const capInfraRedes: Chapter = {
  id: 'cap.infra.01',
  grimoireId: 'grim.infra',
  number: 1,
  title: 'Redes de Computadores',
  subtitle: 'Camadas de rede, endereçamento, serviços e controles de segurança',
  topicIds: ['ti.infra.redes', 'ti.infra.perimetro'],
  review: 'nao-revisado',
  estimatedMinutes: 45,
  sections: [
    { id: 'tcpip', title: '1. Arquitetura TCP/IP', body: c1s1 },
    { id: 'enderecos', title: '2. Endereçamento IPv4 e IPv6', body: c1s2 },
    { id: 'servicos', title: '3. DNS, DHCP e protocolos de aplicação', body: c1s3 },
    { id: 'perimetro', title: '4. Firewalls, VPN, proxies e balanceamento', body: c1s4 },
  ],
  glossary: [
    { term: 'Three-way handshake', definition: 'Abertura de conexão TCP: SYN, SYN-ACK, ACK.' },
    { term: 'CIDR', definition: 'Notação /n que indica quantos bits do endereço pertencem à rede.' },
    { term: 'Hosts por sub-rede', definition: '2^h − 2, em que h é o número de bits de host.' },
    { term: 'RFC 1918', definition: 'Faixas privadas IPv4: 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16.' },
    { term: 'NAT', definition: 'Tradução de endereços privados para público na saída para a internet.' },
    { term: 'DORA', definition: 'Etapas do DHCP: Discover, Offer, Request, Acknowledge.' },
    { term: 'Registro MX', definition: 'Registro DNS que indica os servidores de e-mail do domínio.' },
    { term: 'QUIC', definition: 'Transporte sobre UDP com TLS 1.3 integrado, base do HTTP/3.' },
    { term: 'DMZ', definition: 'Sub-rede para serviços expostos, separada da rede interna por firewall.' },
    { term: 'Proxy reverso', definition: 'Intermediário à frente dos servidores: TLS, cache, balanceamento, proteção.' },
  ],
  references: [
    { title: 'KUROSE, J.; ROSS, K.', detail: 'Redes de Computadores e a Internet: uma abordagem top-down. Pearson.' },
    { title: 'TANENBAUM, A.; WETHERALL, D.', detail: 'Redes de Computadores. Pearson.' },
    { title: 'IETF RFC 1918, RFC 4291, RFC 2131', detail: 'Endereços privados, arquitetura IPv6 e DHCP.' },
    { title: 'IETF RFC 9113, RFC 9114, RFC 9000', detail: 'HTTP/2, HTTP/3 e QUIC.' },
  ],
  lessonIds: ['lic.infra.01'],
};

export const capInfraNuvem: Chapter = {
  id: 'cap.infra.02',
  grimoireId: 'grim.infra',
  number: 2,
  title: 'Computação em Nuvem',
  subtitle: 'Modelos de serviço, escala e disponibilidade',
  topicIds: ['ti.infra.nuvem'],
  review: 'nao-revisado',
  estimatedMinutes: 25,
  sections: [
    { id: 'modelos', title: '1. Conceito, serviços e implantação', body: c2s1 },
    { id: 'escala', title: '2. Serverless, escala e alta disponibilidade', body: c2s2 },
  ],
  glossary: [
    { term: 'IaaS', definition: 'Infraestrutura como serviço: o cliente gerencia do sistema operacional para cima.' },
    { term: 'PaaS', definition: 'Plataforma como serviço: o cliente gerencia aplicação e dados.' },
    { term: 'SaaS', definition: 'Software como serviço: aplicação pronta, fornecida pelo provedor.' },
    { term: 'Elasticidade', definition: 'Escalar para cima e para baixo automaticamente, conforme a demanda.' },
    { term: 'Serverless', definition: 'Execução de código sob demanda sem administrar servidores; cobrança por execução.' },
    { term: 'RTO', definition: 'Tempo máximo para restabelecer o serviço após um desastre.' },
    { term: 'RPO', definition: 'Perda máxima de dados tolerável, medida em tempo.' },
  ],
  references: [
    { title: 'NIST SP 800-145', detail: 'The NIST Definition of Cloud Computing (2011).' },
    { title: 'NIST SP 800-34', detail: 'Contingency Planning Guide for Federal Information Systems.' },
  ],
  lessonIds: ['lic.infra.02'],
};

export const licoesInfra: Lesson[] = [
  {
    id: 'lic.infra.01',
    chapterId: 'cap.infra.01',
    title: 'Redes, endereçamento e perímetro',
    goal: 'Camadas TCP/IP, TCP e UDP, portas, sub-redes, IPv6, DNS, DHCP, HTTP/3 e defesa de perímetro.',
    cards: [
      { title: 'Camadas e transporte', body: 'TCP/IP: aplicação, transporte, internet, acesso à rede.\n\n**TCP**: conexão, confiável, ordenado. **UDP**: sem conexão, rápido, sem garantias.\n\nPortas: SSH 22, DNS 53, HTTP 80, HTTPS 443, DHCP 67/68.' },
      { title: 'Endereços', body: 'Hosts = **2^h − 2**. /26 = 64 endereços, 62 hosts.\n\nIPv6: 128 bits, `::` uma vez só, sem broadcast, loopback `::1`.' },
      { title: 'DNS, DHCP e protocolos de aplicação', body: 'DNS: A, AAAA, CNAME, **MX**, PTR. DHCP: **DORA**. HTTP/3 sobre **QUIC/UDP**.\n\nProxy reverso protege servidores; DMZ isola serviços expostos.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.infra.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.infra.02',
    chapterId: 'cap.infra.02',
    title: 'Serviços de Computação em Nuvem',
    goal: 'Modelos de serviço e implantação, responsabilidade compartilhada, serverless, escala e disponibilidade.',
    cards: [
      { title: 'Quem gerencia o quê', body: '**IaaS**: você cuida do SO para cima. **PaaS**: só aplicação e dados. **SaaS**: aplicação pronta.\n\nDados, contas e permissões são **sempre** do cliente.' },
      { title: 'Escala e disponibilidade', body: 'Vertical = máquina maior. **Horizontal** = mais máquinas.\n\n99,9% ≈ 8h46 por ano. **RTO**: tempo para voltar. **RPO**: dados que se aceita perder.' },
    ],
    questionIds: Array.from({ length: 10 }, (_, i) => `q.infra.02.${String(i + 1).padStart(3, '0')}`),
  },
];
