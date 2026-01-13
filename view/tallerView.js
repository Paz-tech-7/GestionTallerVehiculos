//Programa que genera la vista en funcion de los datos que el modelo ya ha validado con posterioridad

export class TallerView {
  constructor() {
    this.tablaBody = document.getElementById('listVehiculos__table');
    this.contenedorTabla = document.getElementById('vehiculos');
    this.selectMatriculas = document.getElementById('repair-matricula');
    this.formReg = document.getElementById('vehicleRegisterForm');
    this.formRep = document.getElementById('vehicleRepairForm');
  }

  renderTabla(lista) {
    this.contenedorTabla.classList.add('card-listVehiculos--active');
    let tbody = this.tablaBody.querySelector('tbody');
    tbody.innerHTML = '';

    lista.forEach((v) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${v.matricula}</td>
                <td>${v.marca}</td>
                <td>${v.modelo}</td>
                <td>${v.anho}</td>
                <td>${v.nombreCliente}</td>
                <td>${v.estado}</td>
                <td>${v.averiaReal || 'N/A'}</td>
                <td>${
                  v.estado === 'Arreglado'
                    ? `<button class="btn-entregar" data-id="${v.matricula}">Entregar</button>`
                    : ''
                }</td>
            `;
      tbody.appendChild(row);
    });
    this.tablaBody.appendChild(tbody);
  }

  updateSelect(lista) {
    const pendientes = lista.filter((v) => v.estado === 'Para arreglar');
    this.selectMatriculas.innerHTML = pendientes.length
      ? pendientes
          .map((v) => `<option value="${v.matricula}">${v.matricula}</option>`)
          .join('')
      : '<option value="">Sin pendientes</option>';
  }

  showModal(id, open = true) {
    const modal = document.getElementById(id);
    open
      ? modal.classList.add('modal--active')
      : modal.classList.remove('modal--active');
  }
}
