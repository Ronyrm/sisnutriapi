import datetime
import math
import json

# Gera chave aleatoria
def gera_keyacess():
    import string
    import random
    random_str = string.ascii_letters + string.digits + string.ascii_uppercase
    return ''.join(random.choice(random_str) for i in range(20))


# Funcao Retorna Idade
def retorna_idade(ano,mes,dia):
    d1 = datetime.datetime(ano,mes,dia)
    d2 = datetime.datetime.now()
    diff = d2-d1
    idade = diff.days/365
    return math.trunc(idade)

def verificexistscampjson(camp,Numeric=True):
    try:
        return camp
    except:
        if Numeric:
            return '0'
        return ''


def dt_parser(dt):
    if isinstance(dt, type(datetime)):
        return dt.isoformat()


def formatdatetime_parser(dt):
    return dt.isoformat()


class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        try:
            return super().default(obj)
        except TypeError:
            return str(obj)

def returnPagination(pagination):
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

    return json.loads(datapag)

