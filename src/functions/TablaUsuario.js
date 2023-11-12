import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Estilo de DataTable
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import $ from 'jquery'; // Importa jQuery
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';

class TablaUsuarios extends Component {
    constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      usuarioSeleccionado: {
        Id: '',
        Nombre: '',
        Appaterno: '',
        Apmaterno: '',
        Telefono: '',
        Email: '',
        Telalt: '',
      },
      modalVisible: false,
    };
    this.tableRef = React.createRef();
    this.dataTable = null;
  }

  componentDidMount() {
    /*el url del fetch cambia con respecto a la url donde se corre el api, 
    checarlo con la url que te dan al correr el api de python, 
    por ejemplo: Running on http://127.0.0.1:5000,
    es lo que me da de resultado al correr el api de python.*/
    fetch('http://127.0.0.1:5000/usuarios?status=1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error de conexion');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ usuarios: data.response.data }, () => {
          this.initDataTable();
        });
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
      
  }
  //Se ponen los datos de datatable en español
  initDataTable() {
    if (!this.dataTable) {
      this.dataTable = $(this.tableRef.current).DataTable({
        language: {
          search: 'Buscar:',
          lengthMenu: 'Mostrar _MENU_ entradas por página',
          info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
          infoEmpty: 'Mostrando 0 a 0 de 0 entradas',
          infoFiltered: '(filtrado de _MAX_ entradas totales)',
          zeroRecords: 'No se encontraron resultados',
          emptyTable: 'No hay datos disponibles en la tabla',
          paginate: {
            first: 'Primero',
            previous: 'Anterior',
            next: 'Siguiente',
            last: 'Último',
          },
        },
      // Define la configuración para ocultar la columna del ID
      columnDefs: [
        {
          targets: 0, // Índice de la columna del ID (0 basado en cero)
          visible: false, // Oculta la columna
        },
      ],
      });
    }
  }

  handleEditar(usuario) {
    this.setState({ usuarioSeleccionado: usuario, modalVisible: true });
  }

  handleInputChange(event, fieldName) {
    const { value } = event.target;
    this.setState((prevState) => ({
      usuarioSeleccionado: {
        ...prevState.usuarioSeleccionado,
        [fieldName]: value,
      },
    }));
  }

  handleCloseModal = async () => {
      // Cierra el modal y restablece el usuario seleccionado
      this.setState({ modalVisible: false, usuarioSeleccionado: null });
    };
    handleActualizarDatos = async () => {
      const { usuarioSeleccionado } = this.state;
    
      try {
        const response = await fetch('http://127.0.0.1:5000/usuarios', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuarioSeleccionado),
        });
    
        if (!response.ok) {
          throw new Error('Error al actualizar datos');
        }
        // Cierra el modal y restablece el usuario seleccionado
        this.setState({ modalVisible: false, usuarioSeleccionado: null });
        // SweetAlert para mostrar mensaje de datos actualizados
        await Swal.fire({
          title: "Datos Actualizados",
          text: `Nombre: ${usuarioSeleccionado.Nombre} ${usuarioSeleccionado.Appaterno} ${usuarioSeleccionado.Apmaterno}`,
          icon: "success",
        });
    
        // Recargar la página después de cerrar la alerta
        window.location.reload();
    
    
      } catch (error) {
        console.error('Error al actualizar datos:', error);
      }
    };
    
    
    
  render() {
    const { usuarios, usuarioSeleccionado, modalVisible } = this.state;
    return (
      <Container fluid>
      <div>
        <h2>Empleados registrados</h2>
        <Modal show={modalVisible} onHide={this.handleCloseModal} dialogClassName="modal-responsive">
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
      <div className="form-group row">
        <div className="col-sm-6">
          <input type="hidden" className="form-control" value={usuarioSeleccionado?.Id} readOnly />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Nombre:</label>
        <div className="col-sm-6">
          <input   type="text"
          className="form-control"
          value={usuarioSeleccionado?.Nombre}
          onChange={(e) => this.handleInputChange(e, 'Nombre')}/>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Apellido Paterno:</label>
        <div className="col-sm-6">
          <input   type="text"
          className="form-control"
          value={usuarioSeleccionado?.Appaterno}
          onChange={(e) => this.handleInputChange(e, 'Appaterno')}/>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Apellido Materno:</label>
        <div className="col-sm-6">
        <input   type="text"
          className="form-control"
          value={usuarioSeleccionado?.Apmaterno}
          onChange={(e) => this.handleInputChange(e, 'Apmaterno')}/>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Teléfono:</label>
        <div className="col-sm-6">
        <input   type="number"
          className="form-control"
          value={usuarioSeleccionado?.Telefono}
          onChange={(e) => this.handleInputChange(e, 'Telefono')}/>        
          </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Email:</label>
        <div className="col-sm-6">
        <input   type="email"
          className="form-control"
          value={usuarioSeleccionado?.Email}
          onChange={(e) => this.handleInputChange(e, 'Email')}/>         
          </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Teléfono Alternativo:</label>
        <div className="col-sm-6">
        <input   type="number"
          className="form-control"
          value={usuarioSeleccionado?.Telalt}
          onChange={(e) => this.handleInputChange(e, 'Telalt')}/>         
          </div>
      </div>
    </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.handleActualizarDatos}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
        <table className="table table-striped table-bordered table-responsive" ref={this.tableRef}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Teléfono Alternativo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usuarios.map((usuario) => (
                <tr key={usuario.Id}>
                <td>{usuario.Id}</td>
                <td>{usuario.Nombre}</td>
                <td>{usuario.Appaterno}</td>
                <td>{usuario.Apmaterno}</td>
                <td>{usuario.Telefono}</td>
                <td>{usuario.Email}</td>
                <td>{usuario.Telalt}</td>
                <td>
                <Button variant="warning" onClick={() => this.handleEditar(usuario)}>Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Container>
    );
  }
}

export default TablaUsuarios;
