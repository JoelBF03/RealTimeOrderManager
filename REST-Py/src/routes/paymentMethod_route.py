from flask import Blueprint, request
from src.controllers.paymentMethod_controller import getPaymentMethods, getPaymentMethod, createPaymentMethod, updatePaymentMethod, deletePaymentMethod
from src.decorators.auth_required import auth_required

paymentMethod_bp = Blueprint('paymentMethod', __name__)

@paymentMethod_bp.route('/payment-method', methods=['GET'])
@auth_required
def get_PaymentMethods():
    from flask_jwt_extended import get_jwt_identity
    identity = get_jwt_identity()
    print('Usuario autenticado:', identity)
    return getPaymentMethods()

@paymentMethod_bp.route('/payment-method/<int:id>', methods=['GET'])
@auth_required
def get_PaymentMethod(id):
    return getPaymentMethod(id)

@paymentMethod_bp.route('/payment-method', methods=['POST'])
@auth_required
def create_PaymentMethod():
    data = request.get_json()
    return createPaymentMethod(data)

@paymentMethod_bp.route('/payment-method/<int:id>', methods=['PUT'])
@auth_required
def update_PaymentMethod(id):
    data = request.get_json()
    return updatePaymentMethod(data, id)

@paymentMethod_bp.route('/payment-method/<int:id>', methods=['DELETE'])
@auth_required
def delete_PaymentMethod(id):
    return deletePaymentMethod(id)
