--create table members

create table members (
  id uuid default uuid_generate_v4() not null,
  organization_id uuid not null,
  member_id uuid  not null,
  invitation_status text not null,
primary key (id));

-- Set up Realtime
BEGIN;
  DROP publication IF EXISTS supabase_realtime;
  CREATE publication supabase_realtime;
COMMIT;
ALTER publication supabase_realtime
  ADD TABLE members;
