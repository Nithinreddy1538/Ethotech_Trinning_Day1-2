from abc import ABC, abstractmethod
class Person(ABC):
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @abstractmethod
    def get_details(self):
        pass
class BankAccount(Person):
    total_account = 0
    def __init__(self,name,age,account_number, balance):
        super().__init__(name, age)
        self.account_number = account_number
        self.__balance =balance
        BankAccount.total_account += 1
    def get_balance(self):
        return self.__balance
    def set_balance(self, amount):
        if amount >= 0:
            self.__balance = amount
        else:
            raise ValueError("Balance cannot be negative.")
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print("Amount deposited successfully.")
    def withdraw(self, amount):
        if amount > self.__balance:
            print("insufficient balance.")
        else:
            self.__balance -= amount
            print("Amount withdrawn successfully.")
    def check_balance(self):
        print("Current balance:", self.__balance)
    def get_details(self):
        print("Account Number:", self.account_number)
        print("Name:", self.name)
        print("Age:", self.age)
        print("Balance:", self.__balance)

    @classmethod
    def total_accounts(cls):
        print("Total accounts created:", cls.total_account)
            
    @staticmethod
    def bank_rules():
        print ("Bank Rules")
        print("============")
        print("1.Minimum bank balance should be :1000")
        print("2.ATM card is provided to all account holders")
        print("3.Interest is calculated on the basis of the account balance")
        print("4.working days :mon-fri")

class SavingsAccount(BankAccount):
    def __init__(self, name, age, account_number, balance):
        super().__init__(name, age, account_number, balance)

class Bank:
    def __init__(self):
        self.accounts = {}

    def create_account(self):
        account_no=int(input("Enter account number: "))
        name=input("Enter name: ")
        age=int(input("Enter age: "))
        balance=float(input("Enter initial balance: "))
        account = SavingsAccount(name, age, account_no, balance)
        self.accounts[account_no] = account
        print("Account created successfully.")
    
    def search_account(self):
        account_no = int(input("Enter account number to search: "))
        if account_no in self.accounts:
            return self.accounts[account_no]
        else:
            print("Account not found.")
            return None

    def deposit(self):
        account=self.search_account()
        if account:
            amount=float(input("Enter amount to deposit: "))
            account.deposit(amount) 
    
    def withdraw(self):
        account=self.search_account()
        if account:
            amount=float(input("Enter amount to withdraw: "))
            account.withdraw(amount)
    
    def display(self):
        account=self.search_account()
        if account:
            account.get_details()

bank = Bank()
while True:
    print("1. Create Account")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. Display Account Details")
    print("5. Bank Rules")
    print("6. Total Accounts")
    print("7. Exit")
    choice = input("Enter your choice: ")

    if choice == '1':
        bank.create_account() 
    elif choice == '2':
        bank.deposit()
    elif choice == '3':
        bank.withdraw()
    elif choice == '4':
        bank.display()
    elif choice == '5':
        BankAccount.bank_rules()
    elif choice == '6':
        BankAccount.total_accounts()
    elif choice == '7':
        print("Thanks  for visiting.")
        break
    else:
        print("Invalid choice. Please try again.")
         