from flask import jsonify
from src.database import db
from src.models.paymentMethod import PaymentMethod, SerializerMixin

def getPaymentMethods():
    paymentMethods = PaymentMethod.query.all()
    return jsonify([method.to_dict() for method in paymentMethods]), 200


def getPaymentMethod(id):
    paymentMethod = PaymentMethod.query.get(id)

    if not paymentMethod:
        return jsonify ({ "error": "Metodo de pago no encontrado" }), 404
    
    return jsonify ( paymentMethod.to_dict() ), 200


def createPaymentMethod(data):
    method_name = data.get('method_name')

    if not method_name:
        return jsonify({ "error": "Ingrese un metodo de pago" }),404
    
    new_paymentMethod = PaymentMethod(method_name = method_name)

    db.session.add(new_paymentMethod)
    db.session.commit()

    return jsonify(new_paymentMethod.to_dict()), 202


def updatePaymentMethod(data, id):
    paymentMethod = PaymentMethod.query.filter_by(id=id).first()

    if not paymentMethod:
        return jsonify({ "error": "Metodo de pago no encontrado" })
    
    paymentMethod.method_name = data.get('method_name', paymentMethod.method_name)
    db.session.commit()

    return jsonify(paymentMethod.to_dict() ),200


def deletePaymentMethod(id):
    paymentMethod = PaymentMethod.query.filter_by(id=id).first()

    if not paymentMethod:
        return jsonify({ "error": "Metodo de pago no encontrado" })
    
    db.session.delete(paymentMethod)
    db.session.commit()

    return jsonify({"message": "Metodo de pago eliminado exitosamente"})
