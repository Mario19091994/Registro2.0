import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

function FormularioInsertarDatos({ cerrarModal, insertarDatos }) {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    // Define aquí los campos de tu formulario y sus valores iniciales
    Nombre: '',
    Appaterno: '',
    Apmaterno: '',
    Telefono: '',
    Email: '',
    Telalt: '',
  });

  const [estadoEnvio, setEstadoEnvio] = useState(null);
  const [resultado, setResultado] = useState('');

  const handleClose = () => {
    setShow(false);
    cerrarModal();
  };

  const handleInsertarDatos = () => {
    const camposRequeridos = ["Nombre", "Appaterno", "Apmaterno", "Telefono", "Email", "Telalt"];
    const camposInvalidos = camposRequeridos.filter((campo) => !formData[campo]);
  
    if (camposInvalidos.length > 0) {
      Swal.fire('Rellena todos los campos', '', 'warning');
      return;
    }
    setEstadoEnvio('pending'); // Marcar la solicitud como pendiente
  
    // Realizar una solicitud POST a tu API, nota: revisar la direccion url del api
    fetch('http://127.0.0.1:5000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error de conexión');
        }
        return response.json();
      })
      .then((data) => {
        // La solicitud se completó con éxito, actualiza el estado
        setEstadoEnvio('completed');
        insertarDatos(formData); // Llama a la función para actualizar la tabla
        handleClose(); // Cierra el modal
        Swal.fire('Datos insertados correctamente', `Nombre: ${formData.Nombre} ${formData.Appaterno} ${formData.Apmaterno}`, 'success').then(() => {
          window.location.reload(); // Recarga la página después de cerrar la alerta
        });
      })
      .catch((error) => {
        setEstadoEnvio('error');
        setResultado('Hubo un problema al insertar los datos: ' + error.message);
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Insertar Datos</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form>
         <div className="form-group">
  <label>Nombre</label>
  <input
    type="text"
    name="Nombre"
    value={formData.Nombre}
    onChange={handleChange}
    className="form-control"
    placeholder="Escribe el nombre"
    required
  />
</div>
<div className="form-group">
  <label>Apellido Paterno</label>
  <input
    type="text"
    name="Appaterno"
    value={formData.Appaterno}
    onChange={handleChange}
    className="form-control"
    placeholder="Escribe el apellido paterno"
    required
  />
</div>
<div className="form-group">
  <label>Apellido Materno</label>
  <input
    type="text"
    name="Apmaterno"
    value={formData.Apmaterno}
    onChange={handleChange}
    className="form-control"
    placeholder="Escribe el apellido materno"
    required
  />
</div>
<div className="form-group">
  <label>Teléfono</label>
  <input
    type="number"
    name="Telefono"
    value={formData.Telefono}
    onChange={handleChange}
    className="form-control"
    placeholder="Teléfono"
    required
  />
</div>
<div className="form-group">
  <label>Email</label>
  <input
    type="email"
    name="Email"
    value={formData.Email}
    onChange={handleChange}
    className="form-control"
    placeholder="Email"
    required
  />
</div>
<div className="form-group">
  <label>Teléfono alternativo</label>
  <input
    type="number"
    name="Telalt"
    value={formData.Telalt}
    onChange={handleChange}
    className="form-control"
    placeholder="Teléfono alternativo"
    required
  />
</div>
        </form>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleInsertarDatos}>
          Registrar datos
        </Button>
      </Modal.Footer>
      {estadoEnvio === 'completed' && (
        <p className="text-success">{resultado}</p>
      )}
      {estadoEnvio === 'error' && (
        <p className="text-danger">{resultado}</p>
      )}
    </Modal>
  );
}

export default FormularioInsertarDatos;
