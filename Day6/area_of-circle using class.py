class circle:
    pi=3.14
    def __init__(self,radius):
        self.radius=radius
    def display(self):
        print(f"Area of Circle: {circle.pi*self.radius**2}")
s=circle(5)
s.display()