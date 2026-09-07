class parent1:
    def display(self):
        print("parent class")
class parent2(parent1):
    def show(self):
        print("parent2 class")
class child(parent2):
    def show1(self):
        print("Child class")

obj=child()
obj.display()
obj.show()   
obj.show1()