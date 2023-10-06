CREATE TYPE status_enum AS ENUM ('Pending', 'Open', 'Closed');

CREATE TABLE issues (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status status_enum
);