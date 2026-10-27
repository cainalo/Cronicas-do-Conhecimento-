# Arquitetura e manutenção

Este documento descreve a estrutura real do Crônicas do Conhecimento e define os limites que devem ser preservados durante refatorações. O objetivo é reduzir acoplamento e custo de carregamento **sem alterar rotas, conteúdo, progresso, aparência ou comportamento de estudo**.

## 1. Caminho de inicialização

`index.html` → `src/main.tsx` → `src/App.tsx` → provedores globais → React Router → `Layout` → página e componentes.

- `src/main.tsx`: aplica tema/preferências antes da primeira pintura, inicializa integrações nativas e monta o React.
- `src/App.tsx`: declara provedores e rotas. Não deve concentrar regras de estudo, persistência ou conteúdo.
- `src/app/StudyProvider.tsx`: estado de estudo, autenticação e sincronização.
- `src/app/prefs.tsx` e `src/app/fx.tsx`: preferências visuais e efeitos globais.
- `src/components/Layout.tsx`: estrutura persistente de navegação; rotas internas não devem recriar sua lógica.

## 2. Mapa de diretórios

```
src/
  app/                 # estado global e integrações de aplicação
  components/          # componentes de interface reutilizáveis
  content/
    contests/          # editais, tópicos e regras específicas por concurso
    grimoires/         # conteúdo editorial, organizado por disciplina/capítulo
    micro/             # séries didáticas progressivas e checagens
    narrated/          # roteiros e dados da aula audiovisual
    game/              # material de apoio da trilha e atividades contextualizadas
    index.ts           # registro canônico e consultas do conteúdo
    types.ts           # contratos TypeScript do conteúdo
  lib/                 # regras e serviços sem responsabilidade de tela
  pages/               # telas ligadas às rotas
  styles/              # estilos globais e identidade visual
  test/                # testes de domínio, componentes e regressões
android/               # invólucro Capacitor e projeto nativo
supabase/
  migrations/          # alterações SQL versionadas
  tests/               # verificações de políticas e acesso
scripts/               # automações de QA reproduzíveis
docs/                  # decisões, arquitetura, cobertura e handoffs
.github/workflows/     # CI e publicação
```

Os diretórios acima são limites de responsabilidade, não uma exigência de criar um arquivo por abstração. Evite arquivos-curinga, wrappers que apenas encaminham props ou camadas sem regra própria.

## 3. Limites entre camadas

### Conteúdo — `src/content/`
O conteúdo é dado versionado e não deve depender de componentes de página. `src/content/index.ts` é o registro canônico: os módulos declaram concursos, grimórios, capítulos, lições, questões, microaulas e material narrado; as telas consultam as funções e coleções exportadas dali.

Regras:
- IDs são contratos persistentes: não renomear IDs de capítulo, seção, lição, questão ou série sem migração e testes.
- Questões devem declarar origem e estado de revisão; conteúdo autoral não pode ser rotulado como oficial.
- História e afirmações técnicas devem ter fonte ou linguagem que explicite os limites da evidência.
- As séries micro devem ligar cada questão à seção correta e manter ordem única.
- Não duplicar uma questão nem uma série em um módulo novo quando ela já existe no registro.

### Regras de domínio — `src/lib/`
Funções de pontuação, revisão, checkpoint, fusão e ordenação devem ser puras sempre que possível. Elas recebem dados e devolvem resultados; não leem DOM, não importam páginas e não fazem efeitos de rede dentro de cálculos puros.

- `study.ts`: regras de progresso e domínio.
- `storage.ts`: persistência local e preferências.
- `merge.ts` / `sync.ts`: fusão local-remoto e sincronização.
- `activities.ts`: contratos e regras das atividades interativas.
- Os nomes reais dos módulos devem ser consultados antes de criar uma segunda implementação.

### Estado e integrações — `src/app/`
O estado global deve permanecer pequeno e explícito. Persistência, login, áudio e APIs nativas ficam nos módulos de aplicação/serviço apropriados, e não dentro de componentes visuais. Nenhum segredo privado pode ser incluído no bundle; chave publicável do Supabase continua protegida por RLS.

