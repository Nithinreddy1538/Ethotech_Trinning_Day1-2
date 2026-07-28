try:
    num=int(input())
    result=100/num
    print(result)
except ZeroDivisionError:
    print(" number cant divisible by 0")
except ValueError:
    print("enter valid number")
else:
    print("success",result)
finally:
    print("exception done")
    