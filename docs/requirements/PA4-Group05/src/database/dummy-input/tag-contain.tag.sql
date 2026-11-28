INSERT INTO STUDITOPIA.TAG_CONTAIN(TAG_ID_A, TAG_ID_B)
SELECT parent.ID, child.ID
FROM (VALUES
    ('University of Science', 'Artificial Intelligence'),
    ('University of Science', 'Data Science'),
    ('University of Science', 'Software Engineering'),
    ('University of Information Technology', 'Artificial Intelligence'),
    ('University of Information Technology', 'Data Science'),
    ('University of Information Technology', 'Software Engineering'),
    ('University of Information Technology', 'Networking and Security'),
    ('International University', 'Business Administration'),
    ('International University', 'Finance and Banking'),
    ('International University', 'English Language'),
    ('University of Technology', 'Software Engineering'),
    ('University of Technology', 'Embedded Systems'),
    ('University of Social Sciences and Humanities', 'English Language'),
    ('University of Social Sciences and Humanities', 'Vietnamese Studies'),
    ('University of Economics', 'Business Administration'),
    ('University of Economics', 'Finance and Banking'),
    ('University of Law', 'Business Administration'),
    ('University of Education', 'English Language'),
    ('University of Education', 'Vietnamese Studies'),
    ('Hanoi University of Science and Technology', 'Artificial Intelligence'),
    ('Hanoi University of Science and Technology', 'Software Engineering'),
    ('Vietnam National University', 'Artificial Intelligence'),
    ('Vietnam National University', 'Data Science'),
    ('Vietnam National University', 'Software Engineering'),
    ('Foreign Trade University', 'Business Administration'),
    ('Foreign Trade University', 'Finance and Banking'),
    ('Foreign Trade University', 'English Language'),
    ('Open University', 'Software Engineering'),
    ('Open University', 'Business Administration'),
    ('Ton Duc Thang University', 'Artificial Intelligence'),
    ('Ton Duc Thang University', 'Software Engineering'),
    ('Ton Duc Thang University', 'Business Administration'),
    ('Da Nang University of Technology', 'Software Engineering'),
    ('Da Nang University of Technology', 'Networking and Security'),
    ('Can Tho University', 'Data Science'),
    ('Can Tho University', 'Business Administration'),
    ('Artificial Intelligence', 'Machine Learning'),
    ('Artificial Intelligence', 'Computer Graphics'),
    ('Data Science', 'Database Systems'),
    ('Data Science', 'Data Structures and Algorithms'),
    ('Software Engineering', 'Object Oriented Programming'),
    ('Software Engineering', 'Web Development'),
    ('Networking and Security', 'Computer Networks'),
    ('Networking and Security', 'Information Security'),
    ('Embedded Systems', 'Operating Systems'),
    ('Embedded Systems', 'Computer Graphics'),
    ('Database Systems', 'Database Fundamentals'),
    ('Database Systems', 'Advanced Database'),
    ('Data Structures and Algorithms', 'Introduction to Programming'),
    ('Web Development', 'Software Engineering Project')
) AS v(parent_name, child_name)
JOIN STUDITOPIA.TAG parent ON parent.NAME = v.parent_name
JOIN STUDITOPIA.TAG child ON child.NAME = v.child_name;

INSERT INTO STUDITOPIA.TAG_CONTAIN(TAG_ID_A, TAG_ID_B)
SELECT T1.ID, T2.ID FROM STUDITOPIA.TAG T1
JOIN (SELECT * FROM STUDITOPIA.TAG LIMIT 20) T2 ON T1.ID != T2.ID
ON CONFLICT DO NOTHING;
