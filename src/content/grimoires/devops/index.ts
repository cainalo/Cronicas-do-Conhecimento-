import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-entrega/01-git.md?raw';
import c1s2 from './cap01-entrega/02-cicd.md?raw';
import c2s1 from './cap02-plataforma/01-iac-containers.md?raw';
import c2s2 from './cap02-plataforma/02-observabilidade.md?raw';

export const grimorioDevops: Grimoire = {
  id: 'grim.devops',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.devops',
  title: 'DevOps e Engenharia de Entrega',
  description: 'Como entregar mudanças com segurança e previsibilidade: Git e branching, pipelines de CI/CD, infraestrutura como código, contêineres, Kubernetes e observabilidade.',
  chapterIds: ['cap.devops.01', 'cap.devops.02'],
};

export const capDevopsEntrega: Chapter = {
  id: 'cap.devops.01',
  grimoireId: 'grim.devops',
  number: 1,
  title: 'Versionar e Entregar',
  subtitle: 'Git, branching, pull requests e pipelines',
  topicIds: ['ti.devops.git', 'ti.devops.cicd'],
  review: 'nao-revisado',
  estimatedMinutes: 35,
  sections: [
    { id: 'git', title: '1. Git, branching e pull requests', body: c1s1 },
    { id: 'cicd', title: '2. CI/CD, ambientes e ferramentas', body: c1s2 },
  ],
  glossary: [
    { term: 'git fetch', definition: 'Baixa as novidades do remoto sem alterar o branch atual.' },
    { term: 'git revert', definition: 'Cria um commit que desfaz outro, preservando o histórico.' },
    { term: 'git rebase', definition: 'Reaplica commits sobre outra base; reescreve o histórico.' },
    { term: 'Git Flow', definition: 'Branches main e develop, mais feature, release e hotfix.' },
    { term: 'Trunk-based', definition: 'Integração no tronco ao menos diária, com feature flags.' },
    { term: 'Pull request', definition: 'Pedido de integração com revisão de código e pipeline.' },
    { term: 'Integração contínua', definition: 'Integrar com frequência, com build e testes automáticos a cada integração.' },
    { term: 'Entrega contínua', definition: 'Toda versão aprovada fica pronta para produção; publicação manual.' },
    { term: 'Implantação contínua', definition: 'Tudo o que passa no pipeline vai automaticamente para produção.' },
    { term: 'Blue-green', definition: 'Dois ambientes idênticos; troca-se o tráfego de uma vez.' },
    { term: 'Canary', definition: 'Nova versão primeiro para uma pequena fatia dos usuários.' },
    { term: 'Runner', definition: 'Máquina que executa os jobs de um pipeline (GitHub Actions, GitLab).' },
  ],
  references: [
    { title: 'CHACON, S.; STRAUB, B.', detail: 'Pro Git. Apress (disponível em git-scm.com/book).' },
    { title: 'HUMBLE, J.; FARLEY, D.', detail: 'Entrega Contínua. Bookman.' },
    { title: 'Documentação oficial', detail: 'GitHub Actions, GitLab CI/CD e Jenkins Pipeline.' },
  ],
  lessonIds: ['lic.devops.01'],
};

export const capDevopsPlataforma: Chapter = {
  id: 'cap.devops.02',
  grimoireId: 'grim.devops',
  number: 2,
  title: 'Plataforma e Observabilidade',
  subtitle: 'IaC, contêineres, Kubernetes, métricas, logs e traces',
  topicIds: ['ti.devops.iac', 'ti.devops.containers', 'ti.devops.observabilidade'],
  review: 'nao-revisado',
  estimatedMinutes: 35,
  sections: [
    { id: 'iac-containers', title: '1. Infraestrutura como código, Docker e Kubernetes', body: c2s1 },
    { id: 'observabilidade', title: '2. Observabilidade e indicadores', body: c2s2 },
  ],
  glossary: [
    { term: 'Infraestrutura como código', definition: 'Infraestrutura descrita em arquivos versionados e aplicada por ferramentas.' },
    { term: 'Idempotência', definition: 'Aplicar várias vezes leva ao mesmo resultado.' },
    { term: 'Deriva de configuração', definition: 'Diferença entre o código e o ambiente real.' },
    { term: 'Imagem de contêiner', definition: 'Modelo somente leitura, em camadas, construído por um Dockerfile.' },
    { term: 'Docker Compose', definition: 'Define e sobe vários contêineres de uma aplicação num arquivo.' },
    { term: 'Pod', definition: 'Menor unidade implantável do Kubernetes.' },
    { term: 'Deployment', definition: 'Mantém réplicas de Pods e faz atualizações graduais.' },
    { term: 'Trace', definition: 'Caminho de uma requisição entre serviços, em spans.' },
    { term: 'OpenTelemetry', definition: 'Padrão aberto para gerar e coletar métricas, logs e traces.' },
    { term: 'SLO', definition: 'Meta interna para um indicador de serviço (SLI).' },
    { term: 'Sinais dourados', definition: 'Latência, tráfego, erros e saturação.' },
  ],
  references: [
    { title: 'MORRIS, K.', detail: 'Infrastructure as Code. O’Reilly.' },
    { title: 'Documentação oficial', detail: 'Docker, Docker Compose e Kubernetes (kubernetes.io/docs).' },
    { title: 'BEYER, B. et al.', detail: 'Site Reliability Engineering. O’Reilly (Google).' },
    { title: 'OpenTelemetry', detail: 'Documentação em opentelemetry.io.' },
  ],
  lessonIds: ['lic.devops.02'],
};

export const licoesDevops: Lesson[] = [
  {
    id: 'lic.devops.01',
    chapterId: 'cap.devops.01',
    title: 'Do Cais ao Mar',
    goal: 'Comandos e conceitos do Git, Git Flow × trunk-based, pull requests, CI/CD, ambientes, estratégias de implantação e ferramentas.',
    cards: [
      { title: 'Git', body: '`fetch` só baixa; `pull` = fetch + merge. **`revert`** desfaz com novo commit; **`rebase`** reescreve histórico.\n\nGit Flow: main, develop, feature, release, hotfix. **Trunk-based**: integração diária + feature flags.' },
      { title: 'CI/CD', body: 'CI: build e testes a cada integração. **Entrega** contínua: pronta, publicação manual. **Implantação** contínua: automática.\n\nBlue-green troca tudo; **canary** vai aos poucos. Construa **uma vez**.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.devops.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.devops.02',
    chapterId: 'cap.devops.02',
    title: 'Navios em Frota',
    goal: 'IaC declarativa e idempotente, Docker e Compose, objetos do Kubernetes, métricas, logs, traces, SLI/SLO/SLA e alertas.',
    cards: [
      { title: 'Plataforma', body: 'IaC **declarativa** = estado desejado; idempotente.\n\nContêiner **compartilha o kernel**; VM tem SO próprio. Kubernetes: **Pod**, Deployment, Service, Ingress, ConfigMap/Secret.' },
      { title: 'Observabilidade', body: '**Métricas**, **logs** estruturados e **traces** com spans, ligados por ID de correlação.\n\nSLI mede, **SLO** é meta interna, **SLA** é acordo. Alerta por **sintoma**.' },
    ],
    questionIds: Array.from({ length: 10 }, (_, i) => `q.devops.02.${String(i + 1).padStart(3, '0')}`),
  },
];
