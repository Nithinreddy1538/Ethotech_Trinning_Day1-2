def add(a,b):
    return a+b
print(add(10,20))
a=[1,2,3,4,5,6,7,8,9,10]
b=list(filter(lambda x: x%2!=0,a))
c=list(filter(lambda x: x**2,a))
print(b)
print(c)
