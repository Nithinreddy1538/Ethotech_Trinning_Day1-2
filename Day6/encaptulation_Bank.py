class Bank:
    def __init__(self, name, balance):
        self.name = name
        self.__balance = balance
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
    def withdraw(self, amount):
        if amount > self.__balance:
            print("Insufficient balance")
        else:
            self.__balance -= amount
    def get_balance(self):
        return self.__balance
acc = Bank("name", 1000)
acc.deposit(5000)
acc.withdraw(1000)
print(acc.get_balance())