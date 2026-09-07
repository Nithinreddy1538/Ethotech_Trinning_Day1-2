product=input("Enter the product name: ")
quantity=int(input("Enter the quantity: "))
price=int(input("Enter the price of the product: "))
total=quantity*price
print(" Total bill for", product, "is:", total)
discount=0
if total>=5000:
    discount=total*10/100
    print("Discount applied:", discount)
else:
    print("No discount applied")
final_bill=total-discount
print("Final Amount", final_bill)
