from App import db
from App.model.itemdieta import ItemDieta
from flask import jsonify, request
from App.model.refeicao import Refeicao
from App.views.alimentos import get_alimento_byid
from App.schema.schema import ItemDietaSchema
from App.funcs.funcalimentos import calcmacronutriente
import datetime


def post_itemdieta_form():
    data = request.form
    iddieta =  data['iddieta']
    idalimento = data['idalimento']
    qtdgramas = data['qtdgramas']



    alimentoexiste = get_alimento_byid(idalimento)
    if not alimentoexiste:
        return jsonify({'message': 'O Código do Alimento informado não existe na nossa base de dados!', 'data': {}}), 201


    totalcarbo = calcmacronutriente(float(alimentoexiste.carboidrato),float(alimentoexiste.qtdgramasemcima),float(qtdgramas))
    totalproteina = calcmacronutriente(float(alimentoexiste.proteina),float(alimentoexiste.qtdgramasemcima),float(qtdgramas))
    totalgordura = calcmacronutriente(float(alimentoexiste.lipidios),float(alimentoexiste.qtdgramasemcima),float(qtdgramas))
    totalsodio = calcmacronutriente(float(alimentoexiste.sodio),float(alimentoexiste.qtdgramasemcima),float(qtdgramas))
    totalfibras = calcmacronutriente(float(alimentoexiste.fibras),float(alimentoexiste.qtdgramasemcima),float(qtdgramas))
    totalcalorias = calcmacronutriente(float(alimentoexiste.calorias),float(alimentoexiste.qtdgramasemcima),float(qtdgramas))


    itemdieta = ItemDieta(totalcarbo= totalcarbo,totalproteina= totalproteina,
    totalgordura= totalgordura, totalsodio= totalsodio, totalfibras= totalfibras,
    iddieta= iddieta,idalimento= idalimento,quantgramas=qtdgramas,totalcalorias=totalcalorias)
    db.session.add(itemdieta)
    db.session.commit()
    dieta_schema = ItemDietaSchema()
    result = dieta_schema.dump(itemdieta)
    return jsonify({'message': 'successfully fetched', 'data': result}), 201

def getitemdieta(iddieta):
    from sqlalchemy import and_
    try:
        itemdieta = ItemDieta.query.filter(ItemDieta.iddieta==iddieta).one()
        return itemdieta
    except:
        return None

