create table external_user (
  -- base
  id uuid primary key,
  type text not null,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone,

  -- own
  email text not null,
  name text not null
);
