# Videoaulas próprias do Pórtico

A trilha não usa mais aulas narradas. Uma videoaula original só entra na ordem principal quando o arquivo está hospedado, o ID está em `PUBLISHED_IDS` em `src/content/estudos/portico-videos.ts` e o vídeo foi aberto para validar imagem e som.

## Arquivos previstos

| Ordem | Arquivo | Assunto | Destino na trilha |
|---|---|---|---|
| 01 | `01-o-computador-por-dentro.mp4` | CPU, memória RAM e armazenamento | Sistemas Operacionais → Processos, memória e serviços |
| 02 | `02-programa-e-processo.mp4` | Programa x processo | Sistemas Operacionais → Processos, memória e serviços |

## Publicação

1. Aplicar `supabase/migrations/20261104000100_portico_lesson_video_storage.sql` no Supabase de produção.
2. Enviar os dois MP4s ao bucket público `portico-lesson-videos`, mantendo exatamente os nomes acima.
3. Abrir cada URL pública e confirmar reprodução de imagem e som.
4. Em `src/content/estudos/portico-videos.ts`, adicionar somente os IDs dos arquivos enviados a `PUBLISHED_IDS`.
5. Conferir `/trilha` e `/aprender/cap.infra.03/processos`: as videoaulas devem aparecer entre a explicação e a prática.

A lista publicada fica vazia por padrão para impedir links quebrados. Vídeos externos marcados `a-conferir` continuam em Explorar, mas não contam para o progresso nem bloqueiam a trilha.
