# PROMPT INICIAL PARA CLAUDE — REFORMULAÇÃO DO RPG EDUCACIONAL DE CONCURSOS DE TI

Você vai trabalhar no site/app que já existe neste projeto. O objetivo é reformulá-lo de forma incremental, não criar outro aplicativo do zero sem necessidade.

## Materiais a ler primeiro
1. `Guia_Completo_Reformulacao_RPG_Concurso_TI.docx` (ou sua versão PDF): especificação central.
2. `FONTES_E_PROVAS_PARA_CLAUDE.md`: links para fontes e provas.
3. PDFs anexados pelo usuário: dê prioridade aos arquivos locais, pois alguns sites podem não ser acessíveis pelo navegador/ambiente.

## Primeira etapa — somente auditoria
Antes de editar código, inspecione repositório, framework, rotas, componentes, estilos, dados, autenticação, armazenamento de progresso, mídia e dependências. Não faça modificações nesta etapa.
Entregue um relatório objetivo contendo: (a) o que existe hoje; (b) o que será preservado; (c) problemas de UX/UI; (d) arquitetura relevante; (e) riscos e dependências; (f) um plano priorizado em fases; (g) quais perguntas são realmente bloqueantes. Não pergunte coisas que você pode descobrir lendo o projeto ou os documentos.

## Direção de produto
O app deve ser uma aventura educacional medieval, imersiva e visual, para estudar concursos de TI e controle externo. O ponto de partida de conteúdo é o edital histórico do TCE-GO 2024 para Analista de Controle Externo — Tecnologia da Informação; não o chame de edital vigente. Organize o conteúdo por versão de edital para que possamos substituí-lo quando houver outro objetivo.

Não mantenha como formato dominante “texto → três verdadeiro/falso → texto parecido → várias perguntas semelhantes”. Cada missão precisa conter explicação, ação interativa, feedback didático, pelo menos três famílias de atividade, questão de prova com fonte se houver, fechamento narrativo e revisão de conhecimento.

## Exigência de cena cinematográfica
O prólogo deve parecer uma cena encenada de filme de animação 3D: ambiente com profundidade, enquadramentos/câmera, luz e sombras, personagens que caminham/gesticulam/manipulam objetos, interação/diálogo, continuidade da cena e mudanças visíveis do cenário. Um boneco 2D balançando, formas SVG flutuantes ou texto sobre uma figura parada não satisfaz o requisito de entrega.

Não assuma que código CSS/React pode criar sozinho animação com qualidade cinematográfica. Proponha e valide um pipeline real: vídeo pré-renderizado (gerado/licenciado) para cenas narrativas e/ou cena 3D em tempo real com modelos, rigging, animações, iluminação e materiais de qualidade. Se você não possui ferramenta para gerar vídeo, diga isso claramente e planeje como importar assets produzidos em outra ferramenta. Não produza muitas cenas caras antes de apresentar uma prova de conceito, peso dos arquivos e estimativa de custo/créditos. Incluir legendas, transcrição, pular/rever, controle de som e fallback acessível.

## Exigência de visualização didática
Todo tópico que pede um exemplo concreto deve mostrar o objeto: tabelas, linhas/relacionamentos, diagramas, topologias de rede, fluxo de requisição/resposta, código, terminal, dashboard, conjunto de dados, gráfico, quadro de riscos, tabela comparativa de propostas etc. O usuário deve manipular o exemplo e ver a saída mudar. Imagens decorativas não contam como exemplo técnico.

Você pode usar arte vetorial própria, diagramas construídos com componentes, imagens geradas por IA, vídeos/arte 3D ou bancos de mídia autorizados. Registre fonte, licença, créditos, dimensões/duração, texto alternativo e fallback. Não usar recursos com marca d’água removida ou licença presumida.

## Diversidade de atividades
Projete componentes reutilizáveis para: múltipla escolha, seleção múltipla, arrastar/soltar, correspondência, ordenar sequência, anotar diagrama, manipular dados/tabelas, montar consultas quando pertinente, depurar código, terminal/simulador, simulação de incidentes, montar arquitetura, preencher lacunas, comparar cenários, flashcards com revisão espaçada, resposta curta com rubrica e desafio de chefe/simulado. Use somente formatos que avaliem o tópico de fato.

Regras mínimas: pelo menos três famílias por missão; não usar o mesmo formato por mais de duas atividades consecutivas; verdadeiro/falso não deve dominar nem formar três questões seguidas; todo erro precisa de explicação específica e nova oportunidade de transferência. No mínimo uma atividade deve ser baseada em aplicação prática quando o tema permitir.

