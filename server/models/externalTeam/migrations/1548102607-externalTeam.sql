create table external_team (
  -- base
  id uuid primary key,
  type text not null,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone,

  -- foreign
  manuscript_id uuid not null, -- add references
  members jsonb not null, -- make array of foreign keys

  -- own
  team_type text not null
);
