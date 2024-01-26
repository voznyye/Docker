from flask_restful import Resource

from api.user.db import get_db


class Paypal(Resource):
    def getPayment(self):
        return get_db().execute('SELECT * FROM payment').fetchall()

    def findPaymentById(self, payment_id):
        user_db = get_db()
        return user_db.execute('SELECT * FROM payment WHERE id=%s', (payment_id,)).fetchone()

    def findByStatus(self, status):
        return get_db().execute('SELECT * FROM payment WHERE status=%s', (status,)).fetchone()

    def createPayment(self, paypalid, buyer, amount, status):
        payment_db = get_db()
        payment_db.execute('INSERT INTO payment (paypalid, buyer, amount, status) VALUES (%s, %s, %s, %s)',
                           (paypalid, buyer, amount, status))
        payment_db.commit()
