
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
def add_product_form(current_user, token,page,totporpag):

    random_str = string.ascii_letters + string.digits + string.ascii_uppercase
    key_img = ''.join(random.choice(random_str) for i in range(6))

    if request.method == 'POST':
        data = request.form
        descricao = data['edtdescricao']
        subdescricao = data['edtsubdescricao']
        estoquemin = data['edtestoqminimo']
        estoqueatual = data['edtestoqatual']
        precocusto = data['edtprecocusto']
        margemlucro = data['edtmargemlucro']
        precovenda = data['edtprecovenda']

        if 'fileimg' not in request.files:
            flash('Nenhum produto informado')
            #return redirect(request.url)
            caminhoimg = ''

        filephotoprod = request.files['fileimg']
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
        #return jsonify({'message': 'successfully fetched', 'data': result}), 201
        return get_allproducts(current_user,token,page,totporpag)
    except:
        return jsonify({'message': 'unable to create', 'data': {}}), 500

#Atualiza Product
def update_product_form(current_user, token,page,totporpag):
    random_str = string.ascii_letters + string.digits + string.ascii_uppercase
    key_img = ''.join(random.choice(random_str) for i in range(6))

    if request.method == 'POST':
        data = request.form
        id = data['edtid']

        if id != '-1':
            product = Product.query.get(id)
            if not product:
                msg = 'O produto não existe na nossa base de dados'
                return get_allproducts(current_user, token, page, totporpag,msg)
                #return jsonify({'mensagem': 'Produto não Existe', 'data': {}}), 404

        else:
            product = Product()

        descricao = data['edtdescricao']
        subdescricao = data['edtsubdescricao']
        estoquemin = data['edtestoqminimo']
        estoqueatual = data['edtestoqatual']
        precocusto = data['edtprecocusto']
        margemlucro = data['edtmargemlucro']
        precovenda = data['edtprecovenda']

        caminhoimgBD = Product.caminhoimg
        caminhoimg = ''


        if caminhoimg == '':

            if 'fileimg' not in request.files:
                flash('Nenhum produto informado')
                # return redirect(request.url)
                caminhoimg = ''

            try:
                filephotoprod = request.files['fileimg']
                tamanhoarq =len(filephotoprod.filename)
                if tamanhoarq == 0:
                    caminhoimg = ''
                else:
                    try:
                        if filephotoprod and allowed_file(filephotoprod.filename):
                            filename = secure_filename(filephotoprod.filename)
                            localesave = app.config['DIRECTORY_APP'] + app.config['UPLOAD_FOLDER']
                            caminhoimg = key_img + filename
                    except:
                        caminhoimg = ''
            except:
                caminhoimg = ''



    try:
        product.descricao = descricao
        product.subdescricao = subdescricao
        product.estoquemin = estoquemin
        product.estoqueatual = estoqueatual
        product.precocusto = precocusto
        product.margemlucro = margemlucro
        product.precovenda = precovenda
        try:
            if caminhoimg != "" and caminhoimg != None:
                filephotoprod.save(os.path.join(localesave, key_img + filename))
                if product.caminhoimg != '':
                    filedelete = os.path.join(localesave, product.caminhoimg)
                    os.remove(filedelete)
        except:
            caminhoimg = ''



        product.caminhoimg = caminhoimg
        msg = 'Produto: '+ str(product.id) + ' - ' + product.descricao+' alterado com sucesso!'
        if id == '-1':
            msg = 'Produto: '+ product.descricao+' inserindo com sucesso'
            db.session.add(product)


        db.session.commit()
        #productschema = ProductSchema()
        #result = productschema.dump(product)

        return get_allproducts(current_user,token,page,totporpag,msg)
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
def get_allproducts(current_user,token,page,totporpag,msg = ''):

    pagination = Product.query.paginate(page=int(page),max_per_page=int(totporpag), error_out=False)
    products = pagination.items
    totalprod = len(products)

    if products:
        productsschema = ProductSchema(many=True)

        result = productsschema.dump(products)

        data = jwt.decode(token, app.config['SECRET_KEY'])

        #return jsonify({'mensagem': 'Todos os Produtos:. '+str(totalprod),'token': token,'data': result}), 201
        import  json
        datapag = '{"nextpag":"'+str(pagination.has_next)+'","prevpag":"'+str(pagination.has_prev)+'",'
        datapag +='"nextnum": "'+str(pagination.next_num if pagination.next_num!=None else 0) +'",'
        datapag +='"pageatual": "'+str(pagination.page if pagination.page!=None else 0)+'",'
        datapag += '"totpage": "'+str(pagination.pages if pagination.pages!=None else 0)+'",'

        if pagination.per_page != None:
            datapag +='"per_page": "'+ str(pagination.per_page)+'",'
        else:
            datapag += '"per_page": "' + str(0) + '",'

        if pagination.prev_num != None:
            datapag +='"prev_num": "'+ str(pagination.prev_num)+'"}'
        else:
            datapag += '"prev_num": "' + str(0) + '"}'

        url = request.url_root

        datapag = json.loads(datapag)

        caminhoimg = app.config['DIRECTORY_APP']+app.config['UPLOAD_FOLDER']
        return render_template('layouts/products/products.html',
                                divmsg = msg,
                                urlroot=url,
                                datapag = datapag,
                                tabproducts=result,
                                nextpag=pagination.has_next,
                                prevpag = pagination.has_prev,
                                nextnum = pagination.next_num,
                                pageatual = pagination.page,
                                totpage = pagination.pages,
                                perpage = pagination.per_page,
                                prev_num = pagination.prev_num,
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
