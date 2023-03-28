import jwt
from flask import jsonify, current_app
from flask_restful import Resource

from api.user.user import hash_password, User

user_class = User()


class Login(Resource):
    def login(self, name, password):
        hashed_password = hash_password(password)
        user = user_class.findBy(name, hashed_password)

        error = None

        if user is None:
            error = 'User no found'
        elif not hash_password(user['password']) != password:
            error = 'Incorrect password.'

        if error is None:
            encoded_jwt = jwt.encode({"id": user['id'], "name": user['name'], "password": user['password']},
                                     current_app.config["SECRET_KEY"], algorithm="HS256")

            return jsonify({'hash': encoded_jwt}), 200

        return jsonify({'error': error}), 401
