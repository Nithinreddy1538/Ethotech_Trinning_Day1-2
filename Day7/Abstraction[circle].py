from abc import ABC,abstractmethod

class shape(ABC):
    @abstractmethod
    def area(self):
        pass

class rectangle(shape):
    def __init__(self,r):
        self.r=r
         
    def area(self):
        print(3.14*self.r*self.r)

r=rectangle(7)
r.area()