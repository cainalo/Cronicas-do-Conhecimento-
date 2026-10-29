# Pórtico — plano de implementação e continuidade

Este documento é o ponto de continuidade técnico para a próxima sessão de desenvolvimento. O produto anteriormente chamado **Crônicas do Conhecimento** passa a usar **Pórtico** na experiência de marca. Não assumir que um protótipo visual equivale a uma funcionalidade de produção.

## Estado implementado nesta etapa

- Em 29/10/2026, foram adicionados três posts editoriais de aplicação profissional (diagnóstico de pressão de memória, investigação de DNS e teste de restauração de backup), cada um com cenário e mini-desafio próprios. Isso amplia a variedade, mas não substitui revisão editorial humana nem torna o feed multiusuário.

- A rota `/sala` agora abre uma experiência de feed social em `src/pages/SocialFeed.tsx`.
- O feed reúne publicações editoriais dos professores e publicações locais do estudante; oferece filtros, curtidas em publicações locais, comentários, composição de texto, anexação de imagem e stories visuais.
- As publicações criadas pelo estudante são armazenadas no navegador. **Ainda não são sincronizadas entre usuários/dispositivos**; não apresentar o protótipo local como rede social multiusuário.
- Stories têm progressão manual, identidade visual própria e indicação de trilha sonora. Não reproduzem música protegida.
- O componente anterior `src/pages/TeachersRoom.tsx` foi preservado como referência de estudo e para evitar perda de funcionalidades didáticas já existentes.
- O laboratório de programação contém um chamado guiado de suporte coerente com `src/content/scenarios/suporte-lento.ts`: as saídas de `top`, `free -h`, `vmstat 2` e `ps aux | grep importador` permitem reconhecer thrashing no chamado 2318. O terminal aceita comandos e pipelines didáticos sobre sistema de arquivos em memória; nunca acessa o sistema operacional real.
- O objeto terminal da Marta em `/escritorio` liga à rota `/laboratorio-codigo?origem=escritorio&chamado=2318`; o laboratório grava o diagnóstico correto no armazenamento local, e o mapa usa esse relatório para seguir até a decisão sobre terminar o PID 4127, sem repetir a investigação.
- O workflow `pages.yml` publica o site em toda a `main`; sem a chave estável, preserva `download/` da branch `gh-pages` em vez de gerar um APK incompatível. A recompilação do APK segue restrita ao branch de trabalho ou quando a keystore de release estiver configurada.

## Próximas etapas — executar nesta ordem

### 1. Validar compilação e fluxo de publicação
- Executar `npm ci`, `npm run typecheck`, `npm test`, `npm run build` e `npm run test:e2e`.
- O workflow do commit `26ff415dcfbf` passou e publicou `gh-pages`; confirmar manualmente a rota pública em celular após a integração do terminal com o escritório.
- Fazer teste manual em celular: abrir `/sala`, navegar stories, publicar texto e foto, comentar, recarregar e conferir persistência.
- Verificar limites de armazenamento local e fallback quando o navegador bloquear `localStorage`.

### 2. Tornar a rede social multiusuário
- Criar esquema Supabase para `teacher_posts`, `post_comments`, `post_reactions`, `teacher_stories` e `story_views`.
- Definir RLS: leitura pública do conteúdo publicado; escrita/edição/exclusão somente pelo autor; moderação com permissão explícita.
- Implementar paginação por cursor, carregamento incremental, estados vazios/erro, denúncias, bloqueio e moderação.
- Substituir a persistência local como fonte principal por API/Supabase; manter rascunho local como contingência.

### 3. Feed completo de professores
- Stories no topo, perfis completos e feed cronológico; permitir posts de texto, imagem, carrossel e vídeo com validação de formato/tamanho.
- Stories com arte, texto, acessibilidade, duração, música licenciada/fornecida pelo usuário e links externos com aviso de saída.
- Criar calendário de publicação simulada para demonstrações, com datas determinísticas e rótulo claro de conteúdo demonstrativo. Não alegar tempo real se não houver backend.
- Perfis: biografia, áreas, personalidade, estilo visual, referências, bordões, temas recorrentes e publicações individuais.
- Adicionar imagens originais dos personagens com licença clara e consistência entre avatar, story, aula e perfil.

