from flask import Blueprint, request
from src.controllers.serviceOrder_controller import createService, getService, getServices, deleteService, updateService
from src.decorators.auth_required import auth_required

serviceOrder_bp = Blueprint('serviceOrder', __name__)

@serviceOrder_bp.route('/service', methods = ["GET"])
@auth_required
def get_services():
    return getServices()

@serviceOrder_bp.route('/service/<int:id>', methods = ["GET"])
@auth_required
def get_service(id):
    return getService(id)

@serviceOrder_bp.route('/service', methods = ["POST"])
@auth_required
def create_service():
    data = request.get_json()
    return createService(data)

@serviceOrder_bp.route('/service/<int:id>', methods = ["PUT"])
@auth_required
def update_service(id):
    data = request.get_json()
    return updateService(data, id)

@serviceOrder_bp.route('/service/<int:id>', methods = ["DELETE"])
@auth_required
def delete_service(id):
    return deleteService(id)