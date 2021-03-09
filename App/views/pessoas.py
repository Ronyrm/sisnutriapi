from App import db
from App.model.pessoa import  Pessoa
from App.schema.schema import PessoaClienteRefeicoesSchema
from flask import jsonify, request


def get_byusernameoremailpessoa(username,email):
    from sqlalchemy import or_
    try:
        pessoa = Pessoa.query.filter(or_(Pessoa.username == username,Pessoa.email == email)).one()
        return pessoa
    except:
        return None

def get_byid(id):
    pessoaschema = PessoaClienteRefeicoesSchema()
    pessoa = Pessoa.query.get(id)
    result = pessoaschema.dump(pessoa)
    return result


