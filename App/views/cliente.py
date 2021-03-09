from App import db
from App.model.pessoa import  Pessoa, pessoa_schema, pessoas_schema
from App.model.cliente import Cliente
from App.model.users import Users
from App.views.pessoas import get_byusernameoremailpessoa
from flask import jsonify, request
from werkzeug.security import generate_password_hash
from App.schema.schema import ClienteSchema
import json
def add_cliente_json():
    try:
        rg = request.json['rg']
    except:
        rg = ''
    try:
        titulo = request.json['titulo']
    except:
        titulo = ''

    try:
        cpf = request.json['cpf']
    except:
        cpf = ''
    try:
        orgaoemissor = request.json['orgaoemissor']
    except:
        orgaoemissor=''
    try:
        username = request.json['username']
    except:
        username=''
    try:
        nome = request.json['nome']
    except:
        nome = ''
    try:
        email = request.json['email']
    except:
        email = ''
    try:
        password = request.json['password']
    except:
        password = ''

    pessoa = get_byusernameoremailpessoa(username,email)
    if pessoa:
        result = pessoa_schema.dump(pessoa)
        return jsonify({'message': 'Cliente já encontra-se cadastrado na base de dados com email e username!','data':result}), 500

    verificacliente = get_bycpf(cpf)
    if verificacliente:
        result = cliente_schema.dump(verificacliente)
        return jsonify({'message': 'Cliente já encontra-se cadastrado na base de dados com o cpf informado!',
                        'data': result}), 500

    pass_hash = generate_password_hash(password)

    pessoa_add = Pessoa(username=username,nome=nome, razaosocial='',tipopessoa='CL',
                        password=pass_hash,email=email)
    db.session.add(pessoa_add)
    db.session.commit()

    cliente_add = Cliente(rg=rg,titulo=titulo,orgaoemissor=orgaoemissor,cpf=cpf,idpessoa=pessoa_add.id)
    db.session.add(cliente_add)
    db.session.commit()
    clienterefschema = ClienteSchema()
    result = clienterefschema.dump(cliente_add)
    try:
        return jsonify({'message': 'successfully fetched', 'data': result}), 201
    except:
        return jsonify({'message': 'unable to create', 'data': {}}), 500


def get_bycpf(cpf):

    try:
        cliente = Cliente.query.filter(Cliente.cpf == cpf).one()
        return cliente
    except:
        return None

def get_byid(idcliente):
    cliente = Cliente.query.get(idcliente)
    clientrefschema = ClienteSchema()
    result = clientrefschema.dump(cliente)
    return jsonify({'data': result})
        #return jsonify({'message': 'Nenhum cliente foi encontrado com o código: '+idcliente, 'data': {}}), 500


