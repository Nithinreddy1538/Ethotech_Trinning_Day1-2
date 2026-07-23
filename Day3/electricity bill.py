a=int(input())
if a<=100:
    print("Electricity bill is:", a*5)
elif a>100 and a<=200:
    print("Electricity bill is:", 100*5 + (a-100)*7)
else:
    print("Electricity bill is:", 100*5 + 100*7 + (a-200)*10)