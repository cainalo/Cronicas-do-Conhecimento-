import type { Chapter, Lesson } from '@/content/types';
import c3s1 from './cap03-so/01-processos-memoria.md?raw';
import c3s2 from './cap03-so/02-arquivos-permissoes.md?raw';
import c3s3 from './cap03-so/03-shell-powershell.md?raw';
import c3s4 from './cap03-so/04-diretorio-virtualizacao.md?raw';

export const capInfraSo: Chapter = {
  id: 'cap.infra.03',
  grimoireId: 'grim.infra',
  number: 3,
  title: 'Sistemas Operacionais e Serviços de Diretório',
  subtitle: 'Processos, arquivos, shell, PowerShell, Active Directory e virtualização',
  topicIds: ['ti.infra.so', 'ti.infra.diretorio'],
  review: 'nao-revisado',
  estimatedMinutes: 55,
  sections: [
    { id: 'processos', title: '1. Processos, memória e serviços', body: c3s1 },
    { id: 'arquivos', title: '2. Sistemas de arquivos e permissões', body: c3s2 },
    { id: 'shell', title: '3. Shell Linux, PowerShell e scripts', body: c3s3 },
    { id: 'diretorio', title: '4. Active Directory, LDAP, virtualização e containers', body: c3s4 },
  ],
  glossary: [
    { term: 'SIGTERM e SIGKILL', definition: 'Sinais 15 (pedido de término, padrão do kill) e 9 (encerramento forçado, não capturável).' },
    { term: 'Valor nice', definition: 'Prioridade de processo no Linux, de -20 (maior prioridade) a 19 (menor).' },
    { term: 'Thrashing', definition: 'Troca excessiva de páginas entre RAM e disco por falta de memória física.' },
    { term: 'Permissão 750', definition: 'rwxr-x---: dono tudo, grupo lê e executa, outros nada.' },
    { term: 'Sticky bit', definition: 'Em diretório, impede que um usuário apague arquivos de outros (ex.: /tmp, modo 1777).' },
    { term: 'Pipeline de objetos', definition: 'No PowerShell, o pipe transmite objetos com propriedades, filtráveis com Where-Object.' },
    { term: 'RemoteSigned', definition: 'ExecutionPolicy em que scripts locais rodam e os baixados da internet exigem assinatura.' },
    { term: 'Floresta', definition: 'Conjunto de árvores do AD com esquema e catálogo global comuns; limite de segurança.' },
    { term: 'OU', definition: 'Unidade organizacional: contêiner para organizar objetos, delegar administração e vincular GPOs.' },
    { term: 'LSDOU', definition: 'Ordem de aplicação das GPOs: Local, Site, Domínio, OU; a última aplicada prevalece.' },
    { term: 'LDAP e LDAPS', definition: 'Protocolo de acesso a diretórios na porta 389; sobre TLS, porta 636.' },
    { term: 'Hipervisor tipo 1 x tipo 2', definition: 'Tipo 1 roda direto no hardware (ESXi, Hyper-V); tipo 2 roda sobre um SO (VirtualBox).' },
  ],
  references: [
    { title: 'TANENBAUM, A.; BOS, H.', detail: 'Sistemas Operacionais Modernos. Pearson.' },
    { title: 'SILBERSCHATZ, A.; GALVIN, P.; GAGNE, G.', detail: 'Fundamentos de Sistemas Operacionais. LTC.' },
    { title: 'Microsoft Learn', detail: 'Documentação do PowerShell (about_Execution_Policies, about_Pipelines) e do Active Directory Domain Services.' },
    { title: 'IETF RFC 4511', detail: 'Lightweight Directory Access Protocol (LDAP): The Protocol.' },
    { title: 'IETF RFC 4120', detail: 'The Kerberos Network Authentication Service (V5).' },
    { title: 'Páginas de manual do Linux (man7.org)', detail: 'ps(1), kill(1), signal(7), chmod(1), find(1), systemctl(1), namespaces(7), cgroups(7).' },
  ],
  lessonIds: ['lic.infra.03'],
};

export const licoesInfraSo: Lesson[] = [
  {
    id: 'lic.infra.03',
    chapterId: 'cap.infra.03',
    title: 'Sistemas operacionais e serviços de diretório',
    goal: 'Processos, memória, permissões, shell, PowerShell, Active Directory, LDAP, hipervisores e containers.',
    cards: [
      { title: 'Processos e permissões', body: '`kill PID` envia **SIGTERM (15)**; `kill -9` envia **SIGKILL**. *nice*: **-20** mais prioritário, **19** menos.\n\nr=4, w=2, x=1. **750** = `rwxr-x---`; **640** = `rw-r-----`. `chown user:grupo`. Sticky bit em `/tmp`.' },
      { title: 'Shell e PowerShell', body: '`grep` busca **no conteúdo**; `find` busca **arquivos**. `>` sobrescreve, `>>` acrescenta, `2>&1` junta erros.\n\nPowerShell: Verbo-Substantivo, pipeline de **objetos**, `Where-Object { $_.Status -eq \'Stopped\' }`. **RemoteSigned**: locais rodam, baixados exigem assinatura.' },
      { title: 'Diretório e virtualização', body: 'Floresta > árvore > domínio > **OU** (GPO e delegação). GPO em ordem **LSDOU**. Kerberos: KDC no DC, TGT, porta 88.\n\nLDAP **389**, LDAPS **636**. DN: `CN=...,OU=...,DC=...`.\n\nHipervisor **tipo 1** no hardware; **tipo 2** sobre um SO. Containers: **namespaces + cgroups**, núcleo compartilhado.' },
    ],
    questionIds: Array.from({ length: 13 }, (_, i) => `q.infra.03.${String(i + 1).padStart(3, '0')}`),
  },
];