## Questões reais
Nunca invente que uma questão foi aplicada em um concurso. Classifique cada item como `OFICIAL`, `ADAPTADA` ou `AUTORAL`. Para questão oficial, mantenha o texto fiel, a fonte, órgão, cargo, banca, ano, caderno/tipo, número da questão, página, gabarito oficial e seu status definitivo/anulado/alterado. Se o PDF não estiver disponível, peça para o usuário anexá-lo ou use outra fonte verificável. Não invente o conteúdo do arquivo só porque tem acesso ao link.

Separe a chave oficial da explicação pedagógica. Não publique/republique cadernos integrais sem verificar direitos de uso; quando necessário, crie links para a fonte oficial e registre metadados. Questões inéditas devem ser rotuladas como autorais “no estilo” da banca, nunca como questão real da banca.

## Livro/códice e estética
O modo livro é apenas para leitura longa. Em desktop/tablet horizontal, mostrar um livro aberto com duas páginas, lombada central, paginação, margens, hierarquia editorial, ilustração e notas quando fizerem sentido. A virada precisa revelar a próxima dupla de páginas de maneira lógica. No celular, usar uma página por vez, texto responsivo e gesto/controle de virar. Atividades, mapa, inventário, conversa e laboratórios continuam em telas próprias, não devem virar páginas forçadas. Ter alternativa sem animação, navegação por teclado e respeito a “reduzir movimento”.

Direção de arte: fantasia medieval realista com intriga, arquivo da Coroa, conselhos, guildas, mensageiros, oficina, observatório, contratos, mapas e iluminação atmosférica. Usar uma paleta limitada e contrastante (verde profundo, carvão, pergaminho, cobre/bronze e cores semânticas para estados). Evitar cartões vazios enormes, textos ilegíveis, ícones de estilos misturados e animação gratuita.

## Narrativa
Adote provisoriamente “Crônicas do Arquivo Real”. O jogador é aprendiz do Arquivo Real e investiga falhas em registros, comunicação e decisões públicas. A trama deve evoluir por atos ligados a governança, desenvolvimento, redes, segurança, dados/IA e aquisição de TI. Personagens devem agir, discordar, lembrar escolhas e ter objetivos próprios. As decisões podem modificar confiança, pistas, aliados, recursos e ordem das missões, mas não podem esconder permanentemente conteúdo obrigatório por escolha narrativa aleatória. Erro de estudo deve abrir recuperação, não humilhar o jogador nem apagar todo o progresso.

## Base curricular histórica TCE-GO 2024 — TI
Use os PDFs anexados e o edital retificado para verificar tudo. A prova objetiva tinha 100 questões/5 alternativas. Conhecimentos gerais: Português (15), Inglês (8), Normas Específicas de Goiás (10), Controle Externo (15), Auditoria Governamental (12). Específicos: Governança em TI (6), Desenvolvimento Web e Mobile (6), Redes de Computadores e Sistemas Operacionais de Redes (8), Segurança da Informação (6), Análise de dados e IA (8), Aquisição de Bens e Serviços de TI (6). Essas são referências históricas do edital 2024, não declaração sobre futuros concursos.

## Arquitetura e segurança das alterações
- Audite antes de editar; preserve rotas, autenticação, progresso, conteúdo e dados úteis.
- Não crie novas tabelas/migrations até confirmar o modelo existente e apresentar o efeito previsto.
- Faça incrementos pequenos; depois de cada fase, liste arquivos alterados, testes executados, limitações e passos para reverter.
- Não hardcode conteúdo da prova por múltiplos componentes; centralize conteúdo, questões, fontes, assets, versões de edital e progresso.
- Só depois da auditoria, pergunte ao usuário as decisões realmente bloqueantes: edital-alvo, uso privado/público, disponibilidade/custo de geração de vídeo, tópico do piloto e dados que não podem ser perdidos. Sugira defaults para os outros detalhes e continue avançando.

## Entregas esperadas
1. Auditoria do projeto e plano incremental.
2. Proposta visual/telas-chave, com mapa e fluxo da missão.
3. Biblioteca de componentes de atividades reutilizáveis.
4. Uma missão-piloto completa com cena cinematográfica real ou plano de mídia viável, laboratório visual, atividades variadas, prova oficial referenciada quando disponível, feedback, consequência narrativa e revisão.
5. Modo códice com spread de duas páginas em desktop e uma página em celular.
6. Testes funcionais, responsivos, acessibilidade e desempenho; screenshots antes/depois.
7. Plano de expansão para as demais disciplinas.

## Critério de sucesso
Não considere concluído só porque o projeto compila. Abra as telas, percorra toda a missão no desktop e no celular, teste as interações, confirme fontes e gabaritos, verifique as legendas/alternativas de mídia e compare a aparência com o requisito cinematográfico e editorial. Mostre evidências reais e liste o que ainda não foi possível implementar.