### Interface — `src/pages/` e `src/components/`
Páginas compõem fluxos; componentes reutilizáveis não devem importar páginas. A interface não deve reimplementar regras de estudo que já pertençam a `src/lib/`.

### Banco e Android
Toda alteração de banco deve vir em migração versionada e considerar RLS. Código nativo deve ser testado em build Android; sucesso no navegador não comprova modo imersivo ou comportamento do sistema operacional em aparelho real.

## 4. Carregamento e desempenho

### Rotas sob demanda
As rotas abaixo usam `React.lazy` dentro de uma fronteira `Suspense`, para evitar que o código de telas secundárias seja necessário no carregamento inicial.

- **Telas pesadas:** `/missao/:id` (`Mission.tsx`), `/simulador` e `/simulador/:id` (`Scenarios.tsx`), `/sala` (`TeachersRoom.tsx`), `/escritorio` (`World.tsx`), `/aula-narrada/:id` (`Narrated.tsx`) e `/slides` (`ReviewSlides.tsx`).
- **Histórico e ferramentas:** `/historico`, `/progresso`, `/edital`, `/download`, `/personalizar`, `/video/:id`, `/flashcards`, `/relampago`, `/plano`, `/simulado`, `/simulado/:id`, `/discursiva` e `/discursiva/:id`.
- **Conta:** `/conta` e todas as subrotas de acesso, sincronização, aparência, sons, dados, sobre e tela.
- **Fallback:** a rota não encontrada também é carregada sob demanda.

Os caminhos das rotas, os provedores globais e o layout externo não mudam. As telas comuns de navegação e estudo (início, trilha, biblioteca, leitor, aprender, prática, lição e revisão) permanecem estáticas para priorizar os fluxos mais usados. Na primeira abertura de uma rota adiada, o espaço de conteúdo fica vazio enquanto o módulo é transferido; o cabeçalho e a navegação externa permanecem montados.

O script `scripts/e2e-layout.mjs` visita as rotas adiadas principais e as subpáginas de Conta em duas dimensões móveis, com e sem cartões de vidro. Uma alteração de rota só pode ser considerada estável depois que esse gate passar no CI.

- Protótipo de alinhamento por timestamps foi removido por não ter consumidor em produção; a sincronização da aula narrada continua estimada. Não manter helpers sem chamada real no caminho de execução.
### Dívida de desempenho conhecida
- `src/content/index.ts` agrega muitos módulos de conteúdo por importação estática. Isso preserva consultas síncronas e a integridade do registro, mas pode manter conteúdo de muitas disciplinas no bundle inicial.
- O ponto acima só deve ser alterado depois de medir os chunks e mapear todos os consumidores das funções síncronas. Não converter a API de conteúdo em assíncrona de forma ampla como otimização especulativa.
- Não adicionar novas bibliotecas para resolver problemas que possam ser resolvidos com capacidades existentes.
- Não remover fontes, assets ou conteúdo apenas porque uma busca simples não localizou uso; verificar referências dinâmicas, rotas, importação de dados e testes.
- Não afirmar melhoria percentual de velocidade sem comparar build/arquivos e uma medição reproduzível.

### Método para otimizar
1. Guardar o SHA e a referência do build de base.
2. Alterar uma camada por vez.
3. Rodar `npm test`, `npm run build`, `npm run report:bundle` e `npm run test:e2e`.
4. Comparar tamanho dos chunks e erros/rotas visitadas.
5. Inspecionar screenshots em 360×640 e 390×844; testar Android real quando a mudança envolve áudio, tela cheia, teclado, barras do sistema ou persistência.
6. Reverter a otimização se exigir mudanças visíveis não solicitadas ou piorar confiabilidade.

## 5. Comandos oficiais de validação

```bash
npm ci
npm test
npm run build
npm run test:e2e
npm run test:visual
npx cap sync android
```

O workflow de publicação também compila o APK. A branch de manutenção usa `.github/workflows/validate-branch.yml` para validar sem atualizar o site ou `gh-pages`.

Validação automatizada não substitui revisão editorial, conferência das fontes, screenshots inspecionadas a olho nem teste físico de Android.

## 6. Regras de refatoração sem mudança do produto

