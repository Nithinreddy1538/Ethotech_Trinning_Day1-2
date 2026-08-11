class triangle:
    def __init__(self,l,b):
        self.l=l
        self.b=b
    def display(self):
        print(f"Area of Triangle:{0.5*self.b*self.l}")
a=triangle(10,20)
a.display()