def count():
    a=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    print(a)
    count = 0
    for i in range(len(a)):
        count += 1
    print(count)
count()

# a=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# b=0
# while b < len(a):
#     b += 1
# print(b)
a=int(input("Enter a number: "))
count=0
while a > 0:
    a = a // 10
    count =- 1
print(count)