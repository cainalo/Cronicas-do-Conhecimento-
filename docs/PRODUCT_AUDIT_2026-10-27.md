# Auditoria de produto e conteúdo — 27/10/2026

## Direção do produto
O Crônicas do Conhecimento deve ser uma plataforma de estudos moderna e gamificada para concursos. A gamificação serve ao aprendizado (progresso, metas, sequências, desafios e revisão), sem lore medieval, personagens de fantasia, inventário de artefatos, grimórios ou apresentação de conteúdo como livro físico.

## Estado atual observado no repositório
- Trilha guiada, continuação do último ponto estudado e progresso local.
- Catálogo por disciplina, conteúdo textual responsivo, microaulas e atividades.
- Banco de questões autorais com comentários, revisão de erros, flashcards e simulados.
- Aulas narradas com sincronização de voz/legenda, imagens e transcrição.
- Estudos de caso, sala de professores com educadores fictícios e materiais em vídeo.
- Conta e sincronização com Supabase, configurações e download Android.
- Matriz informa 68/68 tópicos associados, 33 capítulos, 37 lições e 407 questões autorais; esses números precisam ser confirmados por teste automatizado na versão publicada e não substituem revisão pedagógica.

## Limpeza temática nesta etapa
- Títulos de atividades com metáforas de pergaminhos, cinzéis, tesouros, muralhas, navios e súditos foram substituídos por títulos descritivos.
- Títulos de progressão e conquistas descrevem esforço e domínio, sem cargos de escriba ou referências à torre.
- Rótulos legados de regiões foram substituídos por nomes de disciplinas.
- README atualizado para documentar o produto atual.
- Página inicial recebe um resumo de progresso visual e compacto, sem contador gigante até a prova.

## Lacunas prioritárias
1. **Validação pedagógica:** revisar questões e explicações por especialista, com foco em legislação, normas locais e tópicos de maior peso.
2. **Cobertura real:** a matriz associa tópicos a materiais, mas alguns assuntos jurídicos e institucionais ainda são apenas panorâmicos. Anexar PDFs oficiais, registrar data de consulta e transformar lacunas em unidades.
3. **Aulas narradas:** o catálogo automático cria versões narradas a partir das microaulas, mas isso não garante roteiro audiovisual editorialmente forte. Priorizar conceitos difíceis e garantir abertura, exemplo visual, síntese e pergunta de recuperação.
4. **Experiência das aulas:** testar em Android físico legenda no rodapé, linha estável, controles, orientação, áreas seguras e acessibilidade de movimento.
5. **Avaliação:** incluir diagnóstico inicial, relatório por assunto, simulados ponderados pelo edital e explicação das alternativas.
6. **Plano de estudo:** permitir data de prova configurável, disponibilidade semanal, metas realistas e ajuste após atrasos.
7. **Acessibilidade:** checar contraste, áreas de toque, leitor de tela, teclado, legendas/transcrições e movimento reduzido.
8. **Confiabilidade:** garantir exportação/importação, sincronização com resolução de conflitos, modo offline e recuperação de conta.
9. **Manutenção:** remover componentes, fontes e artefatos antigos somente após confirmar ausência de consumidores; não apagar conteúdo-base apenas por estar numa pasta legada.
10. **Publicação:** considerar a etapa publicada somente quando workflow de testes, build Android e site concluírem e URL/APK forem confirmados.

## Próxima sequência recomendada
- P0: finalizar a revisão visual da aula narrada e validar em celular.
- P0: publicar a limpeza sem quebrar IDs nem progresso existente.
- P1: gerar relatório automático de cobertura por disciplina e peso do edital, incluindo microaulas, questões, referências e lacunas.
- P1: revisão editorial das aulas narradas mais importantes; geração automática não deve ser confundida com roteiro pronto.
- P1: diagnóstico inicial e plano adaptativo.
- P2: simulado com análise por competência, caderno de erros e metas semanais.
- P2: modo offline confiável e testes de sincronização.
- P3: recursos sociais ou IA de tutoria somente após qualidade e rastreabilidade do conteúdo.

## Limite desta auditoria
Esta é uma auditoria de código e documentação. Ela não afirma que testes, compilação Android ou validação em aparelho foram executados. O status será atualizado após o workflow de publicação.
