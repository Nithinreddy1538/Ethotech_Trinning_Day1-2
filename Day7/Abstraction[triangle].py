from abc import ABC,abstractmethod

class shape(ABC):
    @abstractmethod
    def area(self):
        pass

class rectangle(shape):
    def __init__(self,b,l):
        self.b=b
        self.l=l
         
    def area(self):
        print(0.5*self.l*self.b)

r=rectangle(2,3)
r.area()