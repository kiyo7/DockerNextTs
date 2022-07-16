--create organizations table

create table organizations (
  id uuid default uuid_generate_v4() not null,
  created_at timestamp without time zone default now() not null,
  administrator uuid not null,
  groupname text,
  logo text,
primary key (id));

--RLS organizations

ALTER TABLE organizations
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public organizations are viewable by everyone." ON organizations
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON organizations
  FOR INSERT WITH CHECK (auth.uid() = administrator);

CREATE POLICY "Users can update own profile." ON organizations
  FOR UPDATE USING (auth.uid() = administrator);

CREATE POLICY "Enable delete for users based on administrator" ON organizations
  FOR DELETE USING (auth.uid() = administrator);

-- Set up Realtime
BEGIN;
  DROP publication IF EXISTS supabase_realtime;
  CREATE publication supabase_realtime;
COMMIT;
ALTER publication supabase_realtime
  ADD TABLE organizations;
