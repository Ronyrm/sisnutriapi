from App.model.pessoa import  Pessoa
from App.schema.schema import PessoaClienteRefeicoesSchema
from flask import jsonify, request


def get_byemailpessoa(email):
    try:
        pessoa = Pessoa.query.filter(Pessoa.email == email).one()
        return pessoa
    except:
        return None

def get_byusernamepessoa(username):
    try:
        pessoa = Pessoa.query.filter(Pessoa.username == username).one()
        return pessoa
    except:
        return None

def get_byid(id):
    pessoaschema = PessoaClienteRefeicoesSchema()
    pessoa = Pessoa.query.get(id)
    result = pessoaschema.dump(pessoa)
    return result


