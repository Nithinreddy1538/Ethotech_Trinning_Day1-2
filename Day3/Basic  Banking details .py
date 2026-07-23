initial_Balance=5000
while True:
    print("1. Deposit")
    print("2. Withdraw")
    print("3. Check Balance")
    print("4. Exit")
    choice=int(input("Enter your choice: "))
    if choice==1:
        amount=int(input("Enter the amount to deposit: "))
        initial_Balance=initial_Balance+amount
        print("Amount deposited successfully")
    elif choice==2:
        amount=int(input("Enter the amount to withdraw: "))
        if amount>initial_Balance:
            print("Insufficient balance")
        else:
            initial_Balance=initial_Balance-amount
            print("Amount withdrawn successfully")
    elif choice==3:
        print("Your current balance is:", initial_Balance)
    elif choice==4:
        break
    else:
        print("Invalid choice")
        