class Wallet:
    def __init__(self, amount):
        self.__amount = amount
    def amount(self, deposit):
        if deposit > 0:
            self.__amount += deposit
    def show_mony(self, display):
        if display > self.__amount:
            print("Insufficient balance")
        else:
            self.__amount -= display
    def get_balance(self):
        return self.__amount
acc = Wallet(1000)
acc.show_mony(500)
print(acc.get_balance())