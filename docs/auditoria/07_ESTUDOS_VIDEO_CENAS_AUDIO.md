# Especificação: página Estudos, videoaulas, cenas e áudio

## Página “Estudos”

Criar um destino de navegação claramente chamado **Estudos**, acessível da home e da navegação principal. Ele não é um jogo separado; organiza as maneiras de aprender. Cards recomendados:

1. **Continuar a trilha** — abre o checkpoint atual; é o caminho padrão.
2. **Biblioteca / Grimórios** — referência completa gerada do conteúdo canônico; sumário, busca, glossário, fontes e marcadores.
3. **Atividades rápidas** — prática de 3–8 minutos, com explicação após erro e indicação de conceito praticado.
4. **Videoaulas** — aulas curtas selecionadas por objetivo; player incorporado quando disponível, transcrição e notas.
5. **Revisão inteligente** — conceitos/questões cuja revisão venceu ou onde houve dificuldade.
6. **Materiais externos** — documentação e recursos visuais verificados, agrupados por tema.

Os cards devem ter hierarquia, dimensões e alinhamento consistentes. Não duplicar rótulos, nem competir com “Continuar”. Cada card explica em uma frase o que o estudante encontrará.

## Vídeo do YouTube dentro do site

É possível incorporar um vídeo público/permitido com um player de embed, em vez de mostrar apenas um link textual. Implementar como componente de mídia reutilizável, mas manter o conteúdo independente do vídeo.

Cada recurso audiovisual deve ter:

- `videoId`/origem validada e URL de incorporação em lista permitida;
- título e canal/autor reais;
- duração e idioma quando verificados;
- objetivo de aprendizagem associado;
- capítulos/marcações de tempo quando úteis;
- legenda/transcrição ou resumo acessível;
- botão “abrir no YouTube” como fallback;
- estado indisponível/privado removido, sem quebrar o resto da lição;
- carregamento sob demanda, para não baixar centenas de players em uma página;
- sem autoplay e sem som automático;
- tratamento de rede lenta e largura responsiva.

Adotar a política de privacidade incorporada mais restritiva compatível com o recurso. Não forçar o estudante a compartilhar dados desnecessários. Respeitar direitos autorais; incorporar somente vídeos que o publicador permite incorporar e sem contornar restrições.

## Papel das cenas

Há uma cena 3D via Three.js voltada à narrativa da missão SQL e falas/personagens por trecho. Isso pode continuar como uma modalidade, mas **não equivale a uma aula de professor**. Separar tipos de mídia:

- `storyScene`: contexto opcional da investigação;
- `teacherMicroLecture`: explicação visual/roteiro curto, com fala, legenda ou cartões;
- `diagram`: figura/diagrama interativo;
- `videoEmbed`: vídeo externo curado;
- `terminalLab/tableLab`: prática que permite manipular dados.

Nem toda etapa precisa ter vídeo nem cena 3D. O primeiro requisito é sempre ensinar a ideia com clareza. Se não houver vídeo adequado, uma demonstração visual curta e transcrição bem escrita é melhor do que conteúdo de baixa qualidade ou um vídeo não relacionado.

## Áudio e ambiente medieval

O repositório possui som procedural de lareira/música medieval gerado no aparelho e um controle Ambiente. Preservar e polir:

- preferências independentes para música e lareira, com volume separado;
- som habilitado apenas após interação consciente;
- lembrar a preferência; comunicar visualmente se o ambiente está ligado;
- desligar facilmente sem sair da aula;
- respeitar modo silencioso, economia de bateria e `prefers-reduced-motion`;
- não sobrepor narração de uma videoaula ao som de fundo: reduzir/pausar música quando a fala estiver ativa;
- fallback sem áudio em navegadores que suspendam WebAudio;
- não usar a trilha sonora como feedback essencial de acerto/erro.

## Performance

Carregar a cena 3D só quando o estudante iniciar/abrir a cena; manter a transcrição já disponível. Vídeos também só carregam quando abertos. Dividir por rota e carregar grimórios sob demanda antes de expandir mídia. Medir bundle bruto e gzip no CI e registar os limites; não comparar valores sem dizer qual métrica foi usada.
