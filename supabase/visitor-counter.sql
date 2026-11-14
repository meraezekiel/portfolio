-- Unique visitor counter for the portfolio.
-- Run once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- Each browser gets a random id (kept in localStorage). The page sends it on load;
-- the id is stored once, so reloads and repeat visits from the same browser are not counted again.
-- No personal data is stored: just the random id and when it was first seen.

create table if not exists public.portfolio_visitors (
  visitor_id uuid primary key,
  first_seen timestamptz not null default now()
);

-- Row level security on with no policies: the table cannot be read or written directly
-- with the public key. The only way in is the function below.
alter table public.portfolio_visitors enable row level security;

create or replace function public.portfolio_visit(p_visitor uuid)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.portfolio_visitors (visitor_id) values (p_visitor)
  on conflict (visitor_id) do nothing;
  return (select count(*) from public.portfolio_visitors);
end;
$$;

revoke all on function public.portfolio_visit(uuid) from public;
grant execute on function public.portfolio_visit(uuid) to anon, authenticated;
