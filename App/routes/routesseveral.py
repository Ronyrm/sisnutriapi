from flask import  Blueprint
from App.views import several,bot_twilio

routesseveral = Blueprint('routesseveral',__name__)

@routesseveral.route('/translate',methods=['GET'])
def translate():
    return several.translate()
@routesseveral.route('/bottwilio',methods=['POST'])
def bottwilio():
    resp = bot_twilio.bottwilio()
    return resp
