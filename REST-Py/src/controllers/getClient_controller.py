from flask_jwt_extended import get_jwt_identity
from src.database import db
from src.models import User, Client

def getClient():
     user_id = get_jwt_identity()

     client = Client.query.filter_by(user_id=user_id).first()
     if client:
          user = User.query.get(user_id)
          return{
               "first_name": client.first_name,
               "last_name": client.last_name,
               "email": user.email,
               "phone": client.phone,
               "address": client.address
          }
     return None