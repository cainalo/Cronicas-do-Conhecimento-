# Checklist de QA manual

Registrar para cada caso: data, branch/commit, dispositivo/browser, resolução, tema, resultado, captura e bug id. Um teste só é “passou” quando o fluxo foi reproduzido, não quando o código parece correto.

## A. Primeiro uso e home

- [ ] Sem progresso anterior: há uma única ação primária “Começar/Continuar”, sem dois botões concorrentes com destino parecido.
- [ ] O primeiro passo corresponde ao começo pedagógico recomendado.
- [ ] Com progresso anterior: a ação principal identifica e abre o passo salvo.
- [ ] Home não fica sobrecarregada por missão, plano, meta, métricas, atalhos e domínio competindo pelo foco.
- [ ] Acesso a Estudos e Biblioteca continua óbvio, mas secundário.

## B. Microaula e erros

- [ ] A primeira tela declara uma ideia/objetivo compreensível.
- [ ] Cada conceito novo é explicado antes de ser testado.
- [ ] A checagem aparece antes do próximo conceito.
- [ ] Alternativas erradas plausíveis produzem feedback específico.
- [ ] Há pista, exemplo menor ou revisão antes de pedir nova tentativa.
- [ ] A nova tentativa mede a mesma habilidade, mas não repete exatamente o mesmo item/dados.
- [ ] Um acerto por tentativa não é mostrado como domínio sólido sem reforço posterior.
- [ ] A história pode ser pulada; a explicação didática continua completa.

## C. Continuidade

- [ ] Atualizar durante uma microaula e pressionar Continuar leva ao mesmo ponto.
- [ ] Sair no meio de uma questão e voltar não descarta resposta nem etapa sem aviso.
- [ ] Sair no meio de descoberta, laboratório ou treino SQL e voltar abre o passo certo.
- [ ] Conclusão avança o checkpoint e todos os botões apontam para ele.
- [ ] Conta de visitante e conta autenticada não misturam checkpoint.
- [ ] Migrar visitante para conta não duplica XP ou lições.

## D. Livro

- [ ] Ler início, capítulo curto, capítulo longo e capítulo com tabela/código.
- [ ] Não existe rolagem vertical dentro do fólio.
- [ ] Título nunca fica sozinho na última linha da folha.
- [ ] Cabeçalho/rodapé/fólio não se sobrepõem ao conteúdo.
- [ ] Virada por botão, seta, gesto e página dupla funcionam.
- [ ] Aumentar fonte recalcula páginas sem cortar nada.
- [ ] Tabela é legível e quebra entre páginas com cabeçalho repetido.
- [ ] Código permanece íntegro e numerado ao continuar.
- [ ] Modo acessível preserva leitura sem exigir gesto de virar página.

## E. Estudos e mídia

- [ ] Biblioteca abre material de referência.
- [ ] Atividade rápida inicia uma unidade curta e explica o objetivo.
- [ ] Vídeo só carrega após ser aberto.
- [ ] Vídeo indisponível mostra fallback e transcrição/resumo continua disponível.
- [ ] Não há autoplay de som/vídeo.
- [ ] Controles de áudio separados e persistidos.

## F. Alinhamento/responsividade

- [ ] 360×740: controles não são cobertos nem cortados.
- [ ] 390×844: sem overflow horizontal ou cartões desalinhados.
- [ ] 768×1024: cartões e tabelas têm composição própria de tablet.
- [ ] 1024×768: conteúdo não excede a altura útil do livro.
- [ ] 1280×800: dupla de páginas equilibrada e lombada central.
- [ ] 125% zoom: nenhum texto essencial desaparece.
- [ ] Teclado: foco visível e ordem lógica.
- [ ] Leitor de tela: botões possuem nomes e feedback anuncia correção/erro.
- [ ] Reduzir movimento: animação se reduz sem bloquear navegação.

## G. Release e integração

- [ ] `npm ci` termina sem falha.
- [ ] `npm test` passa.
- [ ] `npm run build` passa.
- [ ] Build registra tamanho bruto e gzip, com comparação à baseline.
- [ ] Auth, recuperação e sincronização testados com rede real.
- [ ] APK instalado e fluxo de retomada testado em Android físico.
- [ ] Deep link/refresh de rota funciona no site publicado.
- [ ] Documentação reflete exatamente o que foi verificado e o que não foi.