- Preservar textos, IDs, rotas, navegação, armazenamento, versão de dados locais e fluxo de autenticação.
- Tratar mudanças de layout e animação como alterações visuais, mesmo quando feitas em CSS.
- Acrescentar teste de regressão antes de remover workaround que protege uma falha anteriormente observada.
- Reutilizar os contratos já existentes; evitar tipos ou helpers duplicados com nomes diferentes.
- Atualizar documentação quando a arquitetura realmente mudar, não copiar o mesmo texto para vários arquivos.
- Não marcar trabalho como concluído enquanto um comando ou inspeção obrigatória estiver pendente.
- Não publicar nem alternar a assinatura Android sem autorização explícita e plano de compatibilidade das instalações existentes.

## 7. Higiene do repositório

A limpeza é baseada em evidência:
1. procurar usos estáticos e dinâmicos, rotas, referências de conteúdo e testes;
2. confirmar se o arquivo contém dados únicos;
3. remover em lote pequeno, com teste e diff revisado;
4. preservar logs de decisões relevantes, mas resumir duplicações em vez de criar novos documentos paralelos;
5. manter apenas branches que tenham propósito ativo, publicação, revisão aberta ou trabalho único ainda não recuperado. Uma branch só pode ser eliminada após verificar o conteúdo exclusivo e preservar o que for aproveitável.


### Inventário de branches — 27/10/2026
As branches são refs GitHub independentes; fechar um PR não apaga sua branch. Estado apurado comparando os arquivos e commits com a branch de manutenção:

| Branch | Disposição nesta rodada | Motivo |
|---|---|---|
| `main` | Manter | Referência canônica do código. |
| `claude/cronicas-conhecimento-estudos-jgbofo` | Manter | Branch que constrói/publica site e APK; assinatura Android exige estabilidade. |
| `gh-pages` | Manter | Saída publicada do site/APK. |
| `gpt/ingles01-microaulas-2026-10-27` | Manter | Branch ativa para arquitetura, QA e próxima expansão de conteúdo. |
| `gpt/ia04-etica-dados-2026-10-27` | Candidata a exclusão | Comparação retornou zero commits/arquivos exclusivos em relação à branch de manutenção. |
| `codex/qa-visual-audit-20261026` | Candidata após validar QA | Script de auditoria, comando e checklist foram copiados; o workflow separado e alterações no pipeline de publicação foram intencionalmente descartados. |
| `gpt/narration-timeline-manifest-2026-10-27` | Candidata após revisão final | Variante do protótipo de timeline, agora removido do runtime por estar sem consumidor. |
| `gpt/narrated-timeline-review-2026-10-27` | Fechada sem integração | PR #9 foi encerrado; adaptador TTS e integração temporal foram adiados. Preservar a branch como referência até decidir eliminar o experimento. |
| `gpt/auditoria-narradas-sync-2026-10-27` | Revisão de conteúdo restante | Continha um teste estrutural de narração que foi incorporado à suíte central; a nota longa de auditoria permanece referência histórica. |
| `gpt/narradas-conteudo-voz-2026-10-26` | Não excluir ainda | Traz versões alternativas de roteiros narrados; comparar editorialmente antes de descartar qualquer conteúdo exclusivo. |

**Limite operacional:** a conexão GitHub usada nesta sessão não oferece uma operação para excluir refs de branches. Não apaguei nem movi branches por métodos indiretos. A exclusão física das candidatas precisa ser feita pelo GitHub após o gate da branch central passar e o conteúdo exclusivo ser revisado.

## 8. Estado desta rodada — 27/10/2026

- A divisão de rotas secundárias por importação sob demanda foi implementada em `src/App.tsx`, com fronteira `Suspense` acessível; o gate de layout foi ampliado para 34 rotas e o audit visual por screenshots foi consolidado em `scripts/e2e-visual-audit.mjs`. A medição de chunks e a aprovação do CI seguem pendentes.
- O baseline do workflow `40444629202` passou no commit `d2f6e93` e publicou a versão `0.1.351`; isso não valida automaticamente mudanças posteriores.
- O código novo precisa passar pelo workflow de validação isolada antes de ser incorporado a uma branch de publicação.
- Ainda não foi feita uma remoção automática de arquivos ou branches: o inventário identificou trabalho exclusivo e PRs abertos que precisam de revisão individual.
