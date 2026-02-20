-- Run this in Supabase SQL Editor to enable threaded comments.
-- Safe to re-run: IF NOT EXISTS guards are used.

alter table public.comments
  add column if not exists parent_id uuid references public.comments(id) on delete cascade;

create index if not exists comments_parent_id_created_at_idx
  on public.comments(parent_id, created_at desc);
