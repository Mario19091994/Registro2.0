from marshmallow import Schema, fields

class AwesomeResponseSchema(Schema):
    message = fields.Str(default='Success')

# Shemas Usuarios

class GetRequestUsuariosSchema(Schema):
    status = fields.Int(required=True)

class PostUsuarioSchema(Schema):
    Nombre = fields.String(required=True)
    Appaterno = fields.String(required=True)
    Apmaterno = fields.String(required=True)
    Telefono = fields.String(required=True)
    Email = fields.String(required=True)
    Telalt = fields.String(required=True)

class PutRequestUsuariosSchema(Schema):
    Id = fields.Int(required=True)
    Nombre = fields.String(required=True)
    Appaterno = fields.String(required=True)
    Apmaterno = fields.String(required=True)
    Telefono = fields.String(required=True)
    Email = fields.String(required=True)
    Telalt = fields.String(required=True)