from flask import Blueprint,redirect,url_for
from flask_login import login_user,logout_user,login_required
from App.views import atleta
from App.views import metaatleta
routesmetaatleta= Blueprint('routesmetaatleta',__name__)

@routesmetaatleta.route('/sisnutri/meta/atleta/<idatleta>',methods=['GET'])
def get_metaatleta(idatleta):
    return metaatleta.get_metaatleta(idatleta)