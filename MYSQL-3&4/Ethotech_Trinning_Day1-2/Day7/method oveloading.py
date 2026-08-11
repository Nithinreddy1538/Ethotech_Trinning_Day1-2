class cal:
    def add (self,a,b,c=0,d=0):#static value of c is 0
        return a+b+c
obj=cal()
print(obj.add(10,20,20,30))    
    
    
class cal:
    def add(self,a,b):
        return a+b
    def add(self,a,b,c):
        return a+b+c
obj=cal()
print(obj.add(10,20,30))