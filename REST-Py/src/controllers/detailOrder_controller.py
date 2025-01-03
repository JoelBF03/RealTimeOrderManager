from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from src.database import db
from src.models import Order, DetailOrder, ServiceOrder

def getDetails():
    client_id = get_jwt_identity()
    orders = Order.query.filter_by(client_id = client_id).all()
    details = []
    for order in orders:
        order_details = DetailOrder.query.filter_by(order_id = order.id).all()
        details.extend(order_details)
    return jsonify([detail.to_dict() for detail in details]), 200

def getDetail(id):
    client_id = get_jwt_identity()

    detail = db.session.query(DetailOrder).join(Order).filter( DetailOrder.id == id, Order.client_id == client_id ).first()
    if not detail: return jsonify({ "error": "Detalle no perteneciente al usuario" }), 404
    
    return jsonify (detail.to_dict()), 200


def updateDetail(id, data):
    client_id = get_jwt_identity()

    detail = db.session.query(DetailOrder).join(Order).filter( DetailOrder.id == id, Order.client_id == client_id ).first()
    if not detail: return jsonify({ "error": "Detalle no perteneciente al usuario" }), 404
    
    try:
        detail.service_order_id = data.get('service_order_id', detail.service_order_id)
        detail.clothes = data.get('clothes', detail.clothes)
        detail.quantity = data.get('quantity', detail.quantity)
        service = ServiceOrder.query.filter_by(id = detail.service_order_id).first()
        detail.subtotal_price = detail.quantity * service.price
        
        db.session.commit()

        result = db.session\
        .query(Order, db.func.sum(DetailOrder.subtotal_price))\
        .join(DetailOrder)\
        .filter(Order.id == DetailOrder.order_id)\
        .group_by(Order.id)\
        .first()

        order, total_price = result
        order.total_price = total_price
        db.session.commit()
        return jsonify (detail.to_dict()), 202

    except Exception as e:
        return jsonify({ "error": str(e) }), 500

def deletedetail(id):
    client_id = get_jwt_identity()

    detail = db.session.query(DetailOrder).join(Order).filter( DetailOrder.id == id, Order.client_id == client_id ).first()

    if not detail: return ({ "message": "Detalle no existente o no pertenece al usuario" }), 404

    order = detail.order
    restante = detail.subtotal_price

    try:
        order.total_price -= restante

        db.session.delete(detail)
        db.session.commit() 
        return jsonify({ "message": "El detalle ha sido eliminado con exito" }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500
