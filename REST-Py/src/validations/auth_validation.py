from flask import jsonify
import re

def validate_register(data):
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone = data.get('phone')
    address = data.get('address')
    password = data.get('password')

    if not all([first_name, last_name, email, phone, address, password]):
        return jsonify({ "error": "Todos los campos son obligatorios" }), 400
    
    if len(password) < 8:
        return jsonify({"error": "La contraseña debe tener al menos 8 caracteres"}), 400
    
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"error": "El formato del email es inválido"}), 400
    
    if len(phone) > 10:
        return jsonify({"error": "El numero de telefono debe tener 10 digitos"}), 400
    
    return None
