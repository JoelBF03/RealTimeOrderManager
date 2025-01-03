from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from src.database import db
from src.models import Client, Order, DetailOrder, ServiceOrder, PaymentMethod

def getOrders():
    client_id = get_jwt_identity()
    client = Client.query.filter_by(id=client_id).first()
    if not client:
        return jsonify({ "message": "Cliente no encontrado" }), 404

    orders = Order.query.filter_by(client_id=client_id).all()
    if not orders:
        return jsonify({ "message": "No se han encontrado órdenes" }), 202

    ordersWithDetails = []
    for order in orders:
        payment_method = PaymentMethod.query.get(order.payment_method_id)
        details = DetailOrder.query.filter_by(order_id=order.id).all()
        ordersWithDetails.append({
            "id": order.id,
            "client_id": order.client_id,
            "client_name": f"{client.first_name} {client.last_name}",
            "payment_method": payment_method.method_name if payment_method else "Desconocido",
            "total_price": order.total_price,
            "created_at": order.created_at,
            "details": [
                {
                    **detail.to_dict(),
                    "service_name": ServiceOrder.query.get(detail.service_order_id).service_name
                }
                for detail in details
            ]
        })

    return jsonify(ordersWithDetails), 200


def getOrder(id):
    client_id = get_jwt_identity()
    client = Client.query.filter_by(id=client_id).first()
    if not client:
        return jsonify({ "message": "Cliente no encontrado" }), 404

    order = Order.query.filter_by(id=id, client_id=client_id).first()
    if not order:
        return jsonify({ "error": "Orden no encontrada o no perteneciente al usuario" }), 404

    payment_method = ServiceOrder.query.get(order.payment_method_id)
    details = DetailOrder.query.filter_by(order_id=order.id).all()

    return jsonify({
        "id": order.id,
        "client_id": order.client_id,
        "client_name": f"{client.first_name} {client.last_name}",
        "payment_method": payment_method.method_name if payment_method else "Desconocido",
        "total_price": order.total_price,
        "created_at": order.created_at,
        "details": [
            {
                **detail.to_dict(),
                "service_name": ServiceOrder.query.get(detail.service_order_id).service_name
            }
            for detail in details
        ]
    }), 200

    
def createOrders(data):
    client_id = get_jwt_identity()  
    
    payment_method_id = data.get('payment_method_id')
    details = data['details']
    total_price = 0

    newOrder = Order(client_id = client_id, payment_method_id = payment_method_id, total_price = total_price)
    db.session.add(newOrder)
    db.session.commit()

    for detail in details:
        service_order_id = detail['service_order_id']
        quantity = detail['quantity']
        clothes = detail['clothes']
        service = ServiceOrder.query.filter_by(id = service_order_id).first()
        if not service:
            return jsonify ({ "error": "Tipo de servicio no encontrado" }), 404
        subtotal_price = service.price * quantity

        newDetailOrder = DetailOrder(order_id = newOrder.id, service_order_id = service_order_id, clothes = clothes, quantity = quantity, subtotal_price = subtotal_price)
        db.session.add(newDetailOrder)
        total_price += subtotal_price
    
    newOrder.total_price = total_price
    db.session.commit()
    order_details = DetailOrder.query.filter_by(order_id=newOrder.id).all()

    return jsonify({
        "id": newOrder.id,
        "client_id": newOrder.client_id,
        "payment_method_id": newOrder.payment_method_id,
        "total_price": newOrder.total_price,
        "created_at": newOrder.created_at,
        "details": [detail.to_dict() for detail in order_details]
    }), 201

def updateOrder(data, id):
    client_id = get_jwt_identity()
    
    order = Order.query.filter_by(id = id, client_id = client_id).first()
    if not order:
        return jsonify({ "error": "No se encontro la orden o no pertenece al usuario" }), 404

    order.payment_method_id = data.get('payment_method_id', order.payment_method_id)
    db.session.commit()
    order_details = DetailOrder.query.filter_by(order_id=order.id).all()

    return jsonify({
        "id": order.id,
        "client_id": order.client_id,
        "payment_method_id": order.payment_method_id,
        "total_price": order.total_price,
        "created_at": order.created_at,
        "details": [detail.to_dict() for detail in order_details]
    }), 200

def deleteOrder(id):
    client_id = get_jwt_identity()

    order = Order.query.filter_by(id = id, client_id = client_id).first()
    if not order:
        return jsonify({ "error": "No se encontro la orden o no pertenece al usuario" }), 404
    
    orders = DetailOrder.query.filter_by(order_id=order.id).all()
    for ordersDetail in orders:
        db.session.delete(ordersDetail)
    
    db.session.delete(order)
    db.session.commit()
    return jsonify({ "message": "Se ha eliminado la orden con exito" })
