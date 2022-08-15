create table mail (
    id uuid not null default uuid_generate_v4(),
    sender_id uuid not null,
    address_id uuid not null,
    organization_id uuid not null,
    created_at timestamp with time zone not null default now(),
primary key (id));
