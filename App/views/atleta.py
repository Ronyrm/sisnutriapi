from App import db,app
from App.model.atleta import Atleta
from App.model.pessoa import Pessoa
from App.views.metaatleta import get_metaatleta
from flask import jsonify, request,render_template,redirect,url_for
from werkzeug.security import generate_password_hash,check_password_hash
from App.schema.schema import Atletaschema,RefeicaoSchema,MetaAtletaschema
from flask_login import login_user,logout_user, LoginManager,current_user

from datetime import datetime
import json

login_manager = LoginManager()
#login_manager.login_view = 'routesatleta.get_mainatleta'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return Atleta.query.get(int(user_id))


def get_maindiarioatleta():
    databr = request.args.get('databr')
    dataatual = request.args.get('dataatual')

    if not current_user.is_authenticated:
        return render_template('layouts/atleta/diario/maindiario.html',atletalogado=[],
                               mensagem='',result=False,refeicao=[],
                               metaatleta=[],
                               dataatual=dataatual,
                               databr=databr,
                               sumdieta=[])
    else:


        schemaref = RefeicaoSchema()

        metaatleta = get_metaatleta(current_user.id,'A')

        from App.views.dieta import totalkcaldieta
        sumdieta = totalkcaldieta(current_user.metaatleta[0].id,dataatual)

        from App.views.refeicao import get_refeicao_byidpessoa
        refeicao = get_refeicao_byidpessoa(current_user.idpessoa)

        schemameta = MetaAtletaschema()

        schemaatleta = Atletaschema()

        return render_template('layouts/atleta/diario/maindiario.html', atletalogado=schemaatleta.dump(current_user), mensagem='', result=False,
                               #refeicao=schemaref.dump(current_user.pessoa.refeicao,many=True),
                               refeicao=schemaref.dump(refeicao,many=True),
                               metaatleta=schemameta.dump(metaatleta,many=True),
                               dataatual=dataatual,
                               databr=databr,
                               sumdieta=sumdieta)


def get_maintelaatleta():

    datenow = datetime.now()
    dia = datenow.day
    mes = datenow.month
    ano = datenow.year

    if not current_user.is_authenticated:
        return render_template('layouts/atleta/maintelaatleta.html',atletalogado=[],mensagem='',result=False,
                               refeicao=[],metaatleta = [],
                               dataatual=str(ano) + '-' + str(mes).zfill(2) + '-' + str(dia).zfill(2),
                               databr=str(dia).zfill(2) + '/' + str(mes).zfill(2) + '/' + str(ano)
                               )
    else:

        metaatleta = get_metaatleta(current_user.id,'A')
        schemameta = MetaAtletaschema()

        schemaatleta = Atletaschema()

        schemaref = RefeicaoSchema()
        from App.views.refeicao import get_refeicao_byidpessoa
        refeicao = get_refeicao_byidpessoa(current_user.idpessoa)

        return render_template('layouts/atleta/maintelaatleta.html', atletalogado=schemaatleta.dump(current_user), mensagem='', result=False,
                               refeicao=schemaref.dump(refeicao,many=True),
                               metaatleta=schemameta.dump(metaatleta,many=True),
                               dataatual=str(ano) + '-' + str(mes).zfill(2) + '-' + str(dia).zfill(2),
                               databr=str(dia).zfill(2) + '/' + str(mes).zfill(2) + '/' + str(ano)
                               )


