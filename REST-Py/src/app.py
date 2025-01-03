from flask import Flask
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from src.config import config
from src.database import db, migrate 
from src.models import *
from src.routes import *

app = Flask(__name__)
app.config.from_object(config['development'])
CORS(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)
migrate.init_app(app, db)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

#Registro de rutas mediante Blueprint
app.register_blueprint(auth_bp, url_prefix='/')
app.register_blueprint(getClient_bp, url_prefic='/')
app.register_blueprint(paymentMethod_bp, url_prefix='/')
app.register_blueprint(serviceOrder_bp, url_prefix='/')
app.register_blueprint(orders_bp, url_prefix='/')
app.register_blueprint(details_bp, url_prefix='/')

if __name__ == '__main__':
    app.run()
