-- Table des favoris utilisateur
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  model_id text not null,
  provider_id text,
  created_at timestamptz default now() not null,

  unique(user_id, model_id, provider_id)
);

-- RLS : chaque utilisateur ne voit que ses propres favoris
alter table public.favorites enable row level security;

create policy "Users can view own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- Index pour les requêtes fréquentes
create index favorites_user_id_idx on public.favorites(user_id);
create index favorites_model_id_idx on public.favorites(model_id);
