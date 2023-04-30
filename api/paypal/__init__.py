import paypalrestsdk
from flask import jsonify, request, Blueprint, session

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

    # payment = paypalrestsdk.Payment(
    #     {
    #         "intent": "sale",
    #         "payer": {"payment_method": "paypal"},
    #         "transactions": [
    #             {
    #                 "amount": {
    #                     "total": amount,
    #                     "currency": "USD",
    #                     "details": {
    #                         "subtotal": "30.00",
    #                         "tax": "0.07",
    #                         "shipping": "0.03",
    #                         "handling_fee": "1.00",
    #                         "shipping_discount": "-1.00",
    #                         "insurance": "0.01"
    #                     }
    #                 },
    #                 "description": "The payment transaction description.",
    #                 "custom": "EBAY_EMS_90048630024435",
    #                 "invoice_number": "48787589673",
    #                 "payment_options": {"allowed_payment_method": "INSTANT_FUNDING_SOURCE"},
    #                 "soft_descriptor": "ECHI5786786",
    #                 "item_list": {
    #                     "items": [
    #                         {
    #                             "name": "hat",
    #                             "description": "Brown hat.",
    #                             "quantity": "5",
    #                             "price": "3",
    #                             "tax": "0.01",
    #                             "sku": "1",
    #                             "currency": "USD"
    #                         }
    #                     ],
    #                     "shipping_address": {
    #                         "recipient_name": "Brian Robinson",
    #                         "line1": "4th Floor",
    #                         "line2": "Unit #34",
    #                         "city": "San Jose",
    #                         "country_code": "US",
    #                         "postal_code": "95131",
    #                         "phone": "011862212345678",
    #                         "state": "CA"
    #                     }
    #                 }
    #             }
    #         ],
    #         "note_to_payer": "Contact us for any questions on your order.",
    #         "redirect_urls": {
    #             "return_url": f"http://localhost:5000/api/paypal/success?buyer={buyer}&amount={amount}",
    #             "cancel_url": f"http://localhost:5000/api/paypal/cancel?buyer={buyer}&amount={amount}"
    #         }
    #     })

    if payment.create():
        session['payment_id'] = payment.id
        print(payment)
        redirect_url = ''
        token = ''
        for link in payment.links:
            if link.rel == 'approval_url':
                redirect_url = link.href
                token = link.href.split("EC-", 1)[1]
        return jsonify({'id': payment.id, 'token': token, 'link': redirect_url, 'state': payment.state})
        # for link in payment.links:
        #     if link.rel == 'approval_url':
        #         redirect_url = link.href
        #         return jsonify({'redirect_url': redirect_url})
    else:
        print(payment)
        return jsonify({'error': 'Payment creating error'})


@bp.route('/success', methods=['GET','POST'])
def success():
    # payment_id = session.get('payment_id')
    data = request.json['data']
    payment_id = data['paymentID']
    payer_id = data['payerID']
    buyer = request.args.get('buyer', payer_id)
    amount = request.args.get('amount', 100)
    payment = paypalrestsdk.Payment.find(payment_id)
    if payment.execute({'payer_id': payer_id}):
        paypal.createPayment(buyer, amount, status='success')
        return jsonify({'message': 'Success'})
    else:
        paypal.createPayment(buyer, amount, status='error')
        return jsonify({'error': 'Payment error'})


@bp.route('/cancel', methods=['GET','POST'])
def cancel():
    print(session.get('payment_id'))
    order_id = request.json['orderID']
    print(order_id)
    buyer = request.args.get('buyer', order_id)
    amount = request.args.get('amount', 100)

    try:
        order = paypalrestsdk.Order.find(order_id)
        order.void()
        print(order)
    except Exception as e:
        return {
            "message": "Something went wrong",
            "data": None,
            "error": str(e)
        }, 500
    paypal.createPayment(buyer, amount, status='canceled')
    return jsonify({'message': 'Canceled!'})
