a=10000
print("Your account balance is:", a)
withdraw=int(input("Enter the amount to withdraw: "))
if withdraw<=a:
    a = a - withdraw
    print("Your current  balance after withdrawal:", a)
else:
    print("Insufficient balance")