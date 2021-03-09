from App import db,ma
from App.model.refeicao import Refeicao
from App.model.pessoa import Pessoa
from App.model.cliente import Cliente
from flask import jsonify, request
from App.schema.schema import PessoaClienteRefeicoesSchema,RefeicaoSchema


def post_refeicao_json():
    descricao = request.json['descricao']
    hora = request.json['hora']
    mostrar = request.json['mostrar']
    idpessoa = request.json['idpessoa']
    existrefeicao = get_bydescricao(descricao,idpessoa)
    pessoa = Pessoa.query.get(idpessoa)
    if not pessoa:
        return jsonify({'message': 'Cliente não encontrado na base de dados!','data': {}}), 201
    if existrefeicao:
        #result = refeicao_schema.dump(existrefeicao)
        return jsonify({'message': 'A Refeição '+descricao+' existe para o usuário '+pessoa.nome+
                        ' no horário: '+hora, 'data': {}}), 201

    refeicao = Refeicao(descricao=descricao, hora=hora, mostrar=mostrar, idpessoa=idpessoa)
    try:
        db.session.add(refeicao)
        db.session.commit()
        refeicaoschema = RefeicaoSchema()
        result = refeicaoschema.dump(refeicao)
        return jsonify({'message': 'successfully fetched', 'data': result}), 201
    except:
        return jsonify({'message': 'unable to create', 'data': {}}), 500


def get_bydescricao(descricao,idpessoa):
    from sqlalchemy import and_
    try:
        refeicao = Refeicao.query.filter(and_(Refeicao.descricao == descricao,Refeicao.idpessoa == idpessoa)).one()
        return refeicao
    except:
        return None

def get_byid(id):
    pass

def get_refeicao_cliente(idcliente):

    cliente = Cliente.query.get(idcliente)
    clienterefshema = PessoaClienteRefeicoesSchema()
    resultcliente = clienterefshema.dump(cliente)

    return jsonify({'data': resultcliente})
    #result = db.session.query(Pessoa.nome,Cliente.cpf, Refeicao.descricao,Refeicao.hora,Refeicao.mostrar). \
    #join(Refeicao). \
    #join(Cliente). \
    #filter(Pessoa.id == idpessoa).all()

    #import simplejson
    #data = simplejson.dumps(result, default=formatdatetime_parser,ensure_ascii=False).encode('utf8')
    #return data



