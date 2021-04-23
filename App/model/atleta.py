from App import db, ma
import datetime



class Atleta(db.Model):
    __tablename__ = 'atleta'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), nullable=False, unique=True)
    create_on = db.Column(db.DateTime, default=datetime.datetime.now())
    dtnascimento = db.Column(db.DateTime, nullable=False)
    peso = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    altura = db.Column(db.NUMERIC(precision=8, asdecimal=True, scale=2))
    genero = db.Column(db.String(1), nullable=False)

