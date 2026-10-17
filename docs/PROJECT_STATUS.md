# Estado do projeto (atualizado em 2026-10-17)

## Funciona e foi testado
| Funcionalidade | Evidência |
|---|---|
| Leitor do capítulo (sumário, busca com destaque, marcadores, retomada pela última seção, fonte A−/A+, tema claro/escuro, glossário, referências, marcar seção lida) | Teste de fluxo `flow.test.tsx` + inspeção visual 390×844 |
| Lições (cartões → 10 questões → correção comentada → resultado) | `flow.test.tsx` |
| Histórico com filtros (todas/certas/erradas), indicando pendente/salvo | Build + inspeção de código (sem teste dedicado) |
| Revisão de erradas até acertar | `flow.test.tsx`, `study.test.ts` |
| XP único, níveis, progresso/domínio por tópico, recomendação com motivo | `study.test.ts` |
| Persistência local (visitante e por usuário) | `flow.test.tsx` |
| Fusão entre dispositivos / migração visitante→conta | `merge.test.ts` |
| Banco Supabase: 6 tabelas, RLS, privilégios, trigger de perfil, unicidade de XP | `supabase/tests/rls_check.sql` executado no banco remoto (13/13 esperados), advisors de segurança sem alertas |
| Integridade do conteúdo (gabarito, comentários, tópicos do edital, nunca 'oficial') | `content.test.ts` |
| Edital oficial (consolidado 15/09/2026) transcrito: provas, pesos, nº de questões, regras da discursiva, 68 tópicos do Anexo II | Conferido contra o PDF; `npm test` |
| Tela do edital com status de verificação e cobertura por tópico | Build |
| Central de treino (`/treino`) | Captura mobile |
| Simulado: escolha de tópicos, 10–40 questões, tempo livre ou 2–3 min/questão, entrega automática no fim do tempo, boletim por tópico, histórico | `training.test.ts`, `flow.test.tsx`, captura |
| Estudo de caso: 2 enunciados autorais, orientação com critérios pedagógicos, editor com estimativa de linhas e salvamento automático, entrega, autoavaliação, resposta-modelo comentada | `training.test.ts`, captura |
| Flashcards com repetição espaçada (SM-2 simplificado) a partir dos glossários (29 cartões) | `training.test.ts`, `flow.test.tsx` |
| Sincronização dessas três áreas com o Supabase (tabelas novas com RLS) | RLS verificado no remoto (`rls_check_02.sql`); envio pelo app não testado (rede) |
| Visual de livro medieval (couro, pergaminho, capitulares, capas) | Capturas mobile |
| Planejador (`/plano`): ordem do dia congelada no aparelho, atividades marcadas pelo estudo real, revisão de erros, flashcards, estudo de caso semanal (1º dia), simulado semanal (último dia), leitura e lições; dias de descanso sem culpa; previsto/lido/respondido/domínio; preferências sincronizadas | `planner.test.ts`, captura |
| App Android nativo (Capacitor), APK compilado e publicado pelo CI com download no site | Execução 11 do workflow; APK inspecionado (assinatura, conteúdo). Não testado em aparelho físico |
| Gamificação: mapa do reino (`/reino`), ficha do personagem (`/personagem`) com título, sequência, missões semanais com resgate de XP, 12 selos e inventário de artefatos | `game.test.ts`, capturas |

## Implementado, mas NÃO testado ponta a ponta
- **Sincronização real com Supabase e Auth (cadastro, login, recuperação de senha) pelo app.** O container bloqueia `*.supabase.co`; o caminho SQL foi validado, o cliente HTTP não. Testar no navegador do celular/PC.
- Confirmação de e-mail: depende da configuração padrão do Supabase Auth (provavelmente ativa). URL de redirecionamento precisa ser cadastrada ao publicar.

## Incompleto / não iniciado
- Cobertura do edital: 34 de 68 tópicos oficiais com material (Segurança, Banco de Dados e Governança completos; Legislação de TI com LC 205 e normativos do TCE-GO só em panorama) (Criptografia; IA: LLM, contexto, IA generativa/RAG, agentes, MCP, qualidade; Dev: APIs, autenticação; Infra: redes, perímetro, nuvem; Dados: modelagem, SQL, SGBDs, NoSQL, governança; Governança de TI: estratégia, ITIL, projetos, contratações, governo digital).
- Narrativa (aguarda decisões: protagonista, conflito, personagens), Capacitor/Android, lembretes.

## Conhecido
- Bundle JS ~660 kB (sem code-splitting) — aceitável por ora.
- Ao publicar em hospedagem estática é preciso fallback de SPA.
