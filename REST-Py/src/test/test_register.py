import pytest
from unittest.mock import patch, MagicMock
from src.controllers.auth_controller import registerUser
from flask import jsonify

def test_register_user_success():
    # Datos simulados
    mock_data = {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john.doe@example.com',
        'phone': '1234567890',
        'address': '123 Main St',
        'password': 'securepassword'
    }

    # Simular User y Client
    with patch('src.controllers.auth_controller.User') as MockUser, \
         patch('src.controllers.auth_controller.Client') as MockClient, \
         patch('src.controllers.auth_controller.db.session') as mock_db_session:

        # Configura los objetos simulados
        mock_user_instance = MagicMock()
        MockUser.return_value = mock_user_instance
        mock_client_instance = MagicMock()
        MockClient.return_value = mock_client_instance

        # Ejecuta el método a probar
        response, status_code = registerUser(mock_data)

        # Verifica que los objetos simulados fueron utilizados
        MockUser.assert_called_once_with(email=mock_data['email'], password=mock_user_instance.password)
        MockClient.assert_called_once_with(first_name=mock_data['first_name'], last_name=mock_data['last_name'], phone=mock_data['phone'], address=mock_data['address'], user_id=mock_user_instance.id)
        mock_db_session.add.assert_called()  # Asegúrate de que se haya intentado agregar el usuario y cliente a la base de datos
        mock_db_session.commit.assert_called()  # Asegúrate de que se haya intentado hacer commit

        # Verifica la respuesta
        assert status_code == 201
        assert b'Usuario registrado exitosamente' in response.get_data()

def test_register_user_missing_fields():
    # Datos simulados con campos faltantes
    mock_data = {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john.doe@example.com',
        # Falta phone, address, y password
    }

    # Ejecuta el método a probar
    response, status_code = registerUser(mock_data)

    # Verifica la respuesta
    assert status_code == 400
    assert b'Todos los campos son obligatorios' in response.get_data()
