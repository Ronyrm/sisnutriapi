from App import db
from App.model.atleta import Atleta
from flask import jsonify, request,render_template
from werkzeug.security import generate_password_hash
from App.schema.schema import Atletaschema
import json


def get_maintelaatleta():
    return render_template('layouts/atleta/maintelaatleta.html')


def update_atleta():
    pass


def add_atleta():
    if request.method == 'POST':
        data = request.form
        try:
            id = data['edtid']
        except:
            id = ''

        if id == None:
            id = '-1'

        try:
            name = data['edtname']
        except:
            name = ''

        try:
            username = data['edtusername']
        except:
            username = ''

        try:
            email = data['edtemail']
        except:
            email = ''

        try:
            peso = data['edtpeso']
        except:
            peso=''

        try:
            altura = data['edtaltura']
        except:
            altura=''

        try:
            genero = data['edtgenero']
        except:
            genero = ''

        try:
            password = data['edtpassword']
        except:
            password = ''


    pass_hash = generate_password_hash(password)

    if id == '-1':
        atleta = get_username(username)
        if atleta:
            atletaschema = Atletaschema()
            return jsonify({'messagem': 'UserName: '+username+' já cadastrado no banco de dados', 'data':{},'result': False}), 201

        atleta = get_email(email)
        if atleta:
            atletaschema = Atletaschema()
            return jsonify({'messagem': 'Email: ' + email + ' já cadastrado no banco de dados', 'data': {},
                            'result': False}), 201

        atleta = Atleta(username=username,name=name, password=pass_hash,email=email,peso=peso,altura=altura,genero=genero)
        db.session.add(atleta)
    else:
        atleta = get_id(id)
        if atleta:
            if atleta.email != email:
                atletatemp = get_email(email)
                if atletatemp:
                    atleschema = Atletaschema()
                    return jsonify({'messagem': 'Email: ' + email + ' já cadastrado no banco de dados', 'data': {},
                                    'result': False}), 201

            if atleta.username != username:
                atletatemp = get_username(username)
                if atletatemp:
                    atleschema = Atletaschema()
                    return jsonify({'messagem': 'UserName: ' + username + ' já cadastrado no banco de dados', 'data': {},
                                    'result': False}), 201


            atleta.username = username
            atleta.name = name
            atleta.password = pass_hash
            atleta.email = email
            atleta.peso = peso
            atleta.altura = altura
            atleta.genero = genero
        else:
            return jsonify({'messagem': 'Usuário Inválido', 'data': {}, 'result': False}), 201

    db.session.commit()

    atletaschema = Atletaschema()
    result = atletaschema.dump(atleta)
    try:
        return jsonify({'messagem': 'successfully fetched', 'data': result,'result': True}), 201
    except:
        return jsonify({'messagem': 'unable to create', 'data': {},'result': False}), 201

def get_username(username):
    try:
        return Atleta.query.filter(Atleta.username == username).one()
    except:
        return None

def get_email(email):
    try:
        return Atleta.query.filter(Atleta.email == email).one()
    except:
        return None

def get_id(id):
    try:
        return Atleta.query.get(id)
    except:
        return None