class parent1:
    def display(self):
        print("This is parent class")
class parent2(parent1):
    def show1(self):
        print("This is parent2 class")
class child(parent2):
    def show2(self):
        print("Child class")
obj=child()
obj.display()
obj.show1()
obj.show2()