from decouple import config

class Config:
    SECRET_KEY = config('SECRET_KEY')
    JWT_SECRET_KEY = config('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = f"postgresql://{config('USER')}:{config('PASSWORD')}@{config('HOST')}/{config('DATABASE')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'postgres:///:memory:' 
    TESTING = True

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig
}