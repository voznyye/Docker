from flask_restful import Resource

from api.user.db import get_db


class Product(Resource):
    def getProducts(self):
        return get_db().execute('SELECT * FROM products').fetchall()

    def findProductById(self, product_id):
        """Get a user by ID"""
        user_db = get_db()
        return user_db.execute('SELECT id, name, price, title FROM products WHERE id=?', (product_id,)).fetchone()

    def findByName(self, name):
        return get_db().execute('SELECT * FROM products WHERE name=?', (name,)).fetchone()

    def createProduct(self, name, price, title):

        find_product = self.findByName(name)

        if find_product is None:
            # Insert the new user into the database
            produts_db = get_db()
            produts_db.execute('INSERT INTO products (name, price, title) VALUES (?, ?, ?)', (name, price, title))
            produts_db.commit()
        else:
            raise Exception(f"Product {name} is already exist.")

    def updateProduct(self, product_id, name, price, title):

        # Update the user in the database
        user_db = get_db()
        if name and price and title:
            user_db.execute('UPDATE products SET name=?, price=?, title=? WHERE id=?', (name, price, title, product_id))
        elif name and title:
            user_db.execute('UPDATE products SET name=?, title=? WHERE id=?', (name, title, product_id))
        elif name and price:
            user_db.execute('UPDATE products SET name=?, price=? WHERE id=?', (name, price, product_id))
        elif title and price:
            user_db.execute('UPDATE products SET title=?, price=? WHERE id=?', (title, price, product_id))
        elif name:
            user_db.execute('UPDATE products SET name=? WHERE id=?', (name, product_id))
        elif price:
            user_db.execute('UPDATE products SET price=? WHERE id=?', (price, product_id))
        elif title:
            user_db.execute('UPDATE products SET title=? WHERE id=?', (title, product_id))

        user_db.commit()

    def deleteProduct(self, product_id):
        """Delete a user"""
        user_db = get_db()
        user_db.execute('DELETE FROM products WHERE id=?', (product_id,))
        user_db.commit()
