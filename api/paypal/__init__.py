import paypalrestsdk

from flask import jsonify, request, Blueprint, redirect, session

from api.login.auth_middleware import token_required
from api.paypal.paypal import Paypal

bp = Blueprint('pay', __name__, url_prefix='/api/paypal')
paypal = Paypal()

paypalrestsdk.configure({
  "mode": "sandbox",
  "client_id": "AejRMC6GQbLkHu8wk1mEiX57npnDhIilo-X031x6jI8Q6BKoz5e_drTYYw3LMEQa2_lE_igRLGa9FAjt",
  "client_secret": "EPNJNhlXAWqJ56pEYms_tkh_SSzWjMXvpY-vxf0dq2fxiGLy83Mxy2pPrB9AKklImHmt8hSn8HZKhfed"
})


@bp.route('/', methods=['POST'])
# @token_required
def pay():
    buyer = request.json['cart'][0]['buyer']
    amount = request.json['cart'][0]['amount']
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "transactions": [{
          "amount": {
            "total": amount,
            "currency": "USD"
          }
        }],
        "redirect_urls": {
          "return_url": f"http://localhost:5000/api/paypal/success?buyer={buyer}&amount={amount}",
          "cancel_url": f"http://localhost:5000/api/paypal/cancel?buyer={buyer}&amount={amount}"
        }
      })

    if payment.create():
        session['payment_id'] = payment.id
        for link in payment.links:
            if link.rel == 'approval_url':
                redirect_url = link.href
                return jsonify({'redirect_url': redirect_url})
    else:
        return jsonify({'error': 'Payment creating error'})


@bp.route('/success')
def success():
    payment_id = session.get('payment_id')
    buyer = request.args.get('buyer')
    amount = request.args.get('amount')
    payment = paypalrestsdk.Payment.find(payment_id)
    if payment.execute({'payer_id': request.args.get('PayerID')}):
        paypal.createPayment(buyer, amount, status='success')
        return jsonify({'message': 'Success'})
    else:
        paypal.createPayment(buyer, amount, status='error')
        return jsonify({'error': 'Payment error'})


@bp.route('/cancel')
def cancel():
    buyer = request.args.get('buyer')
    amount = request.args.get('amount')
    paypal.createPayment(buyer, amount, status='canceled')
    return jsonify({'message': 'Canceled!'})
