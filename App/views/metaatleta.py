from App import db,app
from App.model.metaatleta import Metaatleta
from App.schema.schema import MetaAtletaschema
from flask import jsonify, request,render_template,redirect,url_for

def get_metaatleta(idatleta):
    if idatleta != '' and idatleta != '0':
        metaatleta = Metaatleta.query.filter(Metaatleta.idatleta==idatleta).\
                   order_by(Metaatleta.create_on.asc(),Metaatleta.status.asc()).all()
        if metaatleta:
            metaschema = MetaAtletaschema()
            return jsonify({'mensagem': 'Metas encontradas',
                            'data': metaschema.dump(metaatleta,many=True),
                            'result': False}), 201

    return jsonify({'mensagem': 'Nenhuma Meta Cadastrada para esse atleta', 'data': {},
                 'result': False}), 201



