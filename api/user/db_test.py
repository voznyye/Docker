import sqlite3
conn = sqlite3.connect('rest.db')
c = conn.cursor()
x = c.execute("SELECT * FROM user")
for i in x: 
    print(i)
    
# import sqlite3
# conn = sqlite3.connect('rest.db')
# c = conn.cursor()
# x = c.execute("CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, price INTEGER NOT NULL, title TEXT NOT NULL);")
# for i in x: 
#     print(i),