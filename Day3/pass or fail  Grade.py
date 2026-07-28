a=int(input())
b=int(input())
c=int(input())
d= int(input())
total=a+b+c+d
print("Total marks:", total)
avg=total/4
print("Average marks:", avg)
percentage=(total/400)*100
print("Percentage:", f"{percentage:.2f}")
if avg>=90:
    print("A Grade")
elif avg>=75:
    print("B Grade")
elif avg>=60:
    print("C Grade")
elif avg>40:
    print("D Grade")
else:
    print("Fail")