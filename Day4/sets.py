a={1, 2, 3, 4,1,2,3,2,3,4,5,6,7,8,9}
a.add(5)
print(a)
a={1, 2, 3, 4, 5, 6, 7, 8, 9}
a.remove(5)
print(a)

a={1, 2, 3, 4, 5, 6, 7, 8, 9}
a.discard(5)
print(a)

a={1, 2, 3, 4, 5, 6, 7, 8, 9}
a.pop()
print(a)

a={1,2,3,4,5,4,5,6,}
b={1,2,3,4,5,6,7,8,9}
'''print(a.union(b))
print(a.intersection(b))
print(a.difference(b))
print(a.symmetric_difference(b))'''
print(a|b)#union
print(a&b)#intersection
print(a-b)#difference
print(a^b)#symmetric difference
