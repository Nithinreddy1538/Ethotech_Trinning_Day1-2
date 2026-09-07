class Animal:
    def __init__(self, eat):
        self.eat = eat

    def display(self):
        print(f"Animal eats {self.eat}")


class Bird(Animal):
    def __init__(self, eat, fly):
        super().__init__(eat)
        self.fly = fly

    def show(self):
        print(f"Bird can {self.fly}")


class Parrot(Bird):
    def __init__(self, eat, fly, speak):
        super().__init__(eat, fly)
        self.speak = speak

    def show1(self):
        print(f"Parrot can {self.speak}")


obj = Parrot("food", "fly", "speak")
obj.display()
obj.show()
obj.show1()