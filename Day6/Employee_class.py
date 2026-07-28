class employee:
    def __init__(self,name,id,salary,dept):
        self.name=name
        self.id=id
        self.salary=salary
        self.dept=dept
    def display(self):
        print(f"emp_name:{self.name}\nemp_id:{self.id}\nemp_salary:{self.salary}\nemp_dept:{self.dept}")
s=employee("Nithin",101,10000,"MCA")
s.display()
        