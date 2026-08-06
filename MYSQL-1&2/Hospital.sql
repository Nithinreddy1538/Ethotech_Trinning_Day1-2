create database hospital;
use hospital;

create table hospital(
Name varchar(20),
age int,
phone_No  int,
Disease varchar(20)
);

show tables;

describe hospital;
insert into hospital values("Charan",23,1234567890,"Cancer");
insert into hospital values("Vamsi",95,987675421,"Maleriya");
insert into  hospital values("Karna",24,987654321,"OCD");
insert into  hospital values("Nitheesh",23,986576423,"Love");

select * from hospital;