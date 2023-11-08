
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
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
    <div>
      <TablaUsuarios></TablaUsuarios>
      <Button variant="primary" type="submit" onClick={abrirModal}>Insertar nuevo empleado</Button>
      {mostrarFormulario && (
        <FormularioInsertarDatos
        cerrarModal={cerrarModal}
        insertarDatos={(datos) => {}}/>
      )}
    </div>
  );
}

export default App;
