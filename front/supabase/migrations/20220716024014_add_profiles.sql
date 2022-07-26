create table profiles (
  id uuid default uuid_generate_v4()  not null,
  username text,
  avatar text,
  created_at timestamp without time zone default now() not null,
  updated_at timestamp without time zone,
primary key (id));

-- Enable automatic update_at update
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

--RLS profiles

ALTER TABLE profiles
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Set up Realtime
BEGIN;
  DROP publication IF EXISTS supabase_realtime;
  CREATE publication supabase_realtime;
COMMIT;
ALTER publication supabase_realtime
  ADD TABLE profiles;

