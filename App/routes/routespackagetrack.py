from flask import  Blueprint
from App.views import several
from App.views import packagetrack
from flask import jsonify,render_template,request
from App.schema.schema import PackageTrackSchema
routespackagetrack = Blueprint('routespackagetrack',__name__)

@routespackagetrack.route('/get/package/track/<idpessoa>/<status>',methods=['GET'])
def get_pack_track_pessoa(idpessoa,status):
    if request.method == 'GET':
        pack = packagetrack.get_package_track_pessoa(idpessoa,status)
        if pack:
            packschema = PackageTrackSchema()
            return jsonify({'result': True,'data':packschema.dump(pack,many=True)})
        else:
            return jsonify({'result': False, 'data': {}})

@routespackagetrack.route('/get/main/package/track/<pessoa>',methods=['GET'])
def get_main_packagetracker(pessoa):
    return packagetrack.get_main_package_track(pessoa)


@routespackagetrack.route('/post/package/track',methods=['POST'])
def add_update_pack_track():
    result = packagetrack.add_update_pack_track()
    return jsonify(result)