-- ============================================================
-- NAS Fitness Lab — Setup de Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1) Tabla de contenido del sitio (una sola fila: id = 'landing')
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- Lectura pública (la landing la lee sin login)
drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read"
  on public.site_content for select
  using (true);

-- Escritura solo para usuarios autenticados (el admin)
drop policy if exists "site_content_auth_write" on public.site_content;
create policy "site_content_auth_write"
  on public.site_content for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- 2) Storage bucket para las imágenes y videos editables desde el admin
--    (guarda también las grabaciones de pantalla de la sección App)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- Lectura pública de las imágenes
drop policy if exists "site_images_public_read" on storage.objects;
create policy "site_images_public_read"
  on storage.objects for select
  using (bucket_id = 'site-images');

-- Subida / modificación solo para usuarios autenticados
drop policy if exists "site_images_auth_write" on storage.objects;
create policy "site_images_auth_write"
  on storage.objects for all
  using (bucket_id = 'site-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'site-images' and auth.role() = 'authenticated');

-- ============================================================
-- 3) Crear el usuario admin (Julieta)
-- Hacelo desde: Supabase Dashboard > Authentication > Users > Add user
-- (email + password). No hace falta SQL para eso.
-- ============================================================
