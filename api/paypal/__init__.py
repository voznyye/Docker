from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment

from flask import jsonify, Blueprint
from flask import request as req
from api.paypal.paypal import Paypal


bp = Blueprint('pay', __name__, url_prefix='/api/paypal')
paypal = Paypal()


@bp.route('/', methods=['POST'])
def pay():
    # request data of client
    buyer = req.json.get('buyer')
    amount = req.json.get('amount')
    if not buyer or not amount:
        return jsonify({'error': 'buyer and amount are required'}), 400

    # Creating Access Token for Sandbox
    client_id = "ARynM0vDDm8edzvDz0h7ExKi09kW7vsGPGTJOr-Julcb4ovBznbQ9mYLV2scIaUMuzJZAfdmpoiUjTN1"
    client_secret = "EJKtgAj2Afz1R19vcsFVZfhhd0MygQsXGBOL-6tgAYe1gMh_oj1wkoGsVkvt378z2dJX0_xh3VjgbcuL"

    # Creating an environment
    environment = SandboxEnvironment(client_id=client_id, client_secret=client_secret)
    client = PayPalHttpClient(environment)

    from paypalcheckoutsdk.orders import OrdersCreateRequest
    from paypalhttp import HttpError
    # Construct a request object and set desired parameters
    # Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    request = OrdersCreateRequest()

    request.prefer('return=representation')

    request.request_body(
        {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": amount
                    }
                }
            ]
        }
    )

    try:
        # Call API with your client and get a response for your call
        response = client.execute(request)

        status = response.result.status
        paypalid = response.result.id
        paypal.createPayment(paypalid, buyer, amount, status)
        return jsonify({'Status Code:': response.status_code, 'Status:': response.result.status, 'paypalid': response.result.id })
    except IOError as ioe:
        # return jsonify(ioe), 500
        if isinstance(ioe, HttpError):
            # Something went wrong server-side
            return jsonify({'status':ioe.status_code}), 501
