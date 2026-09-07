class employee:
    def __init__(self,id,name):
        self.id=id
        self.name = name
    def display(self):
        print(f"emp_id: {self.id}")
        print(f"emp_name: {self.name}")


class employee1(employee):
    def __init__(self,id,name,language):
        super().__init__(id,name)
        self.language = language

    def display1(self):
        self.display()
        print(f"Programming Language: {self.language}")
class employee2(employee1):
    def __init__(self,id,name,language,team):
            super().__init__(id,name,language)
            self.team = team

    def display2(self):
            self.display1()
            print(f"Team Members: {self.team}")
# Object creation
e2 = employee2(1001,"Rahul","Python",8)
e2.display2()