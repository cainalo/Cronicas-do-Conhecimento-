import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-apis/01-rest.md?raw';
import c1s2 from './cap01-apis/02-formatos.md?raw';
import c1s3 from './cap01-apis/03-graphql-ws.md?raw';
import c1s4 from './cap01-apis/04-openapi.md?raw';
import c2s1 from './cap02-identidade/01-conceitos.md?raw';
import c2s2 from './cap02-identidade/02-oauth.md?raw';
import c2s3 from './cap02-identidade/03-oidc-jwt.md?raw';
import c2s4 from './cap02-identidade/04-resumo.md?raw';

export const grimorioDev: Grimoire = {
  id: 'grim.dev',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.dev',
  title: 'Desenvolvimento de Sistemas',
  description: 'Como os sistemas conversam (REST, GraphQL, WebSockets, OpenAPI), como provam quem pode entrar (OAuth 2.0, OIDC, JWT), os algoritmos e estruturas de dados que os movem e as linguagens em que são escritos (Java, JavaScript/Node, React, Python, TypeScript), com pacotes e publicação.',
  chapterIds: ['cap.dev.01', 'cap.dev.02', 'cap.dev.03', 'cap.dev.04'],
};

export const capDevApis: Chapter = {
  id: 'cap.dev.01',
  grimoireId: 'grim.dev',
  number: 1,
  title: 'APIs e Serviços Web',
  subtitle: 'Integrações e protocolos de APIs web',
  topicIds: ['ti.dev.apis'],
  review: 'nao-revisado',
  estimatedMinutes: 40,
  sections: [
    { id: 'rest', title: '1. APIs RESTful e HTTP', body: c1s1 },
    { id: 'formatos', title: '2. JSON e XML', body: c1s2 },
    { id: 'graphql-ws', title: '3. GraphQL e WebSockets', body: c1s3 },
    { id: 'openapi', title: '4. Documentação com OpenAPI', body: c1s4 },
  ],
  glossary: [
    { term: 'Idempotência', definition: 'Propriedade de uma operação cujo efeito é o mesmo se executada uma ou várias vezes (GET, PUT, DELETE).' },
    { term: 'Stateless', definition: 'Restrição REST: cada requisição traz todo o contexto; o servidor não guarda sessão entre chamadas.' },
    { term: '401 e 403', definition: '401: falta autenticação válida. 403: autenticado, mas sem permissão.' },
    { term: 'XML válido', definition: 'XML bem formado que também obedece a um esquema (DTD ou XSD).' },
    { term: 'GraphQL', definition: 'Linguagem de consulta para APIs com endpoint único, esquema tipado e campos escolhidos pelo cliente.' },
    { term: 'WebSocket', definition: 'Canal full-duplex persistente sobre TCP, iniciado por Upgrade HTTP com resposta 101.' },
    { term: 'OpenAPI', definition: 'Especificação (antiga Swagger) para descrever APIs HTTP em YAML ou JSON.' },
  ],
  references: [
    { title: 'FIELDING, R. T.', detail: 'Architectural Styles and the Design of Network-based Software Architectures. Tese, UC Irvine, 2000.' },
    { title: 'IETF RFC 9110', detail: 'HTTP Semantics (métodos, códigos de status).' },
    { title: 'IETF RFC 8259', detail: 'The JavaScript Object Notation (JSON) Data Interchange Format.' },
    { title: 'W3C', detail: 'Extensible Markup Language (XML) 1.0.' },
    { title: 'IETF RFC 6455', detail: 'The WebSocket Protocol.' },
    { title: 'GraphQL Foundation', detail: 'GraphQL Specification (spec.graphql.org).' },
    { title: 'OpenAPI Initiative', detail: 'OpenAPI Specification (spec.openapis.org).' },
  ],
  lessonIds: ['lic.dev.01'],
};

