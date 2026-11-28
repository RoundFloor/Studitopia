INSERT INTO STUDITOPIA.INCLUDE_POST_TAG(POST_ID, TAG_ID)
SELECT p.ID, t.ID
FROM (VALUES
    ('Course registration for data structures', 'Data Structures and Algorithms'),
    ('Course registration for data structures', 'Introduction to Programming'),
    ('Exam schedule for this semester', 'Database Systems'),
    ('Exam schedule for this semester', 'Database Fundamentals'),
    ('Campus wifi in the library', 'Computer Networks'),
    ('Campus wifi in the library', 'Information Security'),
    ('Software engineering project teammates', 'Software Engineering'),
    ('Software engineering project teammates', 'Software Engineering Project'),
    ('Preparing for the database midterm', 'Database Systems'),
    ('Preparing for the database midterm', 'Advanced Database'),
    ('Vegetarian options in the canteen', 'Business Administration'),
    ('Vegetarian options in the canteen', 'Business Management'),
    ('Operating systems lecture notes', 'Operating Systems'),
    ('Operating systems lecture notes', 'Computer Networks'),
    ('Scholarship application process', 'University of Science'),
    ('Scholarship application process', 'University of Information Technology'),
    ('Feedback on the new online portal', 'Software Engineering'),
    ('Feedback on the new online portal', 'Web Development'),
    ('Power outlets in building C', 'University of Technology'),
    ('Power outlets in building C', 'Embedded Systems'),
    ('Balancing work and study', 'University of Economics'),
    ('Balancing work and study', 'Business Administration'),
    ('Career fair next week', 'University of Economics'),
    ('Career fair next week', 'Finance and Banking'),
    ('Library opening hours during exams', 'University of Social Sciences and Humanities'),
    ('Library opening hours during exams', 'English Language'),
    ('Joining the computer science club', 'University of Information Technology'),
    ('Joining the computer science club', 'Software Engineering'),
    ('Student card delivery', 'Open University'),
    ('Student card delivery', 'Information Systems'),
    ('Learning PostgreSQL indexing', 'Database Systems'),
    ('Learning PostgreSQL indexing', 'Database Fundamentals'),
    ('Node.js versions in the lab', 'Operating Systems'),
    ('Node.js versions in the lab', 'Introduction to Programming'),
    ('Shuttle bus between campuses', 'University of Technology'),
    ('Shuttle bus between campuses', 'Computer Networks'),
    ('Requesting a transcript', 'University of Law'),
    ('Requesting a transcript', 'Faculty of Law'),
    ('Orientation event appreciation', 'Ton Duc Thang University'),
    ('Orientation event appreciation', 'Software Engineering Technology')
) AS v(post_title, tag_name)
JOIN STUDITOPIA.POST p ON p.TITLE = v.post_title
JOIN STUDITOPIA.TAG t ON t.NAME = v.tag_name;

INSERT INTO STUDITOPIA.INCLUDE_POST_TAG(POST_ID, TAG_ID)
SELECT P.ID, T.ID FROM POST P
CROSS JOIN (SELECT * FROM TAG LIMIT 10) T
ON CONFLICT DO NOTHING;