### 4. Conteúdo didático sem repetição
- **Aprender:** explicação central e vocabulário fundamental.
- **Praticar:** questões e cenários do mesmo objetivo, com feedback explicativo e dificuldade progressiva.
- **Aula narrada:** síntese de orientação + aprofundamento, analogias novas, caso de aplicação, contraexemplo, pergunta de reflexão e encerramento; não converter o texto de Aprender em simples leitura.
- **Videoaula:** vídeo grande em paisagem, com ferramentas laterais/abaixo em telas pequenas: notas com timestamp, resumo editável, conceitos-chave, dúvidas, marcadores e checklist de revisão.
- **Posts na trilha:** selecionar publicações pertinentes e incorporá-las no fluxo de atividade, sem mandar o estudante para `/sala`. O feed completo continua sendo uma página separada.
- **Posts editoriais:** curiosidades, erros comuns, aplicações profissionais, bastidores de laboratório, perguntas abertas e referências externas verificadas. Revisão humana do conteúdo antes de marcar como validado.

### 5. Personagens e atividades multimodais
- Criar ficha de personagem por professor: silhueta, roupas, paleta, gestos, voz/ritmo, humor, referências, preferências, bordões e limites pedagógicos.
- Produzir assets de personagem originais e responsivos; não depender de avatares genéricos nem de ilustrações improvisadas em cada tela.
- Adicionar entrevistas, diálogos, diagnóstico de problemas, terminal simulado com comandos reais seguros, estudo de caso e atividades de escolha com feedback.
- Cada atividade precisa ter estados de carregamento, foco, erro, conclusão e acessibilidade por teclado/leitor de tela.

### 6. Navegação e botão voltar
- Preferir `navigate(-1)` quando existir histórico de navegação válido; oferecer fallback contextual somente quando a página for aberta diretamente.
- Passar `state.from` ao navegar a partir da trilha e preservar query/hash relevantes.
- Testar voltar e fechar em Aprender, Praticar, Aula narrada, Videoaula, stories e diálogos; nenhum botão deve sempre redirecionar para uma página fixa ignorando a origem.
- Não quebrar o botão Voltar do Android nem a navegação do navegador.

### 7. Identidade visual Pórtico
- Usar os arquivos-mestres aprovados de logo, wordmark, ícone, slogans e elementos gráficos. A referência visual recebida apresenta azul-petróleo `#0F4C5C`, terracota `#C8402A`, ocre `#D4A017`, ameixa `#6B3A6E`, verde-oliva `#556B2F` e papel `#F7EEDF`.
- Não redesenhar a marca como texto com uma fonte parecida quando o asset original estiver disponível.
- Exportar variantes para fundo claro/escuro, favicon, app icon e telas de carregamento; validar contraste e tamanhos pequenos.
- A imagem de referência por si só não substitui os arquivos vetoriais/PNG originais de alta resolução. Confirmar e armazenar os assets finais em `public/brand/`.

### 8. Política de branches e release
- Usar apenas `main` como branch de trabalho/publicação, conforme preferência do projeto.
- Antes de excluir branches remotas, comparar commits e confirmar que todo trabalho útil foi integrado; nunca apagar branches sem auditoria de diferenças.
- Cada entrega deve terminar com typecheck, testes, build e verificação do workflow de deploy. Informar explicitamente o SHA do commit e o estado real da publicação.
- Não afirmar que o site foi publicado se o workflow não terminou com sucesso.

## Critérios de aceite

- O feed continua navegável e utilizável em celular e desktop.
- Curtir/comentar/publicar têm comportamento perceptível e persistência declarada corretamente.
- Stories são visuais e navegáveis, com conteúdo específico de cada personagem.
- As atividades da trilha permanecem dentro do fluxo da trilha.
- Aulas narradas agregam conteúdo novo em vez de duplicar Aprender.
- Videoaula mantém o player grande e oferece ferramentas úteis sem exigir tela cheia.
- Voltar/fechar retorna à origem real da navegação.
- Marca usa assets oficiais, não uma aproximação tipográfica.
- Build e testes passam; release é verificado, não presumido.
