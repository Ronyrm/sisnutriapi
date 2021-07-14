from App import db
from flask import request, jsonify
from App.model.localidades.uf import UF
from App.schema.localidades.localidades import UfSchema
from sqlalchemy import or_
def get_uf(id):
    if id == '' or id == '0':
        ufs = UF.query.filter(UF.id != id).all()
        if ufs:
            return ufs

    else:
        uf = UF.query.filter(or_(UF.id==id,UF.nome.like('%'+id+'%'),UF.sigla.like('%'+id+'%'))).all()
        if uf:
            return uf

    return None
