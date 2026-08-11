class student:
    def __init__(self,name,age,Course):
        self.name=name
        self.age=age
        self.Course=Course
    def display(self):
        print(f"Name:{self.name}\nAge:{self.age}\nCourse:{self.Course}")
        print(f'{self.name} is Studing in {self.Course}')
    def study(self,subject):
        print(f'{self.name} is Studing in {subject}')

s=student("Nithin",22,"Python")
s.display()
s.study("Maths")
