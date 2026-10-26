# Gate interno de qualidade — Crônicas do Conhecimento

Este documento é um contrato de engenharia e revisão editorial. Não é exibido na interface da plataforma. Toda mudança de página, fluxo, conteúdo ou atividade deve ser avaliada contra os critérios abaixo; a nota registrada é interna e não substitui resultados reais de teste.

## Regra de aprovação

- Avaliar cada critério como **passou**, **falhou** ou **não verificado**. “Não verificado” não conta como aprovado.
- Nota de evidência = critérios aprovados ÷ critérios aplicáveis × 100. Critérios não verificados permanecem no denominador até serem verificados.
- Uma página só recebe **100% verificado** quando todos os critérios aplicáveis passaram, a suíte automatizada passou e a interface foi conferida visualmente nos tamanhos 360×640 e 390×844, em tema claro e escuro quando suportados.
- Um teste em jsdom não comprova comportamento visual. Um build verde não comprova adequação didática. Uma revisão do texto não comprova funcionamento do aplicativo.
- Se um critério obrigatório falhar, corrigir e repetir os testes afetados. Nunca elevar a nota por opinião ou arredondamento.
- Registrar escopo, SHA do commit, testes executados, evidências, falhas conhecidas e nota em cada sessão de trabalho. Não inserir o placar interno na interface pública.

## Critérios (28)

### Funcionalidade e integridade
1. **Build e tipos:** TypeScript e Vite finalizam sem erros.
2. **Testes de regressão:** testes existentes e novos passam; falhas são corrigidas, não ignoradas.
3. **Fluxo completo:** abrir, responder, avançar, sair e retomar comportam-se como especificado.
4. **Gabarito íntegro:** embaralhar alternativas nunca separa o texto correto da resposta/gradação.
5. **Variação real:** questões vêm de um banco pertinente e a seleção muda quando se inicia uma nova tentativa, sem repetir mecanicamente a mesma sequência.
6. **Persistência:** progresso legítimo continua salvo; descartes de uma sessão incompleta são intencionais e visíveis ao usuário.
7. **Estados-limite:** vazio, fim do conteúdo, erro, ausência de voz/rede e conteúdo não encontrado têm tratamento compreensível.

### Didática e conteúdo
8. **Objetivo explícito:** a etapa diz o que a pessoa aprenderá ou fará.
9. **Pré-requisitos:** cada conceito exigido foi apresentado antes, ou há uma explicação de apoio antes da questão.
10. **Vocabulário gradual:** termos técnicos novos são definidos ao aparecerem pela primeira vez.
11. **Etapas pequenas:** uma ideia central por etapa; não saltar de fundamentos para detalhes sem transição.
12. **Exemplo resolvido:** conceitos abstratos recebem exemplo concreto e explicação de por que funciona.
13. **Questões inequívocas:** há uma única resposta correta, sob condições explicitadas.
14. **Distratores plausíveis:** alternativas erradas refletem confusões reais, não piadas, absurdos ou opções evidentemente inferiores.
15. **Cobertura equilibrada:** exercícios medem os objetivos ensinados, não apenas memorização ou um único subtópico.
16. **Feedback útil:** acerto e erro explicam o raciocínio; quando possível, há recuperação equivalente, sem dar pista involuntária antes da resposta.
17. **Revisão acumulativa:** revisão, flashcards, resumo ou questões retomam conceitos anteriores sem introduzir conteúdo não estudado.

### UI, UX e acessibilidade
18. **Hierarquia visual:** título, conteúdo principal, legenda, instrução e ação primária são fáceis de distinguir.
19. **Espaçamento e composição:** elementos têm margem segura e não ficam colados às bordas ou uns aos outros.
20. **Responsividade:** testar 360×640, 390×844 e desktop; nada fica cortado ou cria rolagem horizontal.
21. **Áreas seguras Android:** controles não ficam escondidos sob a barra do sistema nem pelos recortes de tela.
22. **Controles de mídia:** play/pausa, busca, velocidade, legenda e saída funcionam; controles flutuantes não ocupam espaço fixo da composição.
23. **Ocultação/revelação:** quando aplicável, controles somem após inatividade e retornam por toque; controles ocultos não interceptam ações inesperadas.
24. **Legendas e alternativa textual:** fala é acompanhada por legenda legível; transcrição acessível quando a animação/voz não é suficiente.
25. **Contraste e tema:** textos e controles permanecem legíveis no claro/escuro e com as preferências suportadas.
26. **Acessibilidade:** nomes acessíveis, semântica, foco visível, navegação por teclado e mensagens de estado.
27. **Movimento e conforto:** transições ajudam a acompanhar a explicação, sem flashes, movimento excessivo ou dependência exclusiva de animação.
28. **Desempenho e acabamento:** não criar timers/listeners órfãos, loops de renderização, console errors ou assets desnecessários.

## Protocolo para uma mudança visual

1. Identificar o escopo (página/rota, fluxo e tamanhos afetados).
2. Criar teste de regressão reproduzível antes ou junto da mudança.
3. Aplicar a alteração e verificar diff, imports, referências e estados.
4. Rodar `npm test`, `npm run build` e `npm run test:e2e` conforme o escopo.
5. Conferir screenshots/evidência visual em 360×640 e 390×844; validar Android real para alegações específicas de aparelho, tela cheia e barras do sistema.
6. Marcar critério por critério, corrigir falhas e repetir as verificações afetadas.
7. Criar commit específico, publicar e consultar o resultado da CI para aquele SHA.
8. Registrar o status honesto. Se não houver acesso a aparelho real, navegador visual ou teste de uma integração, registrar como não verificado; não atribuir 100%.

## Regra específica para aulas narradas

O componente visual principal deve preencher a área de reprodução, com espaçamento seguro em torno do título e dos controles. Legenda e botões flutuam por cima do palco, sem esconder texto/elementos essenciais da cena. Os controles devem sumir depois de inatividade e reaparecer ao toque. A implementação atual utiliza voz sintetizada do aparelho e cenas/ilustrações HTML; não deve ser descrita como um vídeo de IA renderizado com filmagens ou como áudio profissional pré-produzido. A sincronização palavra a palavra é aproximada enquanto não existir uma faixa de áudio com marcações de tempo reais.

## Estado inicial desta regra

O gate formaliza o processo a partir de 26/10/2026. Não declara qualquer tela como 100% por padrão; cada escopo precisa de evidência individual.
