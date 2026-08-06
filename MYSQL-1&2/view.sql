use college;
select * from student;
alter table student
add marks  int;
insert into student values(101,"charan",23,"MCA","cherry@gmail.com",12502055,90);
INSERT INTO student VALUES (102, 'Nithin', 22, 'MCA',"Nithin@gmail.com",49296242949,56);
INSERT INTO student VALUES (103, 'Rahul', 24, 'MCA',"Rahul@gmail.com",4949429495,60);
INSERT INTO student VALUES (104, 'Anjali', 21, 'MCA',"anjali@gmail.com",499499494,80);
INSERT INTO student VALUES (105, 'Priya', 23, 'MCA',"priya@gmail.com",9925959535,85);

select * from student;
DELETE FROM student
WHERE id IN (1, 2, 3, 4, 5);
select * from student;

UPDATE student
SET BRANCH = 'BCA'
WHERE BRANCH = 'MCA'
AND id >= 101;
SELECT * FROM student;