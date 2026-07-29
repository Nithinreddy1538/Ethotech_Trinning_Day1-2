class name:
    def __init__(self,name):
        self.name=name
    def display(self):
        print(f"Name:{self.name}")
class age(name):
    def __init__(self,name,age,salary):
        super().__init__(name)
        self.age=age
        self.salary=salary
    def display2(self):
        print(f"Age:{self.age}")
        print(f"Salary:{self.salary}")
obj=age("Sai",23,100000)
obj.display()
obj.display2()    