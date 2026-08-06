CREATE DATABASE college_db;

USE college_db;

CREATE TABLE students(
id INT PRIMARY KEY,
name VARCHAR(50),
marks INT
);

ALTER TABLE students
ADD city VARCHAR(50);

INSERT INTO students
VALUES(1,'Charan',90,'Shimoga');

UPDATE students
SET marks=95
WHERE id=1;

DELETE FROM students
WHERE id=1;

SELECT * FROM students;

START TRANSACTION;

INSERT INTO students
VALUES(2,'Ravi',85,'Bangalore');

COMMIT;

GRANT SELECT,INSERT
ON college_db.students
TO 'user1'@'localhost';

REVOKE INSERT
ON college_db.students
FROM 'user1'@'localhost';