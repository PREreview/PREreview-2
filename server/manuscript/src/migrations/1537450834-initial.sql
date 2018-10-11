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
    acknowledgements TEXT,
    -- data JSONB,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    updated TIMESTAMP WITH TIME ZONE,
    authors JSONB,
    comments TEXT,
    communication_history JSONB,
    currently_with UUID,
    data_type TEXT,
    decision_letter TEXT,
    disclaimer BOOLEAN,
    funding TEXT,
    gene_expression JSONB,
    image JSONB,
    laboratory JSONB,
    methods TEXT,
    pattern_description TEXT,
    reagents TEXT,
    "references" TEXT,
    status JSONB,
    suggested_reviewer JSONB,
    title TEXT,
    type TEXT NOT NULL
);