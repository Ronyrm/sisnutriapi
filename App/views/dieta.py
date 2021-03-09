from App import db
from App.model.dieta import Dieta
from flask import jsonify, request
from App.model.refeicao import Refeicao
from App.schema.schema import DietaSchema
import datetime


def post_dieta_json(idrefeicao):
    descricao = request.json['descricao']
    try:
        data = request.json['data']
    except:
        data = datetime.datetime.now().date()

    dietaexiste = getdietarefeicao_id_data(idrefeicao,data)
    if dietaexiste:
        refeicao = Refeicao.query.get(idrefeicao)
        ano = data[0:4]
        mes = data[5:7]
        dia = data[8:10]

        databr = dia+'/'+mes+'/'+ano
        dieta_schema = DietaSchema()
        result = dieta_schema.dump(dietaexiste)

        return jsonify({'message': 'Refeição: '+refeicao.descricao+
                        ' encontra-se já lançada para esta data: '+databr, 'data': result}), 201

    mesano = request.json['mesano']
    totalcarbo = request.json['totalcarbo']
    totalproteina = request.json['totalproteina']
    totalgordura = request.json['totalgordura']
    totalfibras = request.json['totalfibras']
    totalsodio = request.json['totalsodio']
    totalcalorias = request.json['totalcalorias']




    dieta = Dieta(descricao=descricao,data=data,mesano=mesano,totalcarbo=totalcarbo,
                  totalproteina=totalproteina,totalgordura=totalgordura, totalfibras=totalfibras,
                 totalsodio=totalsodio, totalcalorias=totalcalorias, idrefeicao=idrefeicao)
    db.session.add(dieta)
    db.session.commit()
    dieta_schema = DietaSchema()
    result = dieta_schema.dump(dieta)
    return jsonify({'message': 'successfully fetched', 'data': result}), 201

def getdietarefeicao_id_data(idrefeicao,data):
    from sqlalchemy import and_
    try:
        dieta = Dieta.query.filter(and_(Dieta.idrefeicao == idrefeicao, Dieta.data == data)).one()
        return dieta
    except:
        return None

def getdietarefeicao(idrefeicao,data):
    try:
        dieta = getdietarefeicao_id_data(idrefeicao,data)
        dietaschema = DietaSchema()
        result = dietaschema.dump(dieta)
        return jsonify({'data':result})
    except:
        return None

