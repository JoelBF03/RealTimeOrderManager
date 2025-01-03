from flask import Blueprint, request
from src.controllers.detailOrder_controller import getDetail, getDetails, updateDetail, deletedetail
from src.decorators.auth_required import auth_required

details_bp = Blueprint('detailsOrder', __name__)

@details_bp.route('/details', methods = ["GET"])
@auth_required
def get_Details():
    return getDetails()

@details_bp.route('/details/<int:id>', methods = ["GET"])
@auth_required
def get_Detail(id):
    return getDetail(id)

@details_bp.route('/details/<int:id>', methods = ["PUT"])
@auth_required
def update_Detail(id):
    data = request.get_json()
    return updateDetail(id, data)

@details_bp.route('/details/<int:id>', methods = ["DELETE"])
@auth_required
def delete_Detail(id):
    return deletedetail(id)