import sqlite3
conn = sqlite3.connect('rest.db')
c = conn.cursor()
x = c.execute("SELECT * FROM user")
for i in x: 
    print(i)