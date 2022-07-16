-- CASCADE Delete setup !
alter table public.members
 add constraint members_organization_id_fkey
 foreign key (organization_id)
 references organizations(id)
 on delete cascade;

alter table public.members
 add constraint member_id_fkey
 foreign key (member_id)
 references profiles(id)
 on delete cascade;

alter table public.organizations
 add constraint administrator_id_fkey
 foreign key (administrator)
 references profiles(id)
 on delete cascade;

alter table public.profiles
 add constraint profiles_id_fkey
 foreign key (id)
 references auth.users(id)
 on delete cascade;
