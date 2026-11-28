INSERT INTO STUDITOPIA.POST(TITLE, ACCOUNT_ID, COMMENT_ID, TRUE_RESPONSE, CREATED_TIME)
SELECT v.title, c.ACCOUNT_ID, c.ID, r.ID, v.created_at
FROM (VALUES
    ('Course registration for data structures', 'How do I register for the data structures course?', 'You can register through the student portal during the open window.', TIMESTAMPTZ '2026-03-01 08:05:00+07'),
    ('Exam schedule for this semester', 'Where can I find the exam schedule for this semester?', 'The exam schedule is posted on the faculty notice board every Friday.', TIMESTAMPTZ '2026-03-01 09:05:00+07'),
    ('Campus wifi in the library', 'The campus wifi keeps disconnecting in the library.', 'Try connecting to the EDUROAM network instead of the guest wifi.', TIMESTAMPTZ '2026-03-01 10:05:00+07'),
    ('Software engineering project teammates', 'Looking for teammates for the software engineering project.', 'I am also looking for a team, let us meet after class tomorrow.', TIMESTAMPTZ '2026-03-01 11:05:00+07'),
    ('Preparing for the database midterm', 'What is the best way to prepare for the database midterm?', 'Practice the normalization exercises and review the lecture slides.', TIMESTAMPTZ '2026-03-01 12:05:00+07'),
    ('Vegetarian options in the canteen', 'The canteen should add more vegetarian options.', 'The student union is collecting feedback about the canteen this week.', TIMESTAMPTZ '2026-03-01 13:05:00+07'),
    ('Operating systems lecture notes', 'Does anyone have notes from the operating systems lecture?', 'I uploaded my notes to the shared drive, check the course group.', TIMESTAMPTZ '2026-03-01 14:05:00+07'),
    ('Scholarship application process', 'How do I apply for a scholarship this year?', 'Visit the student affairs office with your academic transcript.', TIMESTAMPTZ '2026-03-01 15:05:00+07'),
    ('Feedback on the new online portal', 'The new online portal is much faster than before.', 'Agreed, the new portal also works better on mobile devices.', TIMESTAMPTZ '2026-03-01 16:05:00+07'),
    ('Power outlets in building C', 'Can we get more power outlets in building C?', 'Building C will get more power outlets after the renovation.', TIMESTAMPTZ '2026-03-01 17:05:00+07'),
    ('Balancing work and study', 'Tips for balancing part-time work and study?', NULL, TIMESTAMPTZ '2026-03-01 18:05:00+07'),
    ('Career fair next week', 'Where is the career fair happening next week?', NULL, TIMESTAMPTZ '2026-03-01 19:05:00+07'),
    ('Library opening hours during exams', 'The library should extend its opening hours during exams.', NULL, TIMESTAMPTZ '2026-03-02 08:05:00+07'),
    ('Joining the computer science club', 'How do I join the computer science club?', NULL, TIMESTAMPTZ '2026-03-02 09:05:00+07'),
    ('Student card delivery', 'My student card has not arrived yet, what should I do?', NULL, TIMESTAMPTZ '2026-03-02 10:05:00+07'),
    ('Learning PostgreSQL indexing', 'Best resources to learn PostgreSQL indexing?', NULL, TIMESTAMPTZ '2026-03-02 11:05:00+07'),
    ('Node.js versions in the lab', 'The lab computers need newer versions of Node.js.', NULL, TIMESTAMPTZ '2026-03-02 12:05:00+07'),
    ('Shuttle bus between campuses', 'Is there a shuttle bus between campuses?', NULL, TIMESTAMPTZ '2026-03-02 13:05:00+07'),
    ('Requesting a transcript', 'How can I request a transcript for an internship?', NULL, TIMESTAMPTZ '2026-03-02 14:05:00+07'),
    ('Orientation event appreciation', 'Thanks to everyone who helped with the orientation event.', NULL, TIMESTAMPTZ '2026-03-02 15:05:00+07'),
    ('Data structures registration follow-up', 'You can register through the student portal during the open window.', NULL, TIMESTAMPTZ '2026-03-01 08:35:00+07'),
    ('Exam schedule notice', 'The exam schedule is posted on the faculty notice board every Friday.', NULL, TIMESTAMPTZ '2026-03-01 09:35:00+07'),
    ('EDUROAM network advice', 'Try connecting to the EDUROAM network instead of the guest wifi.', NULL, TIMESTAMPTZ '2026-03-01 10:35:00+07'),
    ('Project team meetup', 'I am also looking for a team, let us meet after class tomorrow.', NULL, TIMESTAMPTZ '2026-03-01 11:35:00+07'),
    ('Database midterm practice', 'Practice the normalization exercises and review the lecture slides.', NULL, TIMESTAMPTZ '2026-03-01 12:35:00+07'),
    ('Canteen feedback collection', 'The student union is collecting feedback about the canteen this week.', NULL, TIMESTAMPTZ '2026-03-01 13:35:00+07'),
    ('Operating systems notes upload', 'I uploaded my notes to the shared drive, check the course group.', NULL, TIMESTAMPTZ '2026-03-01 14:35:00+07'),
    ('Scholarship office visit', 'Visit the student affairs office with your academic transcript.', NULL, TIMESTAMPTZ '2026-03-01 15:35:00+07'),
    ('Mobile portal feedback', 'Agreed, the new portal also works better on mobile devices.', NULL, TIMESTAMPTZ '2026-03-01 16:35:00+07'),
    ('Building C renovation', 'Building C will get more power outlets after the renovation.', NULL, TIMESTAMPTZ '2026-03-01 17:35:00+07')
) AS v(title, comment_content, response_content, created_at)
JOIN STUDITOPIA.COMMENT c ON c.CONTENT = v.comment_content
LEFT JOIN STUDITOPIA.COMMENT r ON r.CONTENT = v.response_content;
