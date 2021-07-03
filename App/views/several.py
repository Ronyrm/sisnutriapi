import requests
from bs4 import BeautifulSoup
import asyncio
import re


# -------------------------- BUSCA DADOS TEMPERATURA POR LONGITUDE E LATITUDE --------------------------
def search_dados_temperatura_lat_lon(lat,lon,units):
    chavekey='078e25e1759b62d7d25ad0f48217d730'

    url = f'https://api.openweathermap.org/data/2.5/weather?units={units}&lat={lat}&lon={lon}&appid={chavekey}'
    print(url)
    req = requests.get(url)
    try:
        return req.json()
    except:
        return None

    #try:
    #    import pyowm
    #    owm = pyowm.OWM(chavekey)
    #    obs = owm.weather_at_place('Muriaé,BR')
    #    return obs.get_weather()
    #except:
    #    return None


# -------------------------- BUSCA DADOS TEMPERATURA POR CIDADE,UF --------------------------
def search_dados_temperatura_city(city, units):
    chavekey = '078e25e1759b62d7d25ad0f48217d730'

    url = f'https://api.openweathermap.org/data/2.5/weather?units={units}&q={city}&appid={chavekey}'
    print(url)
    req = requests.get(url)
    try:
        return req.json()
    except:
        return None


# -------------------------- BUSCA DADOS LATITUDE E LONGITUDE --------------------------
def search_latitude_longitude(strcyte):
    from geopy import Nominatim
    geolocator = Nominatim(user_agent="sisnutri")
    try:
        return  geolocator.geocode(strcyte)
    except:
        return None


# -------------------------- RASTREIA OBJETO DOS CORREIOS VIA CODIGO = RETURN JSON --------------------------
def search_tracker_correios(codigo):
    from App.views.packagetrack import update_status_track
    req = requests.post('https://www2.correios.com.br/sistemas/rastreamento/ctrl/ctrlRastreamento.cfm?',
                        data={'objetos': codigo})

    soup = BeautifulSoup(req.text, 'html.parser')
    i = 0
    data = {}

    soupinfo = soup.find(attrs={"class": "info alert"})
    if soupinfo != None:
        text = re.sub('\n', " ", soupinfo.text)
        text = re.sub('\r', ' ', text)
        text = re.sub('\t', ' ', text)
        newdict = {0: text.strip()+' Ou código inválido!'}
        data.update(newdict)
        update_status_track(codigo, 'N')
        return {'data': data,'tot':1}

    for soupchildren in soup.find_all(attrs={"class": "listEvent sro"}):
        j = 1
        newdict = {i:{}}
        for td in soupchildren.find_all("td"):
            newdict[i].update({j:{}})

            text = re.sub('\n'," ",td.text)
            text = re.sub('\r',' ',text)
            text = re.sub('\t', ' ', text)

            text = re.sub('       ',' - ',text)
            text = re.sub('Clique aqui Minhas Importações',' ',text)
            text = re.sub('Informar nº do documento para a fiscalização e entrega do seu objeto',
                          '<br>Caso não informou o nº do documento <a target="_blank" href="https://www2.correios.com.br/sistemas/rastreamento/default.cfm?objetos='+codigo+'">Clique Aqui</a>',text)
            newdict[i][j] = text
            j+=1
        data.update(newdict)


        i+=1
    import json
    tot = len(data)

    if data[0][2].strip() == ' Objeto entregue ao destinatário  '.strip():
        update_status_track(codigo,'E')
    else:
        update_status_track(codigo, 'P')

    return {'data':data,'tot':tot}


# -------------------------- TRADUZ DETERMINADO TEXTO EM INGLES OU VICE-VERSA EM PORTUGUES = RETURN JSON --------------------------
def translate(txttranslate):
    from googletrans import Translator, constants

    translator = Translator()
    detect = translator.detect(txttranslate)
    if detect.lang=='en':
        dest = 'pt'
    else:
        dest = 'en'
    translation = translator.translate(txttranslate,dest=dest)
    strjson = '{"src":"'+translation.src+'", "dest":"'+translation.dest+'", "origin":"'+translation.origin+'", ' \
            '"traducao":"'+translation.text+'"}'
    return strjson


# -------------------------- BUSCA DADOS LOCALIDADE DE ACORDO COM O CEP INFORMADO = RETURN JSON --------------------------
def busca_dados_CEP(cep):
    ceporg = re.sub('[^a-zA-Z0-9 \n\.]', '', cep)
    req = requests.get('https://viacep.com.br/ws/'+ceporg+'/json/')
    if req.status_code==200:
        data = req.json()
    else:
        data = {'erro':True}
    return data

async def soma(ceporg):
    req = requests.get('https://viacep.com.br/ws/'+ceporg+'/json/')
    if req.status_code == 200:
        data = req.json()
    else:
        data = {'erro': True}
    return data

def sendsms_twilio(msgsms,phone):
    from config import TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN
    from twilio.rest import Client

    account_sid = TWILIO_ACCOUNT_SID
    auth_token = TWILIO_AUTH_TOKEN
    client = Client(account_sid, auth_token)
    mensagem = client.messages.create(to=phone,
                                      from_='+5532984422783',
                                      body=msgsms)
    result = mensagem.sid()
    return  result