export const capDevIdentidade: Chapter = {
  id: 'cap.dev.02',
  grimoireId: 'grim.dev',
  number: 2,
  title: 'Identidade e Autorização',
  subtitle: 'OAuth 2.0, OpenID Connect e tokens JWT',
  topicIds: ['ti.dev.auth'],
  review: 'nao-revisado',
  estimatedMinutes: 40,
  sections: [
    { id: 'conceitos', title: '1. Identificação, autenticação e autorização', body: c2s1 },
    { id: 'oauth', title: '2. OAuth 2.0', body: c2s2 },
    { id: 'oidc-jwt', title: '3. OpenID Connect e JWT', body: c2s3 },
    { id: 'resumo', title: '4. Quadro-resumo e pegadinhas', body: c2s4 },
  ],
  glossary: [
    { term: 'MFA', definition: 'Autenticação com fatores de categorias diferentes: saber, ter, ser.' },
    { term: 'OAuth 2.0', definition: 'Framework de autorização delegada: o cliente recebe token com escopo, não a senha do usuário.' },
    { term: 'Client credentials', definition: 'Fluxo OAuth para comunicação entre sistemas, sem usuário.' },
    { term: 'PKCE', definition: 'Extensão do fluxo de código que impede o uso de código interceptado (code verifier/challenge).' },
    { term: 'Bearer token', definition: 'Token usado por quem o possui; deve trafegar só com TLS.' },
    { term: 'OpenID Connect', definition: 'Camada de identidade sobre o OAuth 2.0, com ID Token (JWT) e escopo openid.' },
    { term: 'JWT', definition: 'Token compacto cabeçalho.carga.assinatura em Base64URL; assinado não significa cifrado.' },
    { term: 'Claim', definition: 'Informação declarada em um token (ex.: iss, sub, aud, exp).' },
  ],
  references: [
    { title: 'IETF RFC 6749', detail: 'The OAuth 2.0 Authorization Framework.' },
    { title: 'IETF RFC 6750', detail: 'Bearer Token Usage.' },
    { title: 'IETF RFC 7636', detail: 'Proof Key for Code Exchange (PKCE).' },
    { title: 'IETF RFC 9700', detail: 'Best Current Practice for OAuth 2.0 Security.' },
    { title: 'OpenID Foundation', detail: 'OpenID Connect Core 1.0.' },
    { title: 'IETF RFC 7519', detail: 'JSON Web Token (JWT); RFC 7515 (JWS) e RFC 7516 (JWE).' },
  ],
  lessonIds: ['lic.dev.02'],
};

export const licoesDev: Lesson[] = [
  {
    id: 'lic.dev.01',
    chapterId: 'cap.dev.01',
    title: 'APIs, HTTP e formatos de dados',
    goal: 'Dominar REST, métodos e códigos HTTP, JSON e XML, GraphQL, WebSockets e OpenAPI.',
    cards: [
      {
        title: 'REST em uma frase',
        body: 'Recursos nomeados por URI, manipulados por métodos HTTP, **sem estado** entre requisições.\n\nSeguros: GET, HEAD, OPTIONS. Idempotentes: esses, mais **PUT** e **DELETE**. POST não é idempotente.',
      },
      {
        title: 'Códigos que mais caem',
        body: '**201** criado · **204** sem conteúdo · **304** use o cache · **401** falta autenticar · **403** sem permissão · **404** não existe · **429** excesso de requisições · **503** indisponível.',
      },
      {
        title: 'Outros padrões de integração',
        body: '**GraphQL**: um endpoint, o cliente escolhe os campos. **WebSocket**: canal bidirecional, Upgrade e 101. **OpenAPI**: o contrato da API em YAML ou JSON.',
      },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.dev.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.dev.02',
    chapterId: 'cap.dev.02',
    title: 'Autenticação, autorização, OAuth e JWT',
    goal: 'Distinguir autenticação de autorização e dominar OAuth 2.0, OIDC e JWT.',
    cards: [
      {
        title: 'Quem é e o que pode',
        body: 'Autenticação prova quem é; autorização decide o que pode. **MFA** exige fatores de categorias diferentes.\n\n**OAuth 2.0** autoriza (token com escopo); **OIDC** autentica (ID Token).',
      },
      {
        title: 'Fluxos',
        body: 'Usuário em app ou SPA: **código de autorização com PKCE**. Sistema com sistema: **client credentials**. Implícito e senha: desaconselhados.',
      },
      {
        title: 'JWT',
        body: 'cabeçalho.carga.assinatura em Base64URL. **Assinado não é cifrado.** HS256 = segredo compartilhado; RS256/ES256 = chave privada assina, pública verifica.\n\nValide assinatura, algoritmo, exp, iss e aud.',
      },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.dev.02.${String(i + 1).padStart(3, '0')}`),
  },
];
