from flask import Blueprint,redirect,url_for,request
from App.views import metaatleta
from App.schema.schema import MetaAtletaschema
routesmetaatleta= Blueprint('routesmetaatleta',__name__)

@routesmetaatleta.route('/sisnutri/meta/atleta/<idatleta>',methods=['GET'])
def get_metaatleta(idatleta):
    try:
        status = request.args.get('status')
    except:
        status = 'A'

    if status == None:
        status = 'A'
    metaschema = MetaAtletaschema
    return metaschema.dump(metaatleta.get_metaatleta(idatleta,status),many=True)

@routesmetaatleta.route('/sisnutri/meta/pessoa/<idpessoa>',methods=['GET'])
def get_metaatleta_idpessoa(idpessoa):
    try:
        status = request.args.get('status')
    except:
        status = 'A'
    if status == None:
        status = 'A'
    return metaatleta.get_metaatleta_porpessoa(idpessoa,status)

@routesmetaatleta.route('/post/metaatleta',methods=['POST'])
def post_metaatleta():
    return metaatleta.postmetaatleta();

@routesmetaatleta.route('/count/metaatleta',methods=['GET'])
def count_metaatleta():
    return metaatleta.count_metaatleta()