-- Run this in Supabase SQL Editor to enable participant count on the start screen.
-- Safe to re-run.

create table if not exists public.test_stats (
  key text primary key,
  value bigint not null default 0,
  updated_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table public.test_stats enable row level security;

drop policy if exists "test_stats_select_all" on public.test_stats;
create policy "test_stats_select_all"
  on public.test_stats
  for select
  using (true);

drop policy if exists "test_stats_upsert_participants" on public.test_stats;
create policy "test_stats_upsert_participants"
  on public.test_stats
  for insert
  with check (key = 'participants');

drop policy if exists "test_stats_update_participants" on public.test_stats;
create policy "test_stats_update_participants"
  on public.test_stats
  for update
  using (key = 'participants')
  with check (key = 'participants');

insert into public.test_stats(key, value)
values ('participants', 0)
on conflict (key) do nothing;

create or replace function public.increment_participants()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  next_value bigint;
begin
  update public.test_stats
  set value = value + 1,
      updated_at = timezone('utc'::text, now())
  where key = 'participants'
  returning value into next_value;

  if next_value is null then
    insert into public.test_stats(key, value)
    values ('participants', 1)
    on conflict (key)
    do update set value = public.test_stats.value + 1,
                  updated_at = timezone('utc'::text, now())
    returning value into next_value;
  end if;

  return next_value;
end;
$$;

grant execute on function public.increment_participants() to anon;
