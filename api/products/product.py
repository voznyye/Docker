from flask_restful import Resource

from api.user.db import get_db


class Product(Resource):
    def getProducts(self):
        return get_db().execute('SELECT * FROM products').fetchall()

    def findProductById(self, product_id):
        user_db = get_db()
        return user_db.execute('SELECT * FROM products WHERE id=%s', (product_id,)).fetchone()

    def findByName(self, name):
        return get_db().execute('SELECT * FROM products WHERE name=%s', (name,)).fetchone()

    def createProduct(self, name, price, title, image):

        find_product = self.findByName(name)

        if find_product is None:
            # Insert the new user into the database
            produts_db = get_db()
            produts_db.execute('INSERT INTO products (name, price, title, image) VALUES (%s, %s, %s, %s)', (name, price, title, image))
            produts_db.commit()
        else:
            raise Exception(f"Product {name} is already exist.")

    def updateProduct(self, product_id, name=None, price=None, title=None, image=None):
        db = get_db()
        fields = {}
        for field in ('name', 'price', 'title', 'image'):
            if locals()[field] is not None:
                fields[field] = locals()[field]
        sets = ', '.join([f'{key}=?' for key in fields])
        values = tuple(fields.values()) + (product_id,)
        db.execute(f'UPDATE products SET {sets} WHERE id=%s', values)
        db.commit()

    def deleteProduct(self, product_id):
        """Delete a user"""
        user_db = get_db()
        user_db.execute('DELETE FROM products WHERE id=%s', (product_id,))
        user_db.commit()

