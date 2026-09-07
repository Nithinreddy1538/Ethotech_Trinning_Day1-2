class parent:
    def display(self):
        print("This is parent class")
class child(parent):
    def show(self):
        print("Child class")
obj=child()
obj.display()
obj.show()