''''''

class count:
    def __init__(self,start):
        self.current=start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <=0:
            raise StopIteration
        val =self.current
        self.current-=1
        return val
for n in count(5):
    print(n)