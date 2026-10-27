# Design system — Crônicas do Conhecimento

## Direção vigente
A interface é uma plataforma de estudos moderna, visual e mobile-first. A identidade usa fundo claro e limpo, cartões de cores distintas, ícones funcionais, tipografia sem serifa e hierarquia de informação. A experiência não depende de personagens, territórios fictícios, inventários narrativos ou apresentação de conteúdo como livro físico.

## Navegação e informação
- O menu principal tem cinco destinos claros: Hoje, Trilha, Explorar, Revisar e Progresso. A conta fica acessível pelo cabeçalho.
- A trilha mostra o próximo passo, o contexto e o progresso. A rota de uma matéria usa `/materia/:id`; `/grimorio/:id` só permanece como redirecionamento de compatibilidade.
- As aulas e materiais são fluxos verticais contínuos; não há capas, folhas, virada de página nem sumário paginado.
- Atividades imersivas mantêm controles próprios e ocultam o cabeçalho global para aproveitar a tela do celular.

## Paleta e tipografia
- Paleta padrão `Aurora`, com azul, violeta, teal e cores semânticas para sucesso/erro.
- Fonte de interface: IBM Plex Sans / Inter Tight; todos os títulos mantêm tipografia sem serifa.
- Fundo padrão liso, sem textura de papel. A aparência escura permanece disponível na conta.
- Os cartões usam cor para orientar a navegação e o assunto, não para representar regiões fictícias.

## Movimento e acessibilidade
- Animações curtas para entrada dos cartões, troca de cena e feedback; obedecer `prefers-reduced-motion`.
- Contraste mínimo, alvos de toque confortáveis, hierarquia semântica, estados de foco visíveis e legendas/transcrições nas aulas narradas.
- Legenda narrada aparece no rodapé, uma fala por vez, acima dos controles quando eles estão visíveis. O destaque da palavra ativa não altera métricas tipográficas.

## Gamificação permitida
- XP por atividade concluída, sequência de dias, metas, conquistas objetivas, domínio por disciplina e desafios aplicados.
- O feedback deve explicar o acerto/erro e sugerir a próxima ação; não atribuir recompensas por visitas vazias.
- Personagens ou cenários de fantasia e nomes como torre, reino, grimório e pergaminho não fazem parte da interface vigente.

## Compatibilidade técnica
IDs e caminhos legados podem permanecer temporariamente para não invalidar progresso local ou links antigos. Eles não devem aparecer como rótulos novos. Arquivos, dependências e estilos sem consumidores devem ser removidos após o build/testes confirmarem que são dispensáveis.
