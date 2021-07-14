from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate,MigrateCommand
from flask_script import Manager

#import MySQLdb
app = Flask(__name__)
db = SQLAlchemy(app)

#dbmysql = MySQLdb.connect(user="rony",passwd="rony",host="localhost",db="sisnutri",port=3307)
#cursor = dbmysql.cursor()
#cursor.execute('SELECT * FROM atleta')
#data = cursor.fetchall()
#print(data)
#dbmysql.close()
ma = Marshmallow(app)
migrate = Migrate(app,db)
manager = Manager(app)
manager.add_command('db',MigrateCommand)

app.config.from_object('config')
print('Banco de dados:'+app.config['SQLALCHEMY_DATABASE_URI'])
db.init_app(app)


from App.model.atleta import Atleta

from  App.routes.main import main
app.register_blueprint(main)


from App.routes.auth import auth
app.register_blueprint(auth)


from App.routes.routestabalimentos import routestabalimentos
app.register_blueprint(routestabalimentos)


from App.routes.routesrefeicao import routesrefeicao
app.register_blueprint(routesrefeicao)


from App.routes.routesdieta import routesdieta
app.register_blueprint(routesdieta)

from App.routes.routescliente import routesclientes
app.register_blueprint(routesclientes)


from App.routes.routesitemdieta import routesitemdieta
app.register_blueprint(routesitemdieta)


from App.routes.routesproduct import routesproduct
app.register_blueprint(routesproduct)

from App.routes.routesgroupproducts import routesgroupproducts
app.register_blueprint(routesgroupproducts)


from App.routes.routespessoa import routespessoa
app.register_blueprint(routespessoa)


from App.routes.routesvendedor import routesvendedores
app.register_blueprint(routesvendedores)


from App.routes.routesusers import routes
app.register_blueprint(routes)


from App.routes.routesunalimento import routesunalimentos
app.register_blueprint(routesunalimentos)

from App.routes.routesmetaatleta import routesmetaatleta
app.register_blueprint(routesmetaatleta)

from App.routes.routesmagazine import routesmagazine
app.register_blueprint(routesmagazine)


from App.routes.routesatleta import routesatleta
app.register_blueprint(routesatleta)

from App.routes.routesmensagewhatsapp import routesmensagewhatsapp
app.register_blueprint(routesmensagewhatsapp)


from App.routes.routesseveral import routesseveral
app.register_blueprint(routesseveral)


from App.routes.routespackagetrack import routespackagetrack
app.register_blueprint(routespackagetrack)

from App.routes.localidades.routesregiao import routesregiao
app.register_blueprint(routesregiao)

from App.routes.localidades.routesuf import routesuf
app.register_blueprint(routesuf)

from App.routes.localidades.routesmesoregiao import routesmesoregiao
app.register_blueprint(routesmesoregiao)

from App.routes.localidades.routesmicroregiao import routesmicroregiao
app.register_blueprint(routesmicroregiao)

from App.routes.localidades.routes_add_update_IBGE import routesIBGE
app.register_blueprint(routesIBGE)

from App.routes.localidades.routescidades import routescidades
app.register_blueprint(routescidades)

from App.routes.routesenderecos import routesenderecos
app.register_blueprint(routesenderecos)



db.create_all()
