# Arquitetura

```
src/
  content/                 # conteúdo versionado (independente das telas)
    types.ts               # modelo: Contest, Discipline, Topic, Grimoire, Chapter, Section, Lesson, Question
    index.ts               # registro central + consultas (getChapter, questionsForContest…)
    contests/tce-go-2026/  # dados do concurso (com status de verificação)
    grimoires/seguranca/   # capítulos (.md por seção), questões e lições
  lib/
    model.ts               # tipos dos dados do usuário + pendências de sync
    study.ts               # regras puras: respostas, XP único, revisão, progresso, recomendação
    merge.ts               # fusão determinística local×remoto
    sync.ts                # pull → merge → push (idempotente) com o Supabase
    storage.ts             # localStorage por dono (visitante ou user id) + preferências
    supabase.ts            # cliente (URL + chave publicável)
  app/StudyProvider.tsx    # estado global, auth, migração visitante→conta, gatilhos de sync
  app/prefs.tsx            # tema e tamanho da fonte
  components/              # Layout (cabeçalho + navegação inferior), Markdown, QuestionCard
  pages/                   # Dashboard, Library/Grimoire, Reader, Lesson, Review, History, Progress, Edital, Account
supabase/migrations/       # SQL versionado
supabase/tests/rls_check.sql
```

## Fluxo de dados
1. Toda ação (responder, ler, marcar) passa por uma função pura de `study.ts`, que devolve o novo `StudyData` e registra o id em `pending`.
2. `StudyProvider.update` grava imediatamente no `localStorage` (`cronicas:v1:<dono>`).
3. Com sessão ativa, `syncAll`: puxa o remoto, funde (`mergeData`), envia pendências com `upsert` idempotente, limpa o que foi confirmado. Dispara ao entrar, 1,5 s após mudanças, ao voltar online e ao reabrir a aba; em erro, tenta de novo a cada 30 s.
4. A UI mostra o estado (Local / Sincronizado / pendentes / Offline / Erro) e o histórico marca cada resposta como "pendente" ou "salvo no servidor".

## Multi-concurso
Telas usam `DEFAULT_CONTEST_ID` e consultas do registro; um novo concurso = nova pasta em `content/contests` + grimórios com `contestId`. `profiles.active_contest_id` já existe para a seleção futura.
