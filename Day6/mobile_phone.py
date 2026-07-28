class phone1:
    def __init__(self,name):
        self.name=name
    def show(self):
        print(f"phone_name: {self.name}")
class phone2:
    def show1(self):
        print("capturing image...")
class phone3(phone2,phone1):
    def show2(self):
        print("calling...")
obj=phone3("iphone")
obj.show()
obj.show1()
obj.show2()