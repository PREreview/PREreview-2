-- CREATE TABLE manuscripts (
--     id UUID PRIMARY KEY,
--     created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
--     updated TIMESTAMP WITH TIME ZONE,
--     owners JSONB,
--     title TEXT,
--     content TEXT,
--     type TEXT NOT NULL
-- );

CREATE TABLE manuscripts (
    id UUID PRIMARY KEY,
    data JSONB,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    authors JSONB,
    status JSONB,
    title TEXT,
    type TEXT NOT NULL
);