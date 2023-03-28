from flask import Blueprint, request

from api.login.login import Login

bp = Blueprint('login', __name__, url_prefix='/api/login')

login = Login()


@bp.route('/', methods=['POST'])
def get_users():
    if request.method == 'POST':
        name = request.json.get('name')
        password = request.json.get('password')
        return login.login(name, password)
