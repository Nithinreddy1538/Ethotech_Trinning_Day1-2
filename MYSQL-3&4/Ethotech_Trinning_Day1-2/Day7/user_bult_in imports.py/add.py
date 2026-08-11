import modules 
print(modules.add(10,20))
print(modules.mul(5,2))
print()
print("Impportinf file and function name  below:")
print("=========================================")
from modules import add,mul
print(add(10,20))
print(mul(10,20))
print()

print("using *")
print("=======")
from modules import*
print(add(10,20))
print(mul(10,20))

print("stores the  operations in a variables as below ")
print("===============================================")

import modules as m
print(m.add(10,20))
print(m.mul(10,20))