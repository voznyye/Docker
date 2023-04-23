from flask import Flask, send_from_directory
from flask_cors import CORS

from api import user, login, products
from api.user import db

UPLOAD_FOLDER = '.\clients\public\image'
PUBLIC_FOLDER = 'public/image'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def create_api():
    app_flask = Flask(__name__, instance_relative_config=True)
    app_flask.config.from_mapping(
        SECRET_KEY='dev',
    )
    app_flask.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app_flask.config['PUBLIC_FOLDER'] = PUBLIC_FOLDER
    app_flask.config['ALLOWED_EXTENSIONS'] = ALLOWED_EXTENSIONS
    app_flask.secret_key = 'dev'
    app_flask.config['JSON_SORT_KEYS'] = False
    CORS(app_flask)
    app_flask.register_blueprint(user.bp)
    app_flask.register_blueprint(login.bp)
    app_flask.register_blueprint(products.bp)
    db.init_app(app_flask)

    return app_flask


app = create_api()


# @app.route('/api/public/image/<string:name>', methods=['GET'])
# def get_static(name):
#     print(send_from_directory(app.config['UPLOAD_FOLDER'], name))
#     return send_from_directory(app.config['UPLOAD_FOLDER'], name)
