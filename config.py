import string
import random
import os
random_str = string.ascii_letters + string.digits + string.ascii_uppercase
key = ''.join(random.choice(random_str) for i in range(12))
DEBUG = True
#SQLALCHEMY_DATABASE_URI = 'mysql://221068:rony0608@mysql-rgmsolutions.alwaysdata.net/rgmsolutions_siscontrol'
SQLALCHEMY_DATABASE_URI = 'mysql://rony:rony@localhost:3307/sisnutri'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = key
UPLOAD_FOLDER = 'App/static/img/uploads/'
DIRECTORY_APP = os.path.abspath(os.getcwd())
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

# Configuração EMAIL
MAIL_SERVER = 'smtp-rgmsolutions.alwaysdata.net'
MAIL_PORT = 465
MAIL_USERNAME = 'rgmsolutions@alwaysdata.net'
MAIL_PASSWORD = 'rony0608'
MAIL_USE_TLS= False
MAIL_USE_SSL = True