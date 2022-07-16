--create table members

create table members (
  organization_id uuid not null,
  member_id uuid  not null,
primary key (member_id));

-- Set up Realtime
BEGIN;
  DROP publication IF EXISTS supabase_realtime;
  CREATE publication supabase_realtime;
COMMIT;
ALTER publication supabase_realtime
  ADD TABLE members;
