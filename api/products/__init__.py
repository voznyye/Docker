from flask import jsonify, request, Blueprint

from api.login.auth_middleware import token_required
from api.products.product import Product

bp = Blueprint('products', __name__, url_prefix='/api/products')

product = Product()


@bp.route('/', methods=['GET'])
@token_required
def get_products():
    """Get all products"""
    return jsonify(product.getProducts()), 200


@bp.route('/', methods=['POST'])
def create_product():
    """Create a new product"""
    name = request.json.get('name')
    price = request.json.get('price')
    title = request.json.get('title')
    image = request.json.get('image')
    if not name or not price or not title:
        return jsonify({'error': 'name, price and title are required'}), 400

    try:
        product.createProduct(name, price, title, image)
    except Exception as e:
        return jsonify({'error': f"{e}"}), 500  # error

    return jsonify({'message': f'Product {name} created'}), 201


@bp.route('/<string:name>', methods=['GET'])
@token_required
def get_product_by_name(name):
    row = product.findByName(name)

    if row is not None:
        return jsonify({'id': row['id'], 'name': row['name'], 'price': row['price'], 'title': row['title'], 'image': row['image'], 'status': row['status']}), 200

    return jsonify({'error': f'Product with name {name} not found'}), 404


@bp.route('/<int:product_id>', methods=['GET'])
@token_required
def get_product_by_id(product_id):
    row = product.findProductById(product_id)

    if row is None:
        return jsonify({'error': f'Product with ID {product_id} not found'}), 404

    return jsonify({'id': row['id'], 'name': row['name'], 'price': row['price'], 'title': row['title'], 'image': row['image'], 'status': row['status']}), 200


@bp.route('/<int:product_id>', methods=['PUT'])
@token_required
def update_product(product_id):
    """Update a product"""
    name = request.json.get('name')
    price = request.json.get('price')
    title = request.json.get('title')

    if not name and not price and not title:
        return jsonify({'error': 'name, price and/or title are required'}), 400

    row = product.findProductById(product_id)

    if row is None:
        return jsonify({'error': f'User with ID {product_id} not found'}), 404

    product.updateProduct(product_id, name, price, title)

    return jsonify({'message': f'Product {product_id} updated'}), 200


@bp.route('/<int:product_id>', methods=['DELETE'])
@token_required
def delete_product(product_id):
    row = product.findProductById(product_id)

    if row is None:
        return jsonify({'error': f'Product with ID {product_id} not found'}), 404

    product.deleteProduct(product_id)
    return jsonify({'message': f'Product {product_id} deleted'}), 200
