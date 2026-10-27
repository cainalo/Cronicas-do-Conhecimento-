# Auditoria de produto e conteúdo — 27/10/2026

## Direção do produto
O Crônicas do Conhecimento é uma plataforma de estudos gamificada para concursos. A gamificação deve servir ao aprendizado (progresso, metas, constância, desafios e revisão), sem universo de fantasia, personagens narrativos, inventários de artefatos, nomes de regiões fictícias ou apresentação de conteúdos como livros físicos.

## Estado funcional observado no repositório
- Trilha com continuidade e registro de trechos estudados.
- Catálogo por disciplina, material de referência responsivo, glossários e fontes.
- Microaulas com explicação, checagem imediata, recuperação, prática cumulativa e questão de prova.
- Banco de questões autorais comentadas, revisão de erros, flashcards e simulados.
- Aulas narradas com cenas visuais, áudio, legenda sincronizada e transcrição.
- Estudos de caso, sala de professores, vídeos, progresso, configurações e sincronização Supabase.
- Aplicação web responsiva e empacotamento Android via Capacitor.

## Cobertura de conteúdo: ressalva importante
A matriz atual informa associação de materiais a 68/68 tópicos, 33 capítulos, 37 lições e 407 questões autorais, com uma explicação introdutória por seção. Esses números devem ser recontados pelo código/testes após a limpeza e não comprovam, por si só, profundidade, atualização ou correção. A própria matriz identifica lacunas em legislação local e institucional. Todo conteúdo gerado deve ser tratado como material de estudo autoral, não como questão oficial, até validação documentada.

## Prioridades recomendadas
1. **Revisão jurídica e institucional:** conferir LC estadual 205/2025, normas do TCE-GO, regimento, resoluções e legislação de contratação em fontes oficiais, com data de acesso e versão.
2. **Revisão pedagógica:** auditoria independente de respostas, distratores e justificativas; incluir cálculos de conferência e matriz de dificuldade.
3. **Aulas narradas:** priorizar tópicos difíceis e revisar roteiro/visual manualmente. A geração automática a partir do texto não equivale a uma aula audiovisual editorialmente aprovada.
4. **Diagnóstico inicial:** medir base por disciplina e recomendar um plano ajustado à disponibilidade semanal e à data da prova.
5. **Simulados:** pesos fiéis ao edital, relatório por tópico, análise de erro recorrente e comparação de tentativas.
6. **Retenção:** revisão espaçada integrada a flashcards, questões erradas e aulas em que o aluno teve dificuldade.
7. **Acessibilidade:** validar contraste, leitor de tela, teclado, alvos de toque, transcrições, legenda em uma linha e movimento reduzido.
8. **Confiabilidade:** testar sincronização entre aparelhos, modo offline, exportação/importação de progresso e recuperação de conta.
9. **Desempenho e UX:** medir bundle inicial, verificar imagens pesadas, rolagem móvel e retomada do estado após interrupção.
10. **Publicação:** a etapa só é considerada pronta quando o workflow do repositório confirma testes, build web, E2E, APK e atualização da página pública.

## Sequência de execução
- P0 — corrigir e validar a aula narrada em celular e a navegação imersiva das atividades.
- P0 — remover o formato de livro e a narrativa de fantasia, preservando IDs e progresso existentes.
- P0 — reformular a página inicial como painel de continuação, progresso e tarefas atuais.
- P1 — automatizar relatório de cobertura/densidade por disciplina (microaulas, questões, referências, lacunas).
- P1 — adicionar diagnóstico inicial e plano adaptativo.
- P2 — melhorar simulados e análise por competência.
- P2 — testes reais de offline/sincronização e acessibilidade.
- P3 — tutoria por IA apenas com fontes vinculadas ao conteúdo e explicação rastreável.

## Limite desta auditoria
Este arquivo registra a análise do código/documentação e prioridades propostas. Não declara validação de especialista ou teste em aparelho físico. O estado de publicação será confirmado pelo último workflow do GitHub Actions.
