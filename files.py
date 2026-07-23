file=open("notes.txt", "w")
file.write("This is  a writing notes.\n")
file.write("We can write multiple  file.\n")
file.close()


file=open("notes.txt", "r")
content=file.read()
print(content)
file.close()
with open("notes.txt", "a") as file:
    file.write("The new line .\n")
