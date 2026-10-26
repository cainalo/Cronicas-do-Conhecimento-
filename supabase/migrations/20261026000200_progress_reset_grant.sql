-- Reinício do progresso (pacote v4, etapa 7), parte 2: a coluna progress_reset_at precisa poder ser
-- gravada pela própria pessoa. A tabela profiles usa permissão por coluna; esta migração só acrescenta
-- a nova coluna à lista. A política de RLS "profiles: alterar o próprio" continua limitando à própria linha.
grant update (progress_reset_at) on public.profiles to authenticated;
