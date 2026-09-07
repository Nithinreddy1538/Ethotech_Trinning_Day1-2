a=list(map(int,input().split()))
odd=0
even=0
print("count of numbers:", len(a))
for i in range(len(a)):
    if a[i]%2==0:
        even+=1
    else:
        odd+=1
print("Number of even numbers:", even)
print("Number of odd numbers:", odd)