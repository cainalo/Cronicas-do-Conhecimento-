# Videoaulas próprias do Pórtico

A trilha não usa mais aulas narradas. Uma videoaula original só entra na ordem principal quando o arquivo está hospedado, o ID está em `PUBLISHED_IDS` em `src/content/estudos/portico-videos.ts` e o vídeo foi aberto para validar imagem e som.

## Arquivos previstos

| Ordem | Arquivo | Assunto | Destino na trilha |
|---|---|---|---|
| 01 | `01-o-computador-por-dentro.mp4` | CPU, memória RAM e armazenamento | Sistemas Operacionais → Processos, memória e serviços |
| 02 | `02-programa-e-processo.mp4` | Programa x processo | Sistemas Operacionais → Processos, memória e serviços |

## Preparação do Supabase

O projeto remoto é identificado pelo ref `qptxcdksufdpbxddqpsw`. O repositório contém:

- `supabase/config.toml`: configuração mínima e sem credenciais para o Supabase CLI.
- `supabase/migrations/20261104000100_portico_lesson_video_storage.sql`: cria/atualiza o bucket público de leitura `portico-lesson-videos`, com MIME permitido `video/mp4` e limite por bucket de 100 MiB.
- `scripts/upload-portico-video.mjs`: envia MP4 por TUS (transferência resumível), valida nome/tamanho e imprime a URL pública. A sessão de upload pode ser retomada se a conexão cair.

### Aplicar a migração remota

Na raiz do repositório, com Node.js e o Supabase CLI disponíveis:

```bash
npx supabase login
npx supabase link --project-ref qptxcdksufdpbxddqpsw
npx supabase migration list --remote
npx supabase db push --dry-run --remote
```

O comando `link` solicita a senha do banco de dados do projeto. Revise o `dry-run`: ele deve listar somente as migrações pendentes que você realmente pretende aplicar. Se a migração `20261104000100` estiver pendente e o plano estiver correto:

```bash
npx supabase db push --remote
```

Não execute `db reset --remote`: esse comando é destrutivo para o banco remoto. Se a senha do banco foi perdida, redefina-a no painel do projeto antes de continuar; não a compartilhe no chat.

Alternativa manual: executar o conteúdo do arquivo SQL no SQL Editor do projeto. Nesse caso, a estrutura do bucket é criada, mas o histórico de migrações do CLI não é atualizado automaticamente; prefira o fluxo de CLI acima para manter o histórico consistente.

## Limites do Storage

O bucket tem um limite por arquivo de 100 MiB, mas o limite global do projeto prevalece. No plano Free, o limite global máximo é 50 MB. O primeiro MP4 foi otimizado para aproximadamente 32,9 MiB, deixando margem abaixo desse teto. Para arquivos acima de 6 MB, o Supabase recomenda TUS Resumable Upload em vez do upload multipart padrão, por ser mais confiável em conexões instáveis.

## Enviar os arquivos

O script aceita apenas os dois nomes definidos no catálogo. A chave deve ser uma Secret API key do projeto (preferida) ou a chave legada `service_role`. Ela é usada exclusivamente no terminal local; nunca deve ir para o navegador, para o Git, para arquivos do repositório ou para o chat.

No PowerShell, a chave é solicitada sem exibi-la:

```powershell
$secure = Read-Host "Secret API key do Supabase" -AsSecureString
$env:SUPABASE_SECRET_KEY = [System.Net.NetworkCredential]::new("", $secure).Password
node scripts/upload-portico-video.mjs ".\\01-o-computador-por-dentro.mp4"
Remove-Item Env:SUPABASE_SECRET_KEY
```

No macOS/Linux:

```bash
read -s -p "Secret API key do Supabase: " SUPABASE_SECRET_KEY
export SUPABASE_SECRET_KEY
node scripts/upload-portico-video.mjs "./01-o-computador-por-dentro.mp4"
unset SUPABASE_SECRET_KEY
```

Para substituir intencionalmente um arquivo já existente, acrescente `--upsert` ao comando. Evite sobrescrever arquivos já publicados, pois a CDN pode manter cópias antigas em cache; para conteúdo novo, prefira um nome/versão novo.

Após a transferência, abra a URL pública impressa pelo script e confirme imagem e áudio.

## Publicar na trilha

1. Somente depois de validar a URL pública, em `src/content/estudos/portico-videos.ts`, adicione o ID do vídeo enviado a `PUBLISHED_IDS`.
2. Faça commit e publique o site.
3. Confira `/trilha` e `/aprender/cap.infra.03/processos`: as videoaulas devem aparecer entre a explicação e a prática, sem reintroduzir aulas narradas.

A lista publicada fica vazia por padrão para impedir links quebrados. Vídeos externos marcados `a-conferir` continuam em Explorar, mas não contam para o progresso nem bloqueiam a trilha.
