# Direção visual: medieval realista, consistente e legível

## Objetivo

Construir uma identidade de arquivo real medieval: pedra escura, madeira envelhecida, couro, bronze gasto, pergaminho e luz de vela. Não deve parecer um painel genérico de cartões com um filtro marrom, nem um pergaminho sujo por trás de todo texto. Realismo vem da qualidade dos materiais, profundidade, iluminação, ritmo visual e alinhamento — não de adicionar textura a tudo.

## Paleta orientadora

Manter como tokens centralizados e validar contraste real em modo claro/escuro:

- Verde profundo: navegação, ação/estado do Arquivo, elementos institucionais.
- Carvão e pedra: fundo do modo noite, superfícies profundas, molduras.
- Pergaminho: leitura e áreas de conteúdo longo, sem ruído excessivo sob o texto.
- Bronze/latão envelhecido: destaque, progresso e detalhes metálicos.
- Tinta escura e creme de alto contraste: corpo do texto em página.
- Tons semânticos separados para sucesso, alerta e erro; não confundir dourado decorativo com resposta correta.

Os valores exatos devem entrar em tokens CSS. Evitar cores concorrentes escolhidas diretamente em componentes.

## Materialidade e profundidade

- Couro: grão fino, costuras discretas, bordas/espessura plausíveis, brilho baixo; dourado apenas em ferragens ou inscrições.
- Pergaminho: manchas suaves, bordas escurecidas e fibras de baixa frequência. A área atrás do parágrafo deve permanecer uniforme o suficiente para leitura.
- Pedra/madeira: contraste e perspectiva consistentes, sem repetir o mesmo padrão obviamente lado a lado.
- Luz: fonte coerente com tochas/vela; evitar efeitos de brilho que apaguem o conteúdo.
- Iconografia: usar uma linguagem consistente (gravura/metal/monocromia), e não misturar muitos estilos de ícone.
- Tipografia: fonte gótica em títulos curtos e rubricas; corpo em fonte editorial legível, com largura e entrelinha adequadas.
- Animação: virada realista do livro e câmera 3D têm prioridade sobre partículas, confetes e oscilação constante.

## Estrutura e simetria

- Usar uma grade regular com contêineres e limites de largura consistentes.
- Título, subtítulo, conteúdo, barras de progresso e CTA devem partir do mesmo alinhamento.
- Capa centralizada e equilibrada; lombada, fecho e bordas com espessura proporcional.
- No desktop, dupla página com lombada central; margens internas simétricas, números de fólio coerentes e elementos ornamentais sem competir com o conteúdo.
- No celular, página única com margens consistentes e área de toque nas bordas.
- Cards da área Estudos devem ter padrão de altura, ícone, título, descrição e metadados; conteúdo textual variável não deve desalinhá-los.
- A página não deve alternar aleatoriamente entre cantos grandes e pequenos, sombras duras e suaves, ou densidades de ornamento.

## Prioridade: legibilidade acima do ornamento

- Texto corrido: corpo confortável, contraste forte, parágrafos curtos e linha não excessivamente larga.
- Não pôr textura detalhada, fogo animado ou vídeo de fundo atrás do texto principal.
- Não reduzir corpo de texto para fazer uma tabela “caber”; paginar ou oferecer versão acessível.
- Oferecer modo menos animado e controles de som.
- Avaliar a interface em escala de cinza e por teclado para garantir que hierarquia não dependa apenas da cor.

## Checklist visual de aceite

- [ ] Todos os contêineres seguem uma grade e as mesmas margens por breakpoint.
- [ ] Nada ultrapassa a viewport ou fica cortado por rodapé fixo.
- [ ] Não há cartão sem função ou espaço vazio enorme só para igualar altura.
- [ ] Livros com uma ou duas páginas têm acabamento coerente; conteúdo não rola dentro do fólio.
- [ ] Texto permanece legível com zoom/fonte aumentada.
- [ ] Estados de botão são visualmente diferentes e acessíveis.
- [ ] O visual permanece coerente nas cenas 3D, páginas, biblioteca, Estudos, treinamento e conta.
- [ ] Capturas de telas antes/depois foram revisadas em 390×844 e 1280×800, no mínimo.
