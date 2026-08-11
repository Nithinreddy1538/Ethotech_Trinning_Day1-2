CREATE database  employee
USE employee

create table employee(
emp_id int,
Name varchar(20),
roll varchar(10),
dept varchar(39)
);

show tables;
describe employee;

insert into employee values(101,"SAI","testing","HR");
insert into employee values(102,"VAMSI","coding","HR");
insert into employee values(103,"Raki","Error ","TL");
insert into employee values(104,"RAM","Logic","IT DEveloper");


select * from employee;
Desc employee;