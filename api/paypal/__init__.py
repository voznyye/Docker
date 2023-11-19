from api.paypalcheckoutsdk.core import paypal_http_client, environment
from flask import jsonify, Blueprint, request
from api.paypal.paypal import Paypal

bp = Blueprint('pay', __name__, url_prefix='/api/paypal')
paypal = Paypal()


@bp.route('/', methods=['POST'])
def pay():
    # request data of client
    buyer = request.json.get('buyer')
    amount = request.json.get('amount')
    if not buyer or not amount:
        return jsonify({'error': 'buyer and amount are required'}), 400

    # Creating Access Token for Sandbox
    client_id = "ARynM0vDDm8edzvDz0h7ExKi09kW7vsGPGTJOr-Julcb4ovBznbQ9mYLV2scIaUMuzJZAfdmpoiUjTN1"
    client_secret = "EJKtgAj2Afz1R19vcsFVZfhhd0MygQsXGBOL-6tgAYe1gMh_oj1wkoGsVkvt378z2dJX0_xh3VjgbcuL"

    # Creating an environment
    sandboxenviroment = environment(client_id=client_id, client_secret=client_secret)
    client = paypal_http_client(sandboxenviroment)

    from api.paypalcheckoutsdk.orders import orders_get_request
    from paypalhttp import HttpError
    # Construct a request object and set desired parameters
    # Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
    req = orders_get_request()

    req.prefer('return=representation')

    req.request_body(
        {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": str(amount)
                    }
                }
            ]
        }
    )

    try:
        # Call API with your client and get a response for your call
        response = client.execute(req)

        status = response.result.status
        paypalid = response.result.id
        paypal.createPayment(paypalid, buyer, amount, status)
        return jsonify({'Status Code:': response.status_code, 'Status:': response.result.status, 'paypalid': response.result.id })
    except HttpError as e:
        # Something went wrong server-side
        return jsonify({'status': e.status_code}), 501
    except Exception as e:  # Catch any other exceptions
        return jsonify({'error': str(e)}), 500
