import sqlite3
conn = sqlite3.connect('rest.db')
c = conn.cursor()
x = c.execute("""CREATE TABLE payment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  buyer TEXT NOT NULL,
  amount INTEGER,
  status TEXT NOT NULL
);
""")
