import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Estilo de DataTable
import $ from 'jquery'; // Importa jQuery
import DataTable from 'datatables.net-dt';

class TablaUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
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

  render() {
    return (
      <div>
        <h2>Empleados registrados</h2>
        <table className="table table-striped table-bordered" ref={this.tableRef}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Teléfono Alternativo</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TablaUsuarios;
