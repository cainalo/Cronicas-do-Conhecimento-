# Saberio

Plataforma de estudos gamificada **Saberio**, com foco inicial no concurso **TCE-GO 2026 — Técnico de Controle Externo, Tecnologia da Informação (FCC)**. A experiência combina uma trilha guiada, microaulas, atividades interativas, aulas narradas, revisão espaçada e simulados. A identidade visual é moderna, com cartões visuais e leitura contínua — sem narrativa medieval ou formato de livro físico.

## Recursos atuais
- Trilha guiada com continuidade, progresso por trechos e atividades práticas.
- Conteúdo organizado por disciplina, com textos responsivos, referências e glossários.
- Microaulas, questões comentadas, revisão de erros, flashcards e simulados.
- Aulas narradas com cenas visuais, voz, legenda sincronizada e transcrição.
- Estudos de caso, desafios aplicados, vídeos e material de referência.
- Conta e sincronização com Supabase, configurações e download Android.

## Situação editorial
A matriz associa tópicos do edital a materiais, mas associação não significa validação pedagógica integral. A legislação do TCE-GO e algumas normas locais ainda precisam de conferência com documentos oficiais; as questões autorais também precisam de revisão técnica e pedagógica. Consulte `docs/CONTENT_COVERAGE.md` e `docs/PRODUCT_AUDIT_2026-10-27.md`.

## Requisitos e comandos
Node.js 20+ (testado com 22) e npm.

```bash
npm ci
npm run dev
npm test
npm run build
npm run test:e2e
npm run test:visual
npm run report:bundle
npm run preview
```

## Configuração
O cliente usa o projeto Supabase `cronicas-do-conhecimento` com chave publicável e políticas RLS. Para outro projeto, copie `.env.example` para `.env.local`.

A hospedagem estática deve ter fallback de SPA para `index.html`. Para links de confirmação e recuperação de senha, cadastre a URL publicada em Supabase → Authentication → URL Configuration.

## Arquitetura e colaboração
Leia `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md` e `docs/SESSION_HANDOFF.md`. As sessões registram decisões e trabalho compartilhado em `src/app/SESSION_COORDINATION.md`.


## Marca Saberio
Saberio é a nova identidade do produto. O símbolo mantém um C aberto com uma ponte vermelha — a conexão que permite atravessar da dúvida ao conhecimento. O wordmark é desenhado com caminhos SVG próprios e não depende de uma fonte tipográfica. O nome é uma proposta de produto; antes de uso comercial definitivo, confirme a disponibilidade jurídica e de domínio.
