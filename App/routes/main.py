from flask import Blueprint, render_template, session
from App.views import main,helper

main = Blueprint('main', __name__)


@main.route('/main/', methods=['GET'])
@helper.token_required
def indexmain(current_user, token):
    if current_user:
        from App.model import users
        user = users.user_schema.dump(current_user)
        session['current_user'] = user
        return render_template('layouts/index.html',current_user=current_user,token=token)

@main.route('/', methods=['GET'])
def index():
    user = {}
    session['current_user'] = user
    return render_template('layouts/index.html',current_user=user,token='')



@main.route('/login')
def login():
    return render_template('layouts/login.html')


