from flask import jsonify,Blueprint,url_for
from App.views import alimentos

routestabalimentos = Blueprint('routestabalimentos',__name__)

@routestabalimentos.route('/post/alimento.json',methods=['POST'])
def post_alimento():
    return alimentos.post_tabalimentos_json()

@routestabalimentos.route('/alimentos.json',methods=['GET'])
def get_alimentobydesc():
    return alimentos.get_alimento_bydesc()
