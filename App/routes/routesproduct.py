from flask import Blueprint
from App.views import product
from App.views import helper


routesproduct = Blueprint('routesproduct',__name__)

@routesproduct.route('/add/produto/',methods=['POST'])
def add_product():
    return product.add_product_form()

@routesproduct.route('/produto/<idproduto>/',methods=['GET'])
def get_byid(idproduto):
    return product.get_byid(idproduto)

@routesproduct.route('/update/produto/<idproduto>',methods=['PUT'])
def update_product(idproduto):
    return product.update_product_form(idproduto)

@routesproduct.route('/allprodutos/',methods=['GET'])
@helper.token_required
def get_allproducts(current_user, token):
    return product.get_allproducts(current_user,token)

@routesproduct.route('/produtos/',methods=['GET'])
def get_product_by_desc():
    return product.get_product_by_desc()
