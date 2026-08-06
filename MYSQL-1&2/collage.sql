create database college;
use college;

create table student(
id int primary key,
name varchar(20),
age int,
dept varchar(20),
email varchar(30)

);
;

select * from student;

ALTER TABLE student
ADD email varchar(50);

desc student;

ALTER TABLE student
MODIFY email TINYINT;

desc student;

ALTER TABLE student
RENAME COLUMN email TO email_id;
desc student;

RENAME TABLE student TO Student_Details;

desc student_Details;

Truncate  table Student_Details;
select * from Student_Details;
Drop table  Student_Details;
select * from Student_Details;


Drop Database college;
