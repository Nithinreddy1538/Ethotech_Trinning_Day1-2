class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
class LibraryBook(Book):
    def __init__(self, title, author):
        super().__init__(title, author)    
        self.__available = True          
    def borrow_book(self):
        if self.__available:
            print("Book Borrowed Successfully")
            self.__available = False
        else:
            print("Book is not available")
 
book1 = LibraryBook("Python", "Guido van Rossum")
book1.borrow_book()
book1.borrow_book()