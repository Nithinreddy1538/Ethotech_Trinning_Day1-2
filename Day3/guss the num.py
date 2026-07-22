num=25
guess=int(input("Guess the number: "))
if guess==num:
    print("Well done! it's correct")
elif guess<num:
    print("Your guess is low")
else:
    print("Your guess is high")
    