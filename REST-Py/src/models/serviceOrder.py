from src.database import db

class SerializerMixin:
    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

class ServiceOrder(db.Model, SerializerMixin):
    __tablename__ = 'service_orders'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    service_name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)

    detail_orders = db.relationship('DetailOrder', backref='service_order', lazy=True)
