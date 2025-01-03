from flask import jsonify
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from src.database import db
from src.models import User, Client
from src.validations import validate_register

def registerUser(data):
    validation_response = validate_register(data)
    if validation_response:
        return validation_response

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone = data.get('phone')
    address = data.get('address')
    password = data.get('password')

    hashed_password = generate_password_hash(password).decode('utf-8')
    
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    new_client = Client(first_name=first_name, last_name=last_name, phone=phone, address=address, user_id = new_user.id)
    db.session.add(new_client)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201

def loginUser(data):
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "message": "Inicio de sesión exitoso",
            "access_token": access_token
            }), 200
    else:
        return jsonify({
            "error": "Credenciales inválidas"
            }), 401