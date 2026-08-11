import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [5, 8, 6, 10]

# Bar Graph
plt.bar(x, y)
plt.title("Bar Graph")
plt.xlabel("Marks")
plt.ylabel("Students")
plt.show()

# Line Graph
plt.plot(x, y)
plt.title("Line Graph")
plt.xlabel("Marks")
plt.ylabel("Students")
plt.show()

# Histogram
plt.hist(y)
plt.title("Histogram")
plt.xlabel("Marks")
plt.ylabel("Frequency")
plt.show()

# Scatter Plot
plt.scatter(x, y)
plt.title("Scatter Plot")
plt.xlabel("Marks")
plt.ylabel("Students")
plt.show()

# Pie Chart
plt.pie(y, labels=["A", "B", "C", "D"], autopct="%1.1f%%")
plt.title("Pie Chart")
plt.show()