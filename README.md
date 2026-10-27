# Crônicas do Conhecimento

Plataforma de estudos gamificada para concursos públicos, com foco inicial no concurso **TCE-GO 2026 — Técnico de Controle Externo, Tecnologia da Informação (FCC)**. O produto usa uma trilha guiada, microaulas, atividades interativas, aulas narradas, revisão espaçada e simulados. A identidade visual é moderna e editorial; não há narrativa medieval ou formato de livro físico.

## O que já está disponível
- Trilha guiada com continuidade, progresso por trechos e atividades práticas.
- Conteúdo organizado por disciplina, com textos responsivos, referências e glossários.
- Microaulas, questões comentadas, revisão de erros, flashcards e simulados.
- Aulas narradas com cenas visuais, voz, legenda sincronizada e transcrição.
- Estudos de caso, desafios aplicados e materiais em vídeo.
- Conta e sincronização com Supabase, configurações e download Android.

## Situação editorial
A matriz de cobertura indica material associado aos tópicos do edital, mas isso não significa domínio ou validação especializada integral. A cobertura jurídica e institucional ainda exige conferência com fontes oficiais, e as questões autorais precisam de revisão técnica e pedagógica. Consulte docs/CONTENT_COVERAGE.md e docs/PRODUCT_AUDIT_2026-10-27.md.

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
O cliente usa o projeto Supabase cronicas-do-conhecimento com chave publicável e políticas RLS. Para apontar para outro projeto, copie .env.example para .env.local.

A hospedagem estática deve ter fallback de SPA para index.html. Para links de confirmação e recuperação de senha, cadastre a URL publicada em Supabase → Authentication → URL Configuration.

## Arquitetura e colaboração
Leia CLAUDE.md, docs/ARCHITECTURE.md, docs/TESTING.md e docs/SESSION_HANDOFF.md. As sessões registram decisões e trabalho compartilhado em src/app/SESSION_COORDINATION.md.
