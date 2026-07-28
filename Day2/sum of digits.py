#print sum of all digits in a number
def sum_of_digits(n):
    sum=0
    while n>0:
        rem=n%10
        sum+=rem
        n//=10
    print(sum)
def main():
    n=int(input())
    sum_of_digits(n)
if __name__=="__main__":
    main()