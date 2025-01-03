from flask import jsonify
from src.database import db
from src.models import ServiceOrder

def getServices():
    service = ServiceOrder.query.all()
    return jsonify ([method.to_dict() for method in service]), 200

def getService(id):
    service = ServiceOrder.query.get(id)

    if not service:
        return jsonify ({ "error": "Tipo de servicio no encontrado" })
    
    return jsonify (service.to_dict()), 200

def createService(data):
    service_name = data.get('service_name')
    price = data.get('price')

    if not (service_name, price):
        return jsonify ({ "error": "Todos los parametros son necesarios" }), 404
    
    newService = ServiceOrder(service_name = service_name, price = price)
    db.session.add(newService)
    db.session.commit()
    return jsonify ( newService.to_dict() ), 202

def updateService(data, id):
    service = ServiceOrder.query.filter_by(id=id).first()

    if not service:
        return jsonify ({ "error": "Tipo de servicio no encontrado" }), 404
    
    service.service_name = data.get('service_name', service.service_name)
    service.price = data.get('price', service.price)
    db.session.commit()

    return jsonify({
        "id": service.id,
        "service_name": service.service_name,
        "price": service.price
    }), 200

def deleteService(id):
    service = ServiceOrder.query.get(id)

    if not service:
        return jsonify ({ "error": "Tipo de servicio no encontrado" }), 404
    
    db.session.delete(service)
    db.session.commit()

    return jsonify ({ "message": "El tipo de servicio ha sido eliminado" }), 202
