from src.database import db
from datetime import datetime

class SerializerMixin:
    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    clients = db.relationship('Client', backref='user', lazy=True)