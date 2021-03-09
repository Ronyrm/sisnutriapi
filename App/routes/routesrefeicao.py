from flask import Blueprint
from App.views.refeicao import *
routesrefeicao = Blueprint('routesrefeicao',__name__)

@routesrefeicao.route('/post/refeicao.json',methods=['POST'])
def post_refeicao():
    return post_refeicao_json()


@routesrefeicao.route('/refeicao/cliente/<idcliente>/', methods=['GET'])
def get_refeicaocliente(idcliente):
    return get_refeicao_cliente(idcliente)