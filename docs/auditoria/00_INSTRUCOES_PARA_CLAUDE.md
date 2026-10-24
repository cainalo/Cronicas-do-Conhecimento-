# Instruções obrigatórias para Claude

## Resultado esperado

Corrigir o produto real, não apenas produzir documentação, maquiar telas ou reescrever conteúdo sem integrar o fluxo. O critério de sucesso é que um estudante iniciante consiga abrir o site, tocar em **Continuar**, aprender um conceito de cada vez, verificar se entendeu, receber ajuda específica quando errar e terminar a sessão sabendo exatamente o próximo passo — sem perder o lugar ao sair.

## Antes de editar

1. Confirme `git status`, branch atual, commit-base e diretório raiz. O código auditado está em `claude/cronicas-conhecimento-estudos-jgbofo`; a `main` pode conter só o README.
2. Leia `CLAUDE.md`, `docs/SESSION_HANDOFF.md`, `docs/PROJECT_STATUS.md`, `docs/ROADMAP.md`, `docs/PRODUCT_DECISIONS.md`, `docs/OPEN_QUESTIONS.md`, `docs/TESTING.md` e este pacote; use também `docs/17_INVENTARIO_TELAS_E_COMPONENTES.md` para não deixar rota ou componente compartilhado sem auditoria.
3. Resolva as contradições entre documentos por inspeção do código atual; não confie cegamente em contagens antigas.
4. Rode e registre a linha de base: `npm ci`, `npm test`, `npm run build`. Guarde o resultado, o total de testes e o tamanho real do bundle bruto e gzip. Se um serviço externo não estiver acessível, declare isso.
5. Capture as telas atuais em 390×844, 768×1024 e 1280×800; registre bugs visuais existentes antes de corrigi-los.
6. Inspecione como o progresso é salvo, como o `StudyData` é mesclado e como as migrations do Supabase preservam os usuários atuais.

## Regras invioláveis

- Não fazer reset destrutivo do Supabase; não apagar tabelas, colunas, histórico, perfil, tentativas, XP ou progresso.
- Não expor chaves privadas nem colocar `service_role` no cliente.
- Não declarar questões como oficiais sem prova de origem; manter banca, cargo, ano, caderno, número e fonte rastreáveis quando houver questão oficial.
- Não trocar o concurso-alvo: o projeto atual usa TCE-GO 2026, Técnico de Controle Externo — TI (B02, FCC), salvo evidência clara de que o usuário mudou de objetivo.
- Não remover o aplicativo Android/Capacitor, o modo visitante, a persistência local ou a sincronização sem uma razão validada.
- Não introduzir vídeos que iniciem sozinhos, áudio automático, recursos sem fallback, dependências pagas ou serviços com custo não aprovado.
- Não refatorar o aplicativo inteiro em uma tacada. Entregar fatias verticais pequenas, funcionais e testadas.
- Não considerar a tarefa concluída só porque `npm run build` passa. O comportamento de aprendizagem, a retomada, a interface móvel e a regressão visual também são critérios.
- Atualizar documentação de sessão/status/roadmap e registrar o que foi realmente testado. Não inventar resultados.

## Ordem de execução

1. **Fase 0 — baseline e preservação:** testes, build, estado do Git, banco, screenshots e inventário real.
2. **Fase 1 — sequência única e retomada:** um modelo central de trilha e checkpoint persistente; unificar todos os botões “Continuar/Próxima/Começar”.
3. **Fase 2 — piloto pedagógico:** reformular uma seção difícil de Sistemas Operacionais, usando `13_EXEMPLO_AULA_MODELO_LINUX_PROCESSOS.md` como contrato.
4. **Fase 3 — sistema de microaprendizagem e prática adaptativa:** conteúdo em blocos, checagem imediata, feedback diagnóstico e revisão equivalente.
5. **Fase 4 — códice/livro:** retirar rolagem vertical interna do fólio; ajustar paginação para texto, tabelas, código e fontes maiores.
6. **Fase 5 — central Estudos:** biblioteca, trilha guiada, atividades rápidas, videoaulas e materiais externos em uma página clara.
7. **Fase 6 — consistência visual e medieval:** tokens, grid, responsividade, textura discreta, áudio acessível e alinhamento.
8. **Fase 7 — auditoria total de conteúdo e QA:** medir variação, validar fontes, revisar todos os controles, fluxo de volta/retomada, perfis e aparelhos.

## Como trabalhar em cada fase

Para cada fase: (a) identifique arquivos e invariantes; (b) apresente um plano curto no handoff; (c) implemente; (d) escreva/atualize testes antes de ampliar; (e) rode testes e build; (f) capture os tamanhos de tela; (g) verifique teclado, acessibilidade e persistência; (h) atualize `docs/TESTING.md`, `PROJECT_STATUS.md`, `ROADMAP.md`, `SESSION_HANDOFF.md` e `SESSION_LOG.md`; (i) faça commit com descrição objetiva na branch de trabalho. Não avance quando houver regressão P0.

## Critério de parada

Não escale a mudança pedagógica às 112 seções antes de uma seção-piloto ser aprovada pelos critérios objetivos de aprendizagem, navegação, tempo, clareza e retomada. Depois do piloto, faça uma migração sistemática com validação automatizada e inspeção humana por lotes.
