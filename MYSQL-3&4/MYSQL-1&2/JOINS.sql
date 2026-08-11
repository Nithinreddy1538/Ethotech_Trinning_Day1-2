USE college;

DROP TABLE IF EXISTS student1;
DROP TABLE IF EXISTS course;

CREATE TABLE course (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(30)
);

CREATE TABLE student1 (
    stu_id INT PRIMARY KEY,
    name VARCHAR(30),
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

INSERT INTO course (course_id, course_name) VALUES
(101, 'Python'),
(102, 'Java'),
(103, 'SQL'),
(104, 'React'),
(105, 'Data Science');

INSERT INTO student1 (stu_id, name, course_id) VALUES
(1, 'Nithin', 101),
(2, 'Charan', 102),
(3, 'Rahul', 103),
(4, 'Anjali', 104),
(5, 'Priya', 105);


SELECT student1.stu_id,
       student1.name,
       course.course_name
FROM student1
INNER JOIN course
ON student1.course_id = course.course_id;