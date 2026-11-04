-- Pórtico: armazenamento público somente para leitura das videoaulas autorais.
-- A escrita não é concedida ao cliente público/autenticado; uploads exigem credencial administrativa confiável.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portico-lesson-videos',
  'portico-lesson-videos',
  true,
  104857600,
  array['video/mp4']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Não criar políticas de INSERT/UPDATE/DELETE para anon ou authenticated.
-- Arquivos neste bucket são públicos para reprodução; somente administradores os publicam.
