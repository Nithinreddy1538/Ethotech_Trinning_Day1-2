class Dog:
    def sound(self):
        print("Bark")
class  Cat:
    def sound(self):
        print("MEow")
def Amimals_Sounds(animal):
    animal.sound()
Amimals_Sounds(Dog())
Amimals_Sounds(Cat())