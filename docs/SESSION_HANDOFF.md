# Handoff de sessão

**Última atualização:** 2026-10-17 (sessão 1)
**Fase:** C em andamento (conteúdo e persistência).

## Situação atual
- App publicado automaticamente no GitHub Pages a cada push (workflow `.github/workflows/pages.yml` → branch `gh-pages`). Endereço: https://cainalo.github.io/Cronicas-do-Conhecimento-/ (o usuário precisa ter ativado Settings → Pages → `gh-pages` / root; confirmar com ele).
- Edital oficial conferido (`docs/fontes/`), 68 tópicos em `contest.ts`.
- Conteúdo: Códice das Sete Chaves (Criptografia), Livro dos Autômatos (IA, 2 caps.) e Tratado das Pontes e dos Selos (Dev: APIs; identidade). 8 lições, 84 questões, 3 estudos de caso. Cobertura 9/68 tópicos.
- Visual de livro medieval gótico (ver `docs/DESIGN_SYSTEM.md`), sem "cara de IA".
- Fase D completa: simulados, estudos de caso (2), flashcards e planejador, todos sincronizáveis (migrações 2 e 3 aplicadas, RLS verificado). PWA offline testado.
- Supabase com RLS verificado; login/sync pelo navegador ainda **não testados pelo usuário**.

## Testes
`npm test` 116/116; `tsc -b` OK; build OK; capturas 390×844 sem overflow nem erros.

## Pendências com o usuário
- Confirmar que o site abriu no celular e se o login/sincronização funcionaram.
- Configurar Site URL/Redirect URLs no Supabase (passo descrito em `docs/MOBILE_AND_OFFLINE.md`).
- Rodada criativa de `OPEN_QUESTIONS.md`.

## Próxima tarefa exata
1. **Grimório de SO, Redes e Computação em Nuvem** (5 questões): `src/content/grimoires/infra/` (`binding: 'castanho'`). Cap. 1 Redes: TCP/IP, IPv4/IPv6 (sub-redes, CIDR), DNS, DHCP, HTTP/2, HTTP/3 (QUIC), HTTPS, SMTP, FTP, SSH, VPN, proxies, balanceamento, firewalls (`ti.infra.redes`, `ti.infra.perimetro`). Cap. 2 Nuvem: IaaS/PaaS/SaaS, serverless, escalabilidade, alta disponibilidade, nuvem híbrida (`ti.infra.nuvem`). ~12 questões por capítulo, 1 lição por capítulo, glossário. Verificar com `npm test`; atualizar `CONTENT_COVERAGE.md`.
2. Depois: Segurança restante (OWASP Top 10:2025, Zero Trust, ISO 27000, IAM, continuidade), Banco de Dados, Governança, Legislação de TI, Eng. de Software, DevOps, Gerais.
3. Fase E (gamificação: missões e conquistas ligadas ao estudo real) e rodada de perguntas criativas de `OPEN_QUESTIONS.md` antes da narrativa.
