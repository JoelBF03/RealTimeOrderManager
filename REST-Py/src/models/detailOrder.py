from src.database import db
from datetime import datetime

class SerializerMixin:
    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

class DetailOrder(db.Model, SerializerMixin):
    __tablename__ = 'detail_orders'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    service_order_id = db.Column(db.Integer, db.ForeignKey('service_orders.id'), nullable=False)
    clothes = db.Column(db.String(40), nullable = False)
    quantity = db.Column(db.Integer, nullable=False)
    subtotal_price = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

