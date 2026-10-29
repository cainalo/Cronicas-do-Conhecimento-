# Crônicas do Conhecimento

Plataforma de estudos gamificada (RPG medieval + trilha estilo Duolingo + grimórios didáticos) para concursos públicos de TI. Primeiro concurso: **TCE-GO 2026 — Técnico de Controle Externo, Tecnologia da Informação (FCC)**.

## O que já dá para fazer
- Ler o grimório **O Códice das Sete Chaves**, cap. 1 — *Criptografia* (6 seções, glossário, referências), com sumário, busca, marcadores, retomada, ajuste de fonte e tema claro/escuro.
- Fazer 2 lições (cartões + 10 questões autorais comentadas cada).
- Revisar questões erradas até acertá-las; consultar histórico com filtros.
- Acompanhar progresso por tópico, XP e nível; recomendação da próxima atividade com justificativa.\n- Explorar a Sala dos Professores em formato de feed social com stories, publicação local de texto/imagem, curtidas e comentários. A publicação nesta etapa é local ao aparelho, não uma rede multiusuário sincronizada.
- Estudar como visitante (dados no aparelho) ou com conta (Supabase Auth), com sincronização entre dispositivos.

## Requisitos
Node.js 20+ (testado com 22) e npm.

## Comandos
```bash
npm install
npm run dev        # http://localhost:5173 (use o IP da rede para abrir no celular)
npm test           # testes unitários e de fluxo (Vitest + Testing Library)
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build
```

## Configuração
O cliente já aponta para o projeto Supabase `cronicas-do-conhecimento` usando a **chave publicável** (segura no cliente; o acesso é limitado por RLS). Para outro projeto, copie `.env.example` para `.env.local` e ajuste.

Ao publicar o build em hospedagem estática, configure *fallback* de SPA (todas as rotas → `index.html`), pois o app usa rotas reais (`/capitulo/...`).

Para os links de confirmação/recuperação de senha funcionarem fora do `localhost`, cadastre a URL do site em Supabase → Authentication → URL Configuration.

## Documentação
Comece por `CLAUDE.md` e `docs/SESSION_HANDOFF.md`. O plano atualizado de continuidade, critérios de aceite e próximas etapas do produto Pórtico está em `docs/PORTICO_IMPLEMENTATION_PLAN.md`.
