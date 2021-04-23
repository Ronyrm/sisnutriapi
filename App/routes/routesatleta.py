from flask import Blueprint
from App.views import atleta

routesatleta= Blueprint('routesatleta',__name__)

@routesatleta.route('/sisnutri',methods=['GET','POST'])
def get_mainatleta():
    return atleta.get_maintelaatleta();

@routesatleta.route('/add/atleta',methods=['GET','POST'])
def add_atleta():
    return atleta.add_atleta()

@routesatleta.route('/update/atleta',methods=['GET','POST'])
def updateatleta():
    return atleta.update_atleta()
