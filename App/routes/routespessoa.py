from App import app
from flask import jsonify,Blueprint,url_for
from App.views import pessoas

routespessoa = Blueprint('routespessoa', __name__)


@routespessoa.route('/pessoa/<id>',methods=['GET'])
def post_user(id):
    return pessoas.get_byid(id)
