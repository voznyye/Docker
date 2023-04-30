import os

from flask import Flask
from flask_cors import CORS
from flask_session import Session

from api import user, login, products, paypal
from api.user import db


def create_api():
    app_flask = Flask(__name__, instance_relative_config=True)
    app_flask.config.from_mapping(
        SECRET_KEY='dev',
    )

    try:
        os.makedirs(app_flask.instance_path)
    except OSError:
        pass

    app_flask.secret_key = 'dev'
    app_flask.config['JSON_SORT_KEYS'] = False
    CORS(app_flask)
    app_flask.register_blueprint(user.bp)
    app_flask.register_blueprint(login.bp)
    app_flask.register_blueprint(products.bp)
    app_flask.register_blueprint(paypal.bp)
    db.init_app(app_flask)

    app_flask.config["SESSION_PERMANENT"] = False
    app_flask.config["SESSION_TYPE"] = "filesystem"
    app_flask.config["SESSION_COOKIE_NAME"] = "session"
    app_flask.config.from_object(__name__)
    Session(app_flask)

    return app_flask


app = create_api()
