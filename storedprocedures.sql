use student
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(15),
    course VARCHAR(100)
);
INSERT INTO students
(student_name, age, gender, email, phone, course)
VALUES
('Roopa', 23, 'Female', 'roopa@gmail.com', '9876543210', 'MCA'),
('Anjali', 22, 'Female', 'anjali@gmail.com', '9876543211', 'MCA'),
('Rahul', 23, 'Male', 'rahul@gmail.com', '9876543212', 'BCA'),
('Kiran', 21, 'Male', 'kiran@gmail.com', '9876543213', 'BSc'),
('Sneha', 22, 'Female', 'sneha@gmail.com', '9876543214', 'MCA');

DELIMITER //

CREATE PROCEDURE get_students()
BEGIN
    SELECT * FROM students;
END //

DELIMITER ;
DROP PROCEDURE IF EXISTS get_students;
DELIMITER //

CREATE PROCEDURE get_students()
BEGIN
    SELECT * FROM students;
END //

DROP PROCEDURE IF EXISTS get_students;

DELIMITER //

CREATE PROCEDURE get_students(IN p_phone VARCHAR(15))
BEGIN
    SELECT *
    FROM students
    WHERE students.phone = p_phone;
END //

DELIMITER ;

CALL get_students('9876543210');
DROP PROCEDURE IF EXISTS get_students;
DELIMITER //

CREATE PROCEDURE get_students(IN p_phone VARCHAR(15))
BEGIN
    SELECT *
    FROM students
    WHERE students.phone = p_phone;
END //

DELIMITER ;
CALL get_students('345467589345');
DELIMITER //

CREATE PROCEDURE get_students_by_id(IN p_id INT)
BEGIN
    SELECT *
    FROM students
    WHERE student_id >= p_id;
END //

DELIMITER ;
CALL get_students_by_id(2);
ALTER TABLE students
ADD COLUMN marks INT;
UPDATE students
SET marks = 85
WHERE student_id = 1;

UPDATE students
SET marks = 78
WHERE student_id = 2;
UPDATE students
SET marks = 92
WHERE student_id = 3;

UPDATE students
SET marks = 67
WHERE student_id = 4;

UPDATE students
SET marks = 88
WHERE student_id = 5;
DROP PROCEDURE IF EXISTS get_students_above_80;

DELIMITER //

CREATE PROCEDURE get_students_above_80()
BEGIN
    SELECT *
    FROM students
    WHERE marks BETWEEN minimum_marks and max_marks;
END //

DELIMITER ;
CALL get_students_above_80();
DROP PROCEDURE IF EXISTS get_students_above_80;
DELIMITER //

CREATE PROCEDURE get_students_above_80()
BEGIN
    SELECT *
    FROM students
    WHERE marks >=80;
END //

DELIMITER ;
CALL get_students_above_80();
DELIMITER //

CREATE PROCEDURE get_students_between_80_90()
BEGIN
    SELECT *
    FROM students
    WHERE marks BETWEEN 80 AND 90;
END //

DELIMITER ;
DELIMITER //

CREATE PROCEDURE count_students() 
BEGIN
    SELECT COUNT(*) AS total_students
    FROM students;
END //

DELIMITER ;
CALL count_students();
--
SET @minimum_marks = 80;

SELECT *
FROM students
WHERE marks >= @minimum_marks;
--
DELIMITER //

CREATE PROCEDURE increase_marks(INOUT marks_value INT)
BEGIN
    UPDATE students
    SET marks = marks + marks_value
    WHERE student_id = 1;

    SELECT marks INTO marks_value
    FROM students
    WHERE student_id = 1;
END //

DELIMITER ;
SET @marks = 10;

CALL increase_marks(@marks);

SELECT @marks;
