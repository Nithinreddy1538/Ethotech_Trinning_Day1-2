class details:
    def __init__(self,name):
        self.name=name
    def person(self):
        print(f"Name:{self.name}")

class details1(details):
    def __init__(self, name, roll):
        super().__init__(name)    
        self.roll = roll

    def person1(self):
        print(f"Roll No:{self.roll}")
obj=details1("Rahul",101)
obj.person()
obj.person1()        