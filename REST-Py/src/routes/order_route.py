from flask import Blueprint, request
from src.controllers.orders_controller import getOrders, getOrder, createOrders, updateOrder, deleteOrder
from src.decorators.auth_required import auth_required

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/orders', methods=["GET"])
@auth_required
def get_orders():
    return getOrders()

@orders_bp.route('/orders/<int:id>', methods = ["GET"])
@auth_required
def get_order(id):
    return getOrder(id)

@orders_bp.route('/orders', methods = ["POST"])
@auth_required
def create_order():
    data = request.get_json()
    return createOrders(data)

@orders_bp.route('/orders/<int:id>', methods = ["PUT"])
@auth_required
def update_order(id):
    data = request.get_json()
    return updateOrder(data,id)

@orders_bp.route('/orders/<int:id>', methods = ["DELETE"])
@auth_required
def delete_order(id):
    return deleteOrder(id)