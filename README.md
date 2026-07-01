# NAS Fitness Lab — Landing + Admin

Landing page de **Julieta Nas** (NAS Fitness Lab) con panel de administración
autogestionable en `/admin`. Construida con Next.js (App Router) + Tailwind +
Supabase (auth, base de datos y storage de imágenes).

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **Tailwind CSS v4** con la paleta y tipografías del manual de marca NASFIT
- **Supabase**: login del admin, tabla `site_content` (jsonb) y bucket de imágenes

## Estructura

```
src/
  app/
    page.tsx              → landing pública (lee contenido de Supabase)
    admin/                → panel protegido (login + editor de contenido)
  components/landing/     → Hero, About, Services, Testimonials, Contact, Footer
  components/admin/       → ImageField (subida a Supabase Storage)
  lib/content/            → tipos, contenido por defecto y loader
  lib/supabase/           → clientes browser/server + proxy de auth
supabase/setup.sql        → script para crear tabla, políticas y bucket
public/images/julieta/    → fotos reales de Julieta
```

## Cómo correr en local

```bash
npm install
npm run dev          # http://localhost:3000
```

Sin `.env.local`, la landing funciona con el **contenido por defecto** y el
panel `/admin` avisa que falta conectar Supabase (no se puede guardar todavía).

## Conectar Supabase (para que el admin guarde cambios)

1. Crear un proyecto gratis en [supabase.com](https://supabase.com).
2. Copiar `.env.local.example` a `.env.local` y completar con `Project
   Settings > API`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. En `SQL Editor` de Supabase, ejecutar el contenido de
   [`supabase/setup.sql`](supabase/setup.sql) (crea la tabla, las políticas de
   seguridad y el bucket de imágenes).
4. En `Authentication > Users > Add user`, crear el usuario de Julieta
   (email + contraseña). Con eso ya puede entrar a `/admin`.
5. Reiniciar `npm run dev`.

## Deploy (Vercel)

1. Subir el repo a GitHub e importarlo en Vercel.
2. Cargar las mismas variables de entorno (`NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`) en el proyecto de Vercel.
3. Deploy. El admin queda en `tudominio.com/admin`.

## Notas

- Las fuentes del manual (Monument, Editorial New) son de pago; se usan
  reemplazos de Google Fonts con look similar (Unbounded, Instrument Serif).
  Si se consiguen los archivos con licencia, se cambian en `src/app/layout.tsx`.
- El prototipo estático original quedó archivado en `legacy-static/`.
