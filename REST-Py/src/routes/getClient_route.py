from flask import Blueprint, request, jsonify
from src.controllers.getClient_controller import getClient
from src.decorators.auth_required import auth_required

getClient_bp = Blueprint('getClient', __name__)

@getClient_bp.route('/profile', methods = ['GET'])
@auth_required
def profile():
    client_info = getClient()
    if client_info:
        return jsonify(client_info), 200
    else:
        return jsonify({
            "error": "Información del cliente no encontrada"
        }), 404