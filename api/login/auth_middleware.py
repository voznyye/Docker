from functools import wraps

import jwt
from flask import current_app
from flask import request


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "token" in request.headers:
            token = request.headers["token"]
        if not token or 'null' == token or '' == token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            from api.user import User
            user_class = User()
            current_user = user_class.findBy(data["name"], data["password"])
            if current_user is None:
                return {
                    "message": "Invalid Authentication token!",
                    "data": None,
                    "error": "Unauthorized"
                }, 401
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500

        return f(*args, **kwargs)

    return decorated
