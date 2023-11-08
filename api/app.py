from flask import Flask,jsonify
from flask_restful import Resource, Api,abort
from apispec import APISpec
from marshmallow import Schema, fields
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec.extension import FlaskApiSpec
from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, doc, use_kwargs
from schemas.schemas import *
from flask_cors import CORS
from config import get_db_connection
# ejecuta primero: env\Scripts\activate
# luego ejecutas el comando flask run o python app.py, depnede del que quieras, ambos ejecutan el api
app = Flask(__name__)  # Flask app instance initiated
api = Api(app)  # Flask restful wraps Flask app around it.
CORS(app)
app.config.update({
    'APISPEC_SPEC': APISpec(
        title='API De registro de usuarios',
        version='v1',
        plugins=[MarshmallowPlugin()],
        openapi_version='2.0.0'
    ),
    'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON
    'APISPEC_SWAGGER_UI_URL': '/swagger-ui/'  # URI to access UI of API Doc
})
docs = FlaskApiSpec(app)

cnxn = get_db_connection()
#Clase para usuarios
#  Restful way of creating APIs through Flask Restful
class UsuariosAPI(MethodResource, Resource):
    @doc(description='Obtener Lista de Usuarios.', tags=['usuarios'])
    @use_kwargs(GetRequestUsuariosSchema, location=('query'))
    @marshal_with(AwesomeResponseSchema)  # marshalling
    def get(self,**kwargs):
         # obtener los parámetros de la petición
            status = kwargs.get('status')

            # llamar al procedimiento almacenado
            cursor = cnxn.cursor()
            #Manda el valor a la siguiente query
            cursor.execute("exec md_GetUsuario @pEstatus = ?",status)
            #Pone los resultados en la variable
            usuarios=[]
            #Enlistas los resultados
            resultados = cursor.fetchall()
            #Por cada ciclo va guardando los datos en una fila
            for row in resultados:
                #hacemos un objeto que va guardando los datos
                usuario = {'Id': row.Id, 'Nombre': row.Nombre,'Appaterno': row.Appaterno, 'Apmaterno': row.Apmaterno, 'Telefono':row.Telefono, 'Email':row.Email, 'Telalt':row.Telalt}
                usuarios.append(usuario)
            response={
                "statusCode":201,
                "success":True,
                "message":"Datos Cargados con exito",
                "response":{
                    "data":usuarios
                }
            }
            
            # retornar los resultados en formato JSON
            return jsonify(response)
    
    @doc(description='Insertar usuarios.', tags=['usuarios'])
    @use_kwargs(PostUsuarioSchema, location=('json'))
    @marshal_with(AwesomeResponseSchema)  # marshalling
    def post(self, **kwargs):
         # obtener los parámetros de la petición
            Nombre = kwargs.get('Nombre')
            Appaterno = kwargs.get('Appaterno')
            Apmaterno = kwargs.get('Apmaterno')
            Telefono = kwargs.get('Telefono')
            Email = kwargs.get('Email')
            Telalt = kwargs.get('Telalt')
            cursor = cnxn.cursor()
            #valores que se van a insertar
            cursor.execute("exec md_InsertUsuario  @Nombre = ?,@Appaterno = ?, @Apmaterno = ?, @Telefono = ?, @Email = ?, @Telalt = ?", Nombre, Appaterno, Apmaterno,Telefono,Email,Telalt )
            resultados = cursor.fetchone()[0]
            cursor.commit()
            response = {
                   "statusCode": 200,
                   "success": True,
                   "message": "Datos Cargados con exito",
                   "response": {
                        "data": resultados
                   }}
            
            return jsonify(response)
    
    @doc(description='Modificar usuario.', tags=['usuarios'])
    @use_kwargs(PutRequestUsuariosSchema, location=('json'))
    @marshal_with(AwesomeResponseSchema)  # marshalling
    #usamos put para update valores trabajo pendiente por hacer en el api
    def put (self, **kwargs):
         # obtener los parámetros de la petición
            Id = kwargs.get('Id')
            Nombre = kwargs.get('Nombre')
            Appaterno = kwargs.get('Appaterno')
            Apmaterno = kwargs.get('Apmaterno')
            Telefono = kwargs.get('Telefono')
            Email = kwargs.get('Email')
            Telalt = kwargs.get('Telalt')

            cursor = cnxn.cursor()
            #valores que se van a actualizar, se executa el store
            cursor.execute("EXEC md_UpdateUsuario @Id = ?, @Nombre = ?,@Appaterno = ?, @Apmaterno = ?, @Telefono = ?, @Email = ?, @Telalt = ?", Id, Nombre, Appaterno, Apmaterno,Telefono,Email,Telalt )
           # resultados = cursor.fetchone()[0]
            cursor.commit()
            response = {
                   "statusCode": 200,
                   "success": True,
                   "message": "Datos Cargados con exito",
                   "response": {
                        "data": ""
                   }}
            
            return jsonify(response)
api.add_resource(UsuariosAPI, '/usuarios')
docs.register(UsuariosAPI)
#Clase Usuarios
#########################################################################
if __name__ == '__main__':
    app.run(debug=True)