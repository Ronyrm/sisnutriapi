from flask import Blueprint
from App.views import dieta

routesdieta = Blueprint('routesdieta',__name__)

@routesdieta.route('/post/dieta.json/<idrefeicao>',methods=['POST'])
def post_dietajson(idrefeicao):
    return dieta.post_dieta_json(idrefeicao)

@routesdieta.route('/dietarefeicao.json/<idrefeicao>/<data>',methods=['GET'])
def get_dietarefeicao(idrefeicao,data):
    return dieta.getdietarefeicao(idrefeicao,data)