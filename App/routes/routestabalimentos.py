from flask import jsonify,Blueprint,url_for
from App.views import alimentos

routestabalimentos = Blueprint('routestabalimentos',__name__)

@routestabalimentos.route('/post/alimento.json',methods=['POST'])
def post_alimento():
    return alimentos.post_tabalimentos_json()

@routestabalimentos.route('/tabalimentos.json/<pageatual>/<totpage>/<orderby>',methods=['GET'])
def get_alimentobydesc(pageatual,totpage,orderby):
    return alimentos.get_alimento_bydesc(totpage,orderby)

@routestabalimentos.route('/tabalimentos',methods=['GET'])
def get_tabalimentos():
    return alimentos.get_tabalimentos()

@routestabalimentos.route('/flipbook/',methods=['GET'])
def pagflipbook():
    return alimentos.pagflipbook();