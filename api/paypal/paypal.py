from flask_restful import Resource

from api.user.db import get_db


class Paypal(Resource):
    def getPayment(self):
        return get_db().execute('SELECT * FROM payment').fetchall()

    def findPaymentById(self, payment_id):
        user_db = get_db()
        return user_db.execute('SELECT * FROM payment WHERE id=?', (payment_id,)).fetchone()

    def findByStatus(self, status):
        return get_db().execute('SELECT * FROM payment WHERE status=?', (status,)).fetchone()

    def createPayment(self, buyer, amount, status):
        payment_db = get_db()
        payment_db.execute('INSERT INTO payment (buyer, amount, status) VALUES (?, ?, ?)', (buyer, amount, status))
        payment_db.commit()
