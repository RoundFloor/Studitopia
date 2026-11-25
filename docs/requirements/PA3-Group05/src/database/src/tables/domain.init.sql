CREATE TABLE STUDITOPIA.DOMAIN (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    DOMAIN STUDITOPIA.CITEXT NOT NULL,
    CREATE_TIME TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IDX_DOMAIN ON STUDITOPIA.DOMAIN(DOMAIN);

INSERT INTO STUDITOPIA.DOMAIN(DOMAIN) VALUES
    ('student.hcmus.edu.vn'),
    ('clc.fitus.edu.vn'),
    ('apcs.fitus.edu.vn'),
    ('sdh.uel.edu.vn'),
    ('st.uel.edu.vn'),
    ('ms.uit.edu.vn'),
    ('gm.uit.edu.vn'),
    ('student.hcmiu.edu.vn'),
    ('hcmut.edu.vn'),
    ('ctvp.fitus.edu.vn'),
    ('hcmussh.edu.vn');
