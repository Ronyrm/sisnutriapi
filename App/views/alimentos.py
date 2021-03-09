from App import db,app
from App.model.alimentos import Alimentos, tabalimento_schema, tabalimentos_schema
from App.schema.schema import AlimentoSchema
from flask import jsonify, request

def post_tabalimentos_json():
    descricao = request.json['descricao']
    try:
        umidades = request.json['umidades']
    except:
        umidades = '0'

    try:
        calorias = request.json['caloria']
    except:
        caloria = '0'

    try:
        joule = request.json['joule']
    except:
        joule = '0'

    try:
        proteina = request.json['proteina']
    except:
        proteina = '0'

    try:
        lipidios = request.json['lipidios']
    except:
        lipidios = '0'

    try:
        colesterol = request.json['colesterol']
    except:
        colesterol = '0'

    try:
        carboidrato = request.json['carboidrato']
    except:
        carboidrato = '0'

    try:
        fibras = request.json['fibras']
    except:
        fibras = '0'

    try:
        cinzas = request.json['cinzas']
    except:
        cinzas = '0'

    try:
        calcio = request.json['calcio']
    except:
        calcio = '0'

    try:
        magnesio = request.json['magnesio']
    except:
        magnesio = '0'

    try:
        manganes = request.json['manganes']
    except:
        manganes = '0'

    try:
        fosforo = request.json['fosforo']
    except:
        fosforo = '0'

    try:
        ferro = request.json['ferro']
    except:
        ferro = '0'

    try:
        sodio = request.json['sodio']
    except:
        sodio = '0'

    try:
        potasio = request.json['potasio']
    except:
        potasio = '0'

    try:
        cobre = request.json['cobre']
    except:
        cobre = '0'

    try:
        zinco = request.json['zinco']
    except:
        zinco = '0'

    try:
        retinol = request.json['retinol']
    except:
        retinol = '0'

    try:
        re = request.json['re']
    except:
        re = '0'
    try:
        rae = request.json['rae']
    except:
        rae = '0'

    try:
        tiamina = request.json['tiamina ']
    except:
        tiamina = '0'

    try:
        riboflavina = request.json['riboflavina']
    except:
        riboflavina = '0'

    try:
        piridoxina = request.json['piridoxina']
    except:
        piridoxina = '0'

    try:
        niacina = request.json['niacina']
    except:
        niacina = '0'

    try:
        vitaminac = request.json['vitaminac']
    except:
        vitaminac = '0'

    try:
        qtdgramasemcima = request.json['qtdgramasemcima']
    except:
        qtdgramasemcima = '0'

    alimento = Alimentos(descricao, umidades, calorias, joule, proteina, lipidios, colesterol, carboidrato, fibras,
                 cinzas, calcio, magnesio, manganes, fosforo, ferro, sodio, potasio, cobre, zinco, retinol,re,
                 rae, tiamina, riboflavina, piridoxina, niacina, vitaminac, qtdgramasemcima)
    try:
        db.session.add(alimento)
        db.session.commit()
        result = tabalimentos_schema.dump(alimento)
        return jsonify({'message': 'successfully fetched', 'data': result}), 201
    except:
        return jsonify({'message': 'unable to create', 'data': {}}), 500

def get_alimento_byid(idalimento):
    alimento = Alimentos.query.get(idalimento)
    try:
        return alimento
    except:
        return None

def get_alimento_bydesc():
    desc = request.args.get('descricao')
    desc = "%"+desc+"%"
    alimento = Alimentos.query.filter(Alimentos.descricao.like(desc))
    alimentopag = Alimentos.query.order_by(Alimentos.id.asc()).\
        filter(Alimentos.descricao.like(desc)). \
        paginate(page=1,max_per_page=10, error_out=False)
    alimentochema = AlimentoSchema(only=('id','descricao','carboidrato','proteina','lipidios','sodio','calorias'))

    result = jsonify({'data': alimentochema.dump(alimento,many=True)})

    try:
        return result
    except:
        return None
    #https://www.tutorialspoint.com/json/json_ajax_example.htm