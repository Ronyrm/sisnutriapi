from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema
from App.model.pessoa import Pessoa
from App.model.cliente import Cliente
from App.model.refeicao import Refeicao
from App.model.dieta import Dieta
from App.model.itemdieta import ItemDieta
from App.model.alimentos import Alimentos


class PessoaSchema(ModelSchema):
    class Meta:
        model = Pessoa

class ClienteSchema(ModelSchema):
    class Meta:
        model = Cliente
    pessoa = fields.Nested("PessoaSchema",exclude=('refeicao',))



class RefeicaoSchema(ModelSchema):
    class Meta:
        model = Refeicao
    pessoa = fields.Nested(PessoaSchema)

class DietaSchema(ModelSchema):
    class Meta:
        model = Dieta

    dieta_refeicao = fields.Nested(RefeicaoSchema)

class AlimentoSchema(ModelSchema):
    class Meta:
        ordered = False
        model = Alimentos


class ItemDietaSchema(ModelSchema):
    class Meta:
        model = ItemDieta
    dieta = fields.Nested('DietaSchema',only=('id','descricao','data',))
    alimento = fields.Nested('AlimentoSchema',only=('id','descricao',))


class PessoaSchema(ModelSchema):
    class Meta:
        model = Pessoa
    cliente = fields.Nested(ClienteSchema,many=True)
    refeicao =fields.Nested(RefeicaoSchema,many=True)

class PessoaClienteRefeicoesSchema(ModelSchema):
    class Meta:
        model = Pessoa

    refeicao = fields.Nested(RefeicaoSchema(many=True),exclude=('pessoa',),dump_only=True)
    cliente  = fields.Nested(ClienteSchema(many=True),exclude=('pessoa',),dump_only=True)
