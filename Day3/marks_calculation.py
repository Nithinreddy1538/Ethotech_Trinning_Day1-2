a=int(input())
b=int(input())
c=int(input())
total=a+b+c
print("Total marks:", total)
avg=total/3
print("Average marks:", avg)
percentage=(total/300)*100
print("Percentage:", f"{percentage:.2f}")
if avg>=40:
    print("Result: Pass")
else:
    print("Result: Fail")