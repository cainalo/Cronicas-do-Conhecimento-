O **Git** é um sistema de **controle de versão distribuído**: cada clone tem o histórico completo do repositório, e é possível trabalhar e fazer *commits* sem conexão com um servidor central.

### Do SCCS ao Git

- **1972 a 2000: sistemas centralizados.** O SCCS, nos laboratórios Bell (1972), e depois RCS (1982), CVS (1990) e Subversion (2000) guardavam o histórico num servidor central.
- **2005: o Git.** Quando o núcleo do Linux perdeu a licença gratuita do BitKeeper, Linus Torvalds escreveu o Git, distribuído: cada clone tem o histórico completo.
- **2008 e 2010: GitHub e Git Flow.** O GitHub popularizou o pull request; Vincent Driessen descreveu o Git Flow.

### Três áreas e o ciclo básico

| Área | O que contém |
|---|---|
| **Diretório de trabalho** | Os arquivos como estão no disco |
| **Área de preparação** (*staging*, *index*) | O que vai entrar no próximo *commit* |
| **Repositório** (`.git`) | O histórico de *commits* |

```bash
git clone https://exemplo/repo.git   # copia o repositório com todo o histórico
git switch -c feature/filtro          # cria e muda para um novo branch
git add src/filtro.ts                 # prepara a alteração
git commit -m "Filtra contratos por fornecedor"
git push -u origin feature/filtro     # envia o branch ao remoto
git pull                              # fetch + merge (ou rebase) do remoto
```

Comandos que caem em prova:

| Comando | Para quê |
|---|---|
| `git status` / `git log` / `git diff` | Ver o estado, o histórico e as diferenças |
| `git fetch` | **Baixa** as novidades do remoto **sem** alterar o branch atual |
| `git pull` | `fetch` seguido de integração (merge ou rebase) |
| `git merge` | Integra outro branch; pode criar um *commit* de merge |
| `git rebase` | Reaplica os *commits* sobre outra base, deixando o histórico linear. **Reescreve** o histórico: não se faz em branch compartilhado |
| `git revert <commit>` | Cria um **novo** *commit* que desfaz outro, preservando o histórico; seguro em branch compartilhado |
| `git reset` | Move o ponteiro do branch (`--soft`, `--mixed`, `--hard`); `--hard` descarta alterações locais |
| `git stash` | Guarda alterações não confirmadas temporariamente |
| `git cherry-pick` | Aplica um *commit* específico em outro branch |
| `git tag` | Marca uma versão (por exemplo, `v1.4.0`) |

O arquivo **`.gitignore`** lista o que não deve ser versionado, como dependências, artefatos de *build* e **arquivos de segredo**. Uma senha enviada por engano continua no histórico mesmo depois de apagada no *commit* seguinte: é preciso **revogá-la**.

### Estratégias de branching

| Estratégia | Como funciona | Combina com |
|---|---|---|
| **Git Flow** | Branches de longa duração `main` (produção) e `develop` (integração), mais `feature/*`, `release/*` e `hotfix/*` | Versões planejadas, várias versões em manutenção |
| **Trunk-based development** | Todos integram no tronco (`main`) **pelo menos diariamente**, com branches curtíssimos ou nenhum; funcionalidades incompletas ficam escondidas por ***feature flags*** | Integração e entrega contínuas, equipes que publicam com frequência |
| **GitHub Flow** | `main` sempre implantável; cada mudança num branch curto com *pull request* | Aplicações web com implantação contínua |

### Pull requests e merge requests

O **pull request** (GitHub) ou **merge request** (GitLab) é o pedido para integrar um branch em outro, com discussão, **revisão de código** e execução automática do *pipeline*. Boas práticas:

- PRs **pequenos** e com descrição clara;
- **proteção de branch**: proibir *push* direto na `main`, exigir aprovação e *pipeline* verde;
- **CODEOWNERS** para indicar revisores obrigatórios por área;
- *squash* ou *merge* conforme a convenção do projeto.

### Pegadinhas

1. "`git fetch` altera os arquivos do branch atual." Falso. Só baixa; quem integra é o merge ou o pull.
2. "Rebase é a forma segura de desfazer um commit já publicado." Falso. Para isso, use `git revert`.
3. "No trunk-based, as features ficam semanas em branches separados." Falso. A integração é ao menos diária.
4. "Git exige conexão permanente com o servidor para fazer commits." Falso. É distribuído.
