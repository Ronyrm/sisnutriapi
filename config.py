import string
import random

random_str = string.ascii_letters + string.digits + string.ascii_uppercase
key = ''.join(random.choice(random_str) for i in range(12))
DEBUG = True
#SQLALCHEMY_DATABASE_URI = 'mysql://221068:rony0608@mysql-rgmsolutions.alwaysdata.net/rgmsolutions_siscontrol'
SQLALCHEMY_DATABASE_URI = 'mysql://rony:rony@localhost:3307/sisnutri'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = key