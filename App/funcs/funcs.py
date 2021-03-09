import datetime
import json
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