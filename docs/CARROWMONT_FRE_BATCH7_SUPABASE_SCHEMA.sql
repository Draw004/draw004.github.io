-- Carrowmont Batch 7: optional saved financial profile + saved scenarios.
-- Run this in the Supabase SQL editor only after creating the free project.
-- Never place a service_role key in Carrowmont frontend code.

create table if not exists public.carrowmont_profiles (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  profile jsonb not null default '{}'::jsonb,
  schema_version integer not null default 1,
  region text,
  currency text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.carrowmont_saved_scenarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  journey text not null,
  label text not null,
  scenario jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists carrowmont_saved_scenarios_user_id_idx
  on public.carrowmont_saved_scenarios using btree (user_id);

alter table public.carrowmont_profiles enable row level security;
alter table public.carrowmont_saved_scenarios enable row level security;

revoke all on table public.carrowmont_profiles from anon, authenticated;
revoke all on table public.carrowmont_saved_scenarios from anon, authenticated;
grant select, insert, update, delete on table public.carrowmont_profiles to authenticated;
grant select, insert, update, delete on table public.carrowmont_saved_scenarios to authenticated;

create policy "Carrowmont profile select own row"
on public.carrowmont_profiles for select to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Carrowmont profile insert own row"
on public.carrowmont_profiles for insert to authenticated
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Carrowmont profile update own row"
on public.carrowmont_profiles for update to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Carrowmont profile delete own row"
on public.carrowmont_profiles for delete to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Carrowmont scenarios select own rows"
on public.carrowmont_saved_scenarios for select to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Carrowmont scenarios insert own rows"
on public.carrowmont_saved_scenarios for insert to authenticated
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Carrowmont scenarios update own rows"
on public.carrowmont_saved_scenarios for update to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Carrowmont scenarios delete own rows"
on public.carrowmont_saved_scenarios for delete to authenticated
using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
