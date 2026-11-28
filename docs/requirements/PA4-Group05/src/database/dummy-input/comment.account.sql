INSERT INTO STUDITOPIA.COMMENT(CONTENT, ACCOUNT_ID, CREATED_TIME)
SELECT v.content, a.ID, v.created_at
FROM (VALUES
    ('How do I register for the data structures course?', 'alice.nguyen', TIMESTAMPTZ '2026-03-01 08:00:00+07'),
    ('Where can I find the exam schedule for this semester?', 'bob.tran', TIMESTAMPTZ '2026-03-01 09:00:00+07'),
    ('The campus wifi keeps disconnecting in the library.', 'carol.le', TIMESTAMPTZ '2026-03-01 10:00:00+07'),
    ('Looking for teammates for the software engineering project.', 'david.pham', TIMESTAMPTZ '2026-03-01 11:00:00+07'),
    ('What is the best way to prepare for the database midterm?', 'frank.ho', TIMESTAMPTZ '2026-03-01 12:00:00+07'),
    ('The canteen should add more vegetarian options.', 'henry.bui', TIMESTAMPTZ '2026-03-01 13:00:00+07'),
    ('Does anyone have notes from the operating systems lecture?', 'kelly.tran', TIMESTAMPTZ '2026-03-01 14:00:00+07'),
    ('How do I apply for a scholarship this year?', 'liam.phan', TIMESTAMPTZ '2026-03-01 15:00:00+07'),
    ('The new online portal is much faster than before.', 'mia.nguyen', TIMESTAMPTZ '2026-03-01 16:00:00+07'),
    ('Can we get more power outlets in building C?', 'olivia.vo', TIMESTAMPTZ '2026-03-01 17:00:00+07'),
    ('Tips for balancing part-time work and study?', 'peter.do', TIMESTAMPTZ '2026-03-01 18:00:00+07'),
    ('Where is the career fair happening next week?', 'rose.bui', TIMESTAMPTZ '2026-03-01 19:00:00+07'),
    ('The library should extend its opening hours during exams.', 'sam.dang', TIMESTAMPTZ '2026-03-02 08:00:00+07'),
    ('How do I join the computer science club?', 'uma.tran', TIMESTAMPTZ '2026-03-02 09:00:00+07'),
    ('My student card has not arrived yet, what should I do?', 'victor.le', TIMESTAMPTZ '2026-03-02 10:00:00+07'),
    ('Best resources to learn PostgreSQL indexing?', 'wendy.vo', TIMESTAMPTZ '2026-03-02 11:00:00+07'),
    ('The lab computers need newer versions of Node.js.', 'xavier.do', TIMESTAMPTZ '2026-03-02 12:00:00+07'),
    ('Is there a shuttle bus between campuses?', 'anna.phan', TIMESTAMPTZ '2026-03-02 13:00:00+07'),
    ('How can I request a transcript for an internship?', 'ben.dang', TIMESTAMPTZ '2026-03-02 14:00:00+07'),
    ('Thanks to everyone who helped with the orientation event.', 'chloe.le', TIMESTAMPTZ '2026-03-02 15:00:00+07')
) AS v(content, username, created_at)
JOIN STUDITOPIA.ACCOUNT a ON a.USERNAME = v.username::citext;

INSERT INTO STUDITOPIA.COMMENT(CONTENT, ACCOUNT_ID, COMMENT_ID, CREATED_TIME)
SELECT v.content, a.ID, p.ID, v.created_at
FROM (VALUES
    ('You can register through the student portal during the open window.', 'bob.tran', 'How do I register for the data structures course?', TIMESTAMPTZ '2026-03-01 08:30:00+07'),
    ('The exam schedule is posted on the faculty notice board every Friday.', 'carol.le', 'Where can I find the exam schedule for this semester?', TIMESTAMPTZ '2026-03-01 09:30:00+07'),
    ('Try connecting to the EDUROAM network instead of the guest wifi.', 'david.pham', 'The campus wifi keeps disconnecting in the library.', TIMESTAMPTZ '2026-03-01 10:30:00+07'),
    ('I am also looking for a team, let us meet after class tomorrow.', 'frank.ho', 'Looking for teammates for the software engineering project.', TIMESTAMPTZ '2026-03-01 11:30:00+07'),
    ('Practice the normalization exercises and review the lecture slides.', 'henry.bui', 'What is the best way to prepare for the database midterm?', TIMESTAMPTZ '2026-03-01 12:30:00+07'),
    ('The student union is collecting feedback about the canteen this week.', 'kelly.tran', 'The canteen should add more vegetarian options.', TIMESTAMPTZ '2026-03-01 13:30:00+07'),
    ('I uploaded my notes to the shared drive, check the course group.', 'liam.phan', 'Does anyone have notes from the operating systems lecture?', TIMESTAMPTZ '2026-03-01 14:30:00+07'),
    ('Visit the student affairs office with your academic transcript.', 'mia.nguyen', 'How do I apply for a scholarship this year?', TIMESTAMPTZ '2026-03-01 15:30:00+07'),
    ('Agreed, the new portal also works better on mobile devices.', 'olivia.vo', 'The new online portal is much faster than before.', TIMESTAMPTZ '2026-03-01 16:30:00+07'),
    ('Building C will get more power outlets after the renovation.', 'peter.do', 'Can we get more power outlets in building C?', TIMESTAMPTZ '2026-03-01 17:30:00+07')
) AS v(content, username, parent_content, created_at)
JOIN STUDITOPIA.ACCOUNT a ON a.USERNAME = v.username::citext
JOIN STUDITOPIA.COMMENT p ON p.CONTENT = v.parent_content;

UPDATE STUDITOPIA.COMMENT p
SET COMMENT = counts.total
FROM (
    SELECT COMMENT_ID, COUNT(*) AS total
    FROM STUDITOPIA.COMMENT
    WHERE COMMENT_ID IS NOT NULL
    GROUP BY COMMENT_ID
) AS counts
WHERE p.ID = counts.COMMENT_ID;