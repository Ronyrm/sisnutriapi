from App import db,app
from App.model.alimentos import Alimentos, tabalimento_schema, tabalimentos_schema
from App.schema.schema import FoodsSchema
from flask import jsonify, request,render_template
from App.model.pessoa import Pessoa
from App.model.cliente import Cliente
from flask_paginate import get_page_args
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
                 rae, tiamina, riboflavina, piridoxina, niacina, vitaminac, qtdgramasemcima,'')
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

    try:
        desc = request.args.get('descricao')
    except:
        desc = ''

    totpage = request.args.get('totpage')
    if totpage == None or totpage == '':
        totpage = '10'

    orderby = request.args.get('orderby')
    if orderby == None or orderby == '':
        orderby = '0'



    try:
        page = request.args.get('page')
    except:
        page = ''
    if page == None:
        page = '1'



    if desc == None:
        desc = ''

    if totpage == '':
        totpage = '15'

    inputdesc = desc
    desc = "%"+desc+"%"

    if desc != '':
        from sqlalchemy import and_
        if orderby == '0':
            alimentopag = Alimentos.query.order_by(Alimentos.descricao.asc()). \
                filter(and_(Alimentos.descricao.like(desc),Alimentos.idpessoa.is_(None))). \
                paginate(page=int(page),per_page=int(totpage), error_out=False)

        if orderby == '1':
            alimentopag = Alimentos.query.order_by(Alimentos.calorias.desc()). \
                filter(and_(Alimentos.descricao.like(desc), Alimentos.idpessoa.is_(None))). \
                paginate(page=int(page), max_per_page=int(totpage), error_out=False)

        if orderby == '2':
            alimentopag = Alimentos.query.order_by(Alimentos.carboidrato.desc()). \
                filter(and_(Alimentos.descricao.like(desc), Alimentos.idpessoa.is_(None))). \
                paginate(page=int(page), max_per_page=int(totpage), error_out=False)

        if orderby == '3':
            alimentopag = Alimentos.query.order_by(Alimentos.proteina.desc()). \
                filter(and_(Alimentos.descricao.like(desc), Alimentos.idpessoa.is_(None))). \
                paginate(page=int(page), max_per_page=int(totpage), error_out=False)

        if orderby == '4':
            alimentopag = Alimentos.query.order_by(Alimentos.lipidios.desc()). \
                filter(and_(Alimentos.descricao.like(desc), Alimentos.idpessoa.is_(None))). \
                paginate(page=int(page), max_per_page=int(totpage), error_out=False)

        if orderby == '5':
            alimentopag = Alimentos.query.order_by(Alimentos.fibras.desc()). \
                filter(and_(Alimentos.descricao.like(desc), Alimentos.idpessoa.is_(None))). \
                paginate(page=int(page), max_per_page=int(totpage), error_out=False)


        total = 0
        if alimentopag:
            total = alimentopag.total

            page, per_page, offset = get_page_args()

            per_page = totpage
            from App.funcs.getpagination import get_pagination
            pagination = get_pagination(
                page=page,
                per_page=per_page,
                total=total,

                record_name="alimentos",

            )

        #foodsschema = FoodsSchema(only=('id','descricao','carboidrato','proteina','lipidios','sodio','calorias','fibras','pessoa'))

    from App.funcs.funcs import  returnPagination
    if alimentopag:
        foodsschema = FoodsSchema()
        tabfods = foodsschema.dump(alimentopag.items,many=True)
        #tabfoods = foodsschema.dump(alimentopag, many=True)
        return render_template('layouts/foods/mainfoods.html',
                               pagul=pagination,
                               result=True,
                               orderby=orderby,
                               tabfoods=tabfods,
                               inputdesc=inputdesc,
                               mensagem='Pesquisa Efetuada com Sucesso.')

        #return  jsonify({'result': True, 'mensagem':'Pesquisa Efetuada com Sucesso.','data':tabfoods, 'datapagination':returnPagination(alimentopag)})

    return jsonify({'result': False,  'data': {},'datapagination':{},'mensagem':'Nenhum item encontrado com a pesquisa fornecida'})
    #https://www.tutorialspoint.com/json/json_ajax_example.htm

def get_alimento_bydesc_json():

    try:
        desc = request.args.get('descricao')
    except:
        desc = ''

    totpage = request.args.get('totpage')
    if totpage == None or totpage == '':
        totpage = '10'


    try:
        page = request.args.get('page')
    except:
        page = ''
    if page == None:
        page = '1'



    if desc == None:
        desc = ''

    if totpage == '':
        totpage = '15'

    inputdesc = desc
    desc = "%"+desc+"%"

    if desc != '':
        from sqlalchemy import and_
        alimentopag = Alimentos.query.order_by(Alimentos.descricao.asc()). \
                      filter(and_(Alimentos.descricao.like(desc),Alimentos.idpessoa.is_(None))). \
                      paginate(page=int(page),per_page=int(totpage), error_out=False)
        total = 0
        if alimentopag:
            total = alimentopag.total

            page, per_page, offset = get_page_args()

            per_page = totpage
            from App.funcs.getpagination import get_pagination
            pagination = get_pagination(
                page=page,
                per_page=per_page,
                total=total,

                record_name="alimentos",

            )
    if alimentopag:
        foodsschema = FoodsSchema()
        tabfods = foodsschema.dump(alimentopag.items,many=True)
        #tabfoods = foodsschema.dump(alimentopag, many=True)
        return jsonify({'pagul': pagination.links, 'result': True, 'tabfoods': tabfods,
                        'inputdesc': inputdesc, 'mensagem': 'Pesquisa efetuada com sucesso!'})

    return jsonify({'pagul': {}, 'result': False, 'tabfoods': {},
                    'inputdesc': '', 'mensagem': 'Erro.'})


def get_tabalimentos():
    return get_alimento_bydesc()
    #res_json = result.json
    #dataalimentos = res_json['data']
    #datapagination = res_json['datapagination']
    #mensagem = res_json['mensagem']
    #orderby = orderby;
    #return render_template('layouts/foods/mainfoods.html',
    #                       datapagination=datapagination,
    #                       result=result,
    #                       orderby=orderby,
    #                       tabfoods=dataalimentos,
    #                       mensagem=mensagem)

