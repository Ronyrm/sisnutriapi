from flask import Blueprint,redirect,url_for,render_template
from flask_login import login_user,logout_user,login_required
from App.views import atleta

routesatleta= Blueprint('routesatleta',__name__)



@routesatleta.route('/send/email/atleta', methods=['GET'])
def sendemailatleta():
    return atleta.sendemailatleta()

@routesatleta.route('/sisnutri/diario',methods=['GET','POST'])
def get_maindiarioatleta():
    return atleta.get_maindiarioatleta()


@routesatleta.route('/sisnutri/atleta/validationacess',methods=['GET'])
def validationacessatleta():
    return atleta.validationacessatleta()


@routesatleta.route('/',methods=['GET','POST'])
def get_mainatleta():
    return atleta.get_maintelaatleta();

@routesatleta.route('/sisnutri/add/atleta',methods=['GET','POST'])
def add_atleta():
    return atleta.add_atleta()

@routesatleta.route('/sisnutri/update/atleta',methods=['POST'])
def updateatleta():
    return atleta.update_atleta()

@routesatleta.route('/sisnutri/atleta/login',methods=['POST'])
def loginatleta():
    return atleta.login()

@routesatleta.route('/sisnutri/atleta/logout')
@login_required
def logoutatleta():
    logout_user()
    return redirect(url_for('routesatleta.get_mainatleta'))