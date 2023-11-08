CREATE DATABASE registro
go
use registro
CREATE TABLE Usuarios (Id INT NOT NULL PRIMARY KEY IDENTITY (1,1), Nombre VARCHAR (155),Appaterno VARCHAR(50),Apmaterno VARCHAR(50), Telefono VARCHAR(100), Email VARCHAR(100),Telalt VARCHAR(100), Estatus INT DEFAULT 1)
DBCC CHECKIDENT ('Usuarios', RESEED, 1);

CREATE PROCEDURE md_GetUsuario(@pEstatus int)
as
SELECT * FROM dbo.Usuarios WHERE Estatus = @pEstatus

CREATE PROCEDURE md_InsertUsuario(@Nombre varchar(155), @Appaterno varchar(155),@Apmaterno varchar(155),@Telefono varchar(155),@Email varchar(155),@Telalt varchar(155))
AS
INSERT INTO Usuarios (Nombre,Appaterno,Apmaterno,Telefono,Email,Telalt) VALUES (@Nombre,@Appaterno,@Apmaterno,@Telefono,@Email,@Telalt)
SELECT MAX(Id) FROM Usuarios

CREATE PROCEDURE md_UpdateUsuario(@Id int, @Nombre varchar(155), @Appaterno varchar(155),@Apmaterno varchar(155),@Telefono varchar(155),@Email varchar(155),@Telalt varchar(155))
AS
UPDATE Usuarios SET Nombre = @Nombre,Appaterno = @Appaterno,Apmaterno = @Apmaterno, Telefono = @Telefono, Email = @Email, Telalt = @Telalt WHERE Id = @Id