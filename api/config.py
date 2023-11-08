import pyodbc

def get_db_connection():
  server = 'localhost'
  database = 'registro'
  username = 'MARIO19'
  password = '12345'

  cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+password)
  return cnxn