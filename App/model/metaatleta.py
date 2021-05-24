from App import db, ma
import datetime

class Metaatleta(db.Model):
    __tablename__ = 'metaatleta'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    descricao = db.Column(db.String(50), nullable=False)
    create_on = db.Column(db.DateTime, default=datetime.datetime.now())
    pesoinicial = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    pesofinal = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    nivelatividade = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    # 0-Harris Benedict Original 1-Harris Benedict Revisada 2-Mifflin St Jeor 3-Katch-McArdle
    valtmb = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=0))
    valgcd = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=0))
    # P-perda de peso G-ganho de peso
    tipometa = db.Column(db.String(1), nullable=False)
    valtotkclmeta = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=0))
    valtotkclexercicio = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=0))
    valalvocalorico = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=0))
    perccarb = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    percproteina = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    percfat = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    valkcalcarb = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    valkcalproteina = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    valkcalfat = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    # A-Aberto F-Fechada
    status = db.Column(db.String(1), nullable=False)
    idatleta = db.Column(db.Integer, db.ForeignKey('atleta.id'))
    atleta = db.relationship("Atleta",backref="metaatleta")


