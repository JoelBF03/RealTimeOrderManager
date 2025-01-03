from src.database import db

class SerializerMixin:
    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

class PaymentMethod(db.Model, SerializerMixin):
    __tablename__ = 'payment_methods'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    method_name = db.Column(db.String(50), nullable=False)

    orders = db.relationship('Order', backref='payment_method', lazy=True)