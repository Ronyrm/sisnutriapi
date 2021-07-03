from flask import  Blueprint
from App.views import several,bot_twilio
from flask import  jsonify,request

routesseveral = Blueprint('routesseveral',__name__)

@routesseveral.route('/translate',methods=['GET'])
def translate():
    return several.translate()
@routesseveral.route('/bottwilio',methods=['POST'])
def bottwilio():
    resp = bot_twilio.bottwilio()
    return resp
@routesseveral.route('/datacep/<cep>',methods=['GET'])
def soma(cep):
    import asyncio
    val = asyncio.run(several.soma(cep))
    return val


# SMS TWILIO - INCOMPLETO FALTA TESTE
@routesseveral.route('/sendsms/twilio',methods=['POST'])
def sendsms_twilio():
    if request.method == 'POST':
        data = request.form
        msgsms = data['msgsms']
        phone = data['phone']
        several.sendsms_twilio(msgsms,phone)


# BUSCA RASTREAMENTO CORREIOS
@routesseveral.route('/get/tracker/correios',methods=['POST'])
def trackercorreios():
    from App.views.several import search_tracker_correios
    if request.method == 'POST':
        data = request.form
        return jsonify(search_tracker_correios(data['codigo']))