def update_atleta():
    if request.method == 'POST':
        data = request.form
        try:
            id = data['edtid']
        except:
            id = None

        try:
            name = data['edtnomeatleta']
        except:
            name = ''

        try:
            username = data['edtusernameatleta']
        except:
            username = ''

        try:
            email = data['edtemailatleta']
        except:
            email = ''

        try:
            altura = data['edtalturaatleta']
        except:
            altura = None

        try:
            peso = data['edtpesoatleta']
        except:
            peso = None

        try:
            percfat = data['edtpercfatatleta']
        except:
            percfat = None

        try:
            dtbirth = data['edtdtbirthatleta']
        except:
            dtbirth = None


        try:
            selectgenero = data['selectgeneroatleta']
        except:
            selectgenero = None

    if id != '' and id != None:
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
                    return jsonify(
                        {'messagem': 'UserName: ' + username + ' já cadastrado no banco de dados', 'data': {},
                         'result': False}), 201

            atleta.name = name
            atleta.email = email
            atleta.username = username
            atleta.altura = altura
            atleta.peso = peso
            atleta.percfat = percfat
            atleta.genero = selectgenero
            atleta.dtnascimento = dtbirth
            try:
                db.session.commit()
                atletaschema = Atletaschema()
                result = atletaschema.dump(atleta)
                return jsonify({'mensagem': 'Dados do Usuário atualizado com sucesso', 'data': result, 'result': True}), 201
            except:
                return jsonify({'mensagem': 'Erro ao atualizar dados, tente novamente mais tarde!', 'data': {}, 'result': False}), 201

    return jsonify({'mensagem': 'Usuário Inválido', 'data': {}, 'result': False}), 201


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
            pwd= data['edtsenha']
        except:
            pwd = ''

        try:
            pwdconf = data['edtsenhaconf']
        except:
            pwdconf = ''

    if pwd != pwdconf:
        return render_template('layouts/atleta/maintelaatleta.html',
                               mensagem='Senha não confere',
                               tela='Registrar',
                               atletalogado=data,
                               result=False)



    pass_hash = generate_password_hash(pwd)


    if id == '-1':
        atleta = get_username(username)
        if atleta:
            atletaschema = Atletaschema()
            return render_template('layouts/atleta/maintelaatleta.html',
                                   mensagem='UserName: '+username+' já cadastrado no banco de dados',
                                   tela='Registrar',
                                   atletalogado=data,
                                   result=False)

        atleta = get_email(email)
        if atleta:
            atletaschema = Atletaschema()
            return render_template('layouts/atleta/maintelaatleta.html',
                                   mensagem='Email: ' + email + ' já cadastrado no banco de dados',
                                   tela='Registrar',
                                   atletalogado=data,
                                   result=False)

        pessoa = Pessoa(username=username,nome=name,password=pass_hash,email=email,tipopessoa='AT')
        db.session.add(pessoa)
        db.session.commit()
        atleta = Atleta(username=username,name=name, password=pass_hash,email=email,idpessoa=pessoa.id)
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

        else:
            return jsonify({'messagem': 'Usuário Inválido', 'data': {}, 'result': False}), 201

    db.session.commit()

    atletaschema = Atletaschema()
    result = atletaschema.dump(atleta)
    try:
        #return jsonify({'messagem': 'successfully fetched', 'data': result,'result': True}), 201
        return render_template('layouts/atleta/maintelaatleta.html',
                               mensagem='Usuário'+ username +' cadastrado com Sucesso, faça o login!',
                               tela='Login',
                               atletalogado=data,
                               result=True)

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

def login():
    datenow = datetime.now()
    dia = datenow.day
    mes = datenow.month
    ano = datenow.year

    if request.method == 'POST':
        data = request.form
        username = data['edtemail']
        pwd = data['edtsenha']
        atleta = get_email(username)

        if not atleta:
            atleta = get_username(username)

        if atleta:
            if check_password_hash(atleta.password,pwd):
                login_user(atleta)
                from App.views.refeicao import get_refeicao_byidpessoa
                refeicao = get_refeicao_byidpessoa(atleta.idpessoa)
                schemaref = RefeicaoSchema()

                from App.views.metaatleta import get_metaatleta
                metaatleta = get_metaatleta(atleta.id, 'A')
                schemameta = MetaAtletaschema()
                resultmeta = schemameta.dump(metaatleta, many=True)

                schematleta = Atletaschema()

                return render_template('layouts/atleta/maintelaatleta.html',atletalogado=schematleta.dump(atleta),result=True,
                                       mensagem='Usuário Logado com Sucesso!',
                                       refeicao=schemaref.dump(refeicao,many=True),
                                       metaatleta=resultmeta,
                                       dataatual=str(ano) + '-' + str(mes).zfill(2) + '-' + str(dia).zfill(2),
                                       databr=str(dia).zfill(2) + '/' + str(mes).zfill(2) + '/' + str(ano)
                                       )

        return render_template('layouts/atleta/maintelaatleta.html',tela='Login',
                               mensagem='Atleta ou senha informado: '+username+' inválidos!',result=False,
                               atletalogado={},refeicao=[],metaatleta=[],
                               dataatual=str(ano) + '-' + str(mes).zfill(2) + '-' + str(dia).zfill(2),
                               databr=str(dia).zfill(2) + '/' + str(mes).zfill(2) + '/' + str(ano)
                               )

def logout():
    logout_user()
    redirect(url_for('routesatleta.get_mainatleta'))