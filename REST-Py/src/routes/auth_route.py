from flask import Blueprint, request, jsonify
from src.controllers.auth_controller import registerUser, loginUser

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods = ['POST'])
def register():
    data = request.get_json()
    return registerUser(data)

@auth_bp.route('/login', methods = ['POST'])
def login():
    data = request.get_json()
    return loginUser(data)
