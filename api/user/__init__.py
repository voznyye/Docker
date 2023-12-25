from flask import jsonify, request, Blueprint

from api.login.auth_middleware import token_required
from api.user.user import User

bp = Blueprint('user', __name__, url_prefix='/api/user')

user = User()


@bp.route('/', methods=['GET'])
# @token_required
def get_users():
    """Get all user"""
    return jsonify(user.getUsers()), 200


@bp.route('/', methods=['POST'])
def create_user():
    """Create a new user"""
    name = request.json.get('name')
    password = request.json.get('password')
    if not name or not password:
        return jsonify({'error': 'name and password are required'}), 400

    try:
        user.createUser(name, password)
    except Exception as e:
        return jsonify({'error': f"{e}"}), 500

    return jsonify({'message': f'User {name} created'}), 201


@bp.route('/<int:user_id>', methods=['GET'])
# @token_required
def get_user(user_id):
    row = user.findUserById(user_id)

    if row is None:
        return jsonify({'error': f'User with ID {user_id} not found'}), 404

    return jsonify({'id': row['id'], 'name': row['name']}), 200


@bp.route('/<int:user_id>', methods=['PUT'])
# @token_required
def update_user(user_id):
    """Update a user"""
    name = request.json.get('name')
    password = request.json.get('password')
    if not name and not password:
        return jsonify({'error': 'name and/or password are required'}), 400

    row = user.findUserById(user_id)

    if row is None:
        return jsonify({'error': f'User with ID {user_id} not found'}), 404

    user.updateUser(user_id, name, password)

    return jsonify({'message': f'User {user_id} updated'}), 200


@bp.route('/<int:user_id>', methods=['DELETE'])
# @token_required
def delete_user(user_id):
    row = user.findUserById(user_id)

    if row is None:
        return jsonify({'error': f'User with ID {user_id} not found'}), 404

    user.deleteUser(user_id)
    return jsonify({'message': f'User {user_id} deleted'}), 200
