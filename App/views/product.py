from App import app,db
from App.model.products import Product
from flask import flash, jsonify, request,redirect,render_template
from App.schema.schema import ProductSchema
from werkzeug.utils import secure_filename
import jwt
import os
import string
import random

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

## Adiciona Produto
def add_product_form():

    random_str = string.ascii_letters + string.digits + string.ascii_uppercase
    key_img = ''.join(random.choice(random_str) for i in range(6))

    if request.method == 'POST':
        data = request.form
        descricao = data['descricao']
        subdescricao = data['subdescricao']
        estoquemin = data['estoquemin']
        estoqueatual = data['estoqueatual']
        precocusto = data['precocusto']
        margemlucro = data['margemlucro']
        precovenda = data['precovenda']

        if 'photoprod' not in request.files:
            flash('Nenhum produto informado')
            return redirect(request.url)
            caminhoimg = ''

        filephotoprod = request.files['photoprod']
        if filephotoprod.filename == '':
            caminhoimg = ''
            #flash('Arquivo não selecionado')
            #return redirect(request.url)
        if filephotoprod and allowed_file(filephotoprod.filename):
            filename = secure_filename(filephotoprod.filename)
            localesave = os.path.abspath(os.getcwd())+app.config['UPLOAD_FOLDER']
            filephotoprod.save(os.path.join(localesave, key_img + filename))
            caminhoimg = key_img + filename

    product = Product(descricao = descricao, subdescricao = subdescricao, estoquemin = estoquemin,
                      estoqueatual = estoqueatual, precocusto = precocusto, margemlucro = margemlucro,
                      precovenda = precovenda, caminhoimg = caminhoimg )
    try:
        db.session.add(product)
        db.session.commit()
        productschema = ProductSchema()
        result = productschema.dump(product)
        return jsonify({'message': 'successfully fetched', 'data': result}), 201
    except:
        return jsonify({'message': 'unable to create', 'data': {}}), 500

#Atualiza Product
def update_product_form(id):
    random_str = string.ascii_letters + string.digits + string.ascii_uppercase
    key_img = ''.join(random.choice(random_str) for i in range(6))

    if request.method == 'PUT':
        data = request.form
        descricao = data['descricao']
        subdescricao = data['subdescricao']
        estoquemin = data['estoquemin']
        estoqueatual = data['estoqueatual']
        precocusto = data['precocusto']
        margemlucro = data['margemlucro']
        precovenda = data['precovenda']

        if 'photoprod' not in request.files:
            flash('Nenhum produto informado')
            #return redirect(request.url)
            caminhoimg = ''

        filephotoprod = request.files['photoprod']
        if filephotoprod.filename == '':
            flash('Arquivo não selecionado')
            caminhoimg = ''
        if filephotoprod and allowed_file(filephotoprod.filename):
            filename = secure_filename(filephotoprod.filename)
            localesave = app.config['DIRECTORY_APP']+app.config['UPLOAD_FOLDER']
            caminhoimg = key_img + filename



    product = Product.query.get(id)
    if not product:
        return jsonify({'mensagem': 'Produto não Existe', 'data': {}}), 404



    try:
        product.descricao = descricao
        product.subdescricao = subdescricao
        product.estoquemin = estoquemin
        product.estoqueatual = estoqueatual
        product.precocusto = precocusto
        product.margemlucro = margemlucro
        product.precovenda = precovenda
        if caminhoimg != "" and caminhoimg != None:
            filephotoprod.save(os.path.join(localesave, key_img + filename))
            filedelete = os.path.join(localesave, product.caminhoimg)
            os.remove(filedelete)
            product.caminhoimg = caminhoimg


        db.session.commit()
        productschema = ProductSchema()
        result = productschema.dump(product)
        return jsonify({'message': 'successfully fetched', 'data': result}), 201
    except:
        return jsonify({'message': 'unable to create', 'data': {}}), 500


## Pesquisa por ID do Produto
def get_byid(idproduct):
    product = Product.query.get(idproduct)
    if product:
        productschema = ProductSchema()
        result = productschema.dump(product)
        return jsonify({'data': result})

    return jsonify({'message': 'Nenhum Produto foi encontrado com o código: '+idproduct, 'data': {}}), 500


## Filtra todos os produtos
def get_allproducts(current_user,token):

    products = Product.query.all()
    totalprod = len(products)
    if products:
        productsschema = ProductSchema(many=True)
        result = productsschema.dump(products)

        data = jwt.decode(token, app.config['SECRET_KEY'])

        #return jsonify({'mensagem': 'Todos os Produtos:. '+str(totalprod),'token': token,'data': result}), 201

        caminhoimg = app.config['DIRECTORY_APP']+app.config['UPLOAD_FOLDER']
        return render_template('layouts/products/products.html',
                               tabproducts=products,
                               caminhoimg=caminhoimg,
                               token=token,
                               idlogado=data['id'] if data==None else '',
                               usernamelogado=data['username'] if data==None else '')

    return jsonify({'mensagem': 'Falha ao Carregar', 'data': {}}), 500


## Filtra por descrição
def get_product_by_desc():
    from sqlalchemy import or_
    try:
        desc = request.args.get('descricao')
        desc = "%" + desc + "%"
        products = Product.query.filter(or_(Product.descricao.like(desc), Product.subdescricao.like(desc)))
        productsschema = ProductSchema(many=True)
        data = productsschema.dump(products)
        return jsonify({'data': data})

    except:
        return jsonify({'data':{}})
