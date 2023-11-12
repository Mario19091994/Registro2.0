import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import TablaUsuarios from './functions/TablaUsuario';
import FormularioInsertarDatos from './functions/FormularioInsertarDatos';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const abrirModal = () => {
    setMostrarFormulario(true);
  };

  const cerrarModal = () => {
    setMostrarFormulario(false);
  };

  return (
    <Container fluid>
      <div>
        <TablaUsuarios></TablaUsuarios>
        <Button variant="primary" type="submit" onClick={abrirModal}>Insertar nuevo empleado</Button>
        {mostrarFormulario && (
          <FormularioInsertarDatos
            cerrarModal={cerrarModal}
            insertarDatos={(datos) => {}}
          />
        )}
      </div>
    </Container>
  );
}

export default App;
