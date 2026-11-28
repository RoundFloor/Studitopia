INSERT INTO STUDITOPIA.RELATED_EMAIL_TAG(TAG_ID, DOMAIN_ID)
SELECT t.ID, d.ID
FROM (VALUES
    ('University of Science', 'student.hcmus.edu.vn'),
    ('University of Science', 'clc.fitus.edu.vn'),
    ('University of Science', 'apcs.fitus.edu.vn'),
    ('Faculty of Information Technology', 'apcs.fitus.edu.vn'),
    ('University of Science', 'ctvp.fitus.edu.vn'),
    ('University of Information Technology', 'ms.uit.edu.vn'),
    ('University of Information Technology', 'gm.uit.edu.vn'),
    ('University of Information Technology', 'student.uit.edu.vn'),
    ('International University', 'student.hcmiu.edu.vn'),
    ('University of Technology', 'hcmut.edu.vn'),
    ('University of Technology', 'student.hcmut.edu.vn'),
    ('University of Social Sciences and Humanities', 'hcmussh.edu.vn'),
    ('University of Social Sciences and Humanities', 'student.hcmussh.edu.vn'),
    ('University of Economics', 'sdh.uel.edu.vn'),
    ('University of Economics', 'st.uel.edu.vn'),
    ('University of Economics', 'student.uel.edu.vn'),
    ('University of Economics', 'student.ueh.edu.vn'),
    ('Hanoi University of Science and Technology', 'student.hust.edu.vn'),
    ('Vietnam National University', 'student.vnu.edu.vn'),
    ('Foreign Trade University', 'student.ftu.edu.vn'),
    ('Open University', 'student.ou.edu.vn'),
    ('Ton Duc Thang University', 'student.tdtu.edu.vn'),
    ('Da Nang University of Technology', 'student.dut.udn.vn'),
    ('Can Tho University', 'student.ctu.edu.vn'),
    ('University of Technology', 'student.hutech.edu.vn'),
    ('University of Information Technology', 'student.vku.edu.vn'),
    ('University of Science', 'student.dlu.edu.vn'),
    ('Can Tho University', 'student.agu.edu.vn'),
    ('Can Tho University', 'student.tvu.edu.vn'),
    ('University of Education', 'student.ntu.edu.vn'),
    ('University of Information Technology', 'student.ptit.edu.vn')
) AS v(tag_name, domain)
JOIN STUDITOPIA.TAG t ON t.NAME = v.tag_name
JOIN STUDITOPIA.DOMAIN d ON d.DOMAIN = v.domain::citext;
