from src.database import db
from datetime import datetime

class SerializerMixin:
    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(60), nullable = False)
    phone = db.Column(db.String(10), nullable = False)
    address = db.Column(db.String(60), nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    orders = db.relationship('Order', backref = 'client', lazy=True)