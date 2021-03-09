from App import db, ma
import datetime


class Pessoa(db.Model):
    __tablename__ = 'pessoa'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    nome = db.Column(db.String(70))
    razaosocial = db.Column(db.String(70))
    tipopessoa = db.Column(db.String(2), nullable=False)
    password = db.Column(db.String(200))
    email = db.Column(db.String(60), nullable=False, unique=True)

    refeicao = db.relationship('Refeicao')
    cliente  = db.relationship('Cliente')
    create_on = db.Column(db.DateTime, default=datetime.datetime.now())



class PessoasSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'nome', 'razaosocial', 'tipopessoa','email','datacadastro')


pessoa_schema = PessoasSchema()
pessoas_schema = PessoasSchema(many=True)

