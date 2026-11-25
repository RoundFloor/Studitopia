CREATE DOMAIN STUDITOPIA.TYPE_EMAIL AS STUDITOPIA.CITEXT
    CHECK (VALUE ~ '^[a-zA-Z][a-zA-Z0-9]*([._-][a-zA-Z0-9]+)*([%+][a-zA-Z0-9]+)?@([a-zA-Z0-9]+[-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$' AND LENGTH(VALUE) BETWEEN 8 AND 254);
