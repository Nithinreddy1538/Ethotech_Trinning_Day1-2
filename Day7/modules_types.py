from datetime import datetime,date,timedelta
now=datetime.now()
print(now.year,now.month,now.day)
print(now.strftime('%H : %M : %S'))
today=date.today()
print(today)
tomorrow=today+timedelta(days=3)
print(tomorrow)