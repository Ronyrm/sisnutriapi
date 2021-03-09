import sys
import os


from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from App import app as application, create_app


if __name__ == '__main__':
    #from wsgiref.simple_server import make_server
    #make_server('0.0.0.0',8000,application).serve_forever()
    #application.wsgi_app = ProxyFix(application.wsgi_app)
    application = create_app()
    application.run()
