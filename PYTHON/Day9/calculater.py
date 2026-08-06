def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Denominator cannot be zero.")
    return a / b
def modulus(a, b):
    if b == 0:
        raise ValueError("Denominator cannot be zero.")
    return a % b
def power(a, b):
    return a ** b
while True:
    print("Select operation:")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Modulus")
    print("6. Power")
    print("7. Exit")

    choice = input("Enter choice: ")

    if choice == '7':
        print("Exiting the calculator.")
        break

    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))

    if choice == '1':
        print(f"{num1} + {num2} = {add(num1, num2)}")
    elif choice == '2':
        print(f"{num1} - {num2} = {subtract(num1, num2)}")
    elif choice == '3':
        print(f"{num1} * {num2} = {multiply(num1, num2)}")
    elif choice == '4':
        try:
            result = divide(num1, num2)
            print(f"{num1} / {num2} = {result}")
        except ValueError as e:
            print(e)
    elif choice == '5':
        try:
            result = modulus(num1, num2)
            print(f"{num1} % {num2} = {result}")
        except ValueError as e:
            print(e)
    elif choice == '6':
        print(f"{num1} ^ {num2} = {power(num1, num2)}")
    else:
        print("Invalid input.")