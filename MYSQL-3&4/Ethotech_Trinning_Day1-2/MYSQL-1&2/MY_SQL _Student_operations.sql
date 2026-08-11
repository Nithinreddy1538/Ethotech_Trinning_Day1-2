create database college;
use college;

create table student(
id int primary key,
name varchar(20),
age int,
dept varchar(20),
email varchar(30)
);
desc student;
insert into student values(01,"charan",23,"MCA","cherry@gmail.com");
INSERT INTO student VALUES (02, 'Nithin', 22, 'MCA',"Nithin@gmail.com");
INSERT INTO student VALUES (03, 'Rahul', 24, 'MCA',"Rahul@gmail.com");
INSERT INTO student VALUES (04, 'Anjali', 21, 'MCA',"anjali@gmail.com");
INSERT INTO student VALUES (05, 'Priya', 23, 'MCA',"priya@gmail.com");

select * from student;

ALTER TABLE student
ADD phone_no varchar(50);

desc student;

ALTER TABLE student
MODIFY age TINYINT;

desc student;

ALTER TABLE student
RENAME COLUMN dept TO BRANCH;
desc student;


 


select * from Student;


 
