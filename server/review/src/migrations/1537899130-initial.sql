CREATE TABLE reviews (
    id UUID PRIMARY KEY,
    article_version_id UUID,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    events JSONB,
    status JSONB,
    content TEXT,
    reviewer_id UUID,
    recommendation TEXT,
    type TEXT NOT NULL
);