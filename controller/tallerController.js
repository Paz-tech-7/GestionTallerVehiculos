//Programa que establece la comunicacion entre el modelo y la vista y le dara vida a mi programa
export class TallerController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initEvents();
  }

  initEvents() {
    // Eventos de botones (Manejadores de eventos)
    document
      .getElementById('openRegister')
      .addEventListener('click', () => this.view.showModal('registerModal'));
    document.getElementById('openRepair').addEventListener('click', () => {
      const pendientes = this.model.getLista('Para arreglar');
      this.view.updateSelect(pendientes);
      this.view.showModal('repairModal', true);
    });

    document
      .getElementById('closeRegister')
      .addEventListener('click', () =>
        this.view.showModal('registerModal', false)
      );
    document
      .getElementById('closeRepair')
      .addEventListener('click', () =>
        this.view.showModal('repairModal', false)
      );

    this.view.formReg.addEventListener('submit', (e) => this.handleReg(e));
    this.view.formRep.addEventListener('submit', (e) => this.handleRep(e));

    document
      .getElementById('listBtn')
      .addEventListener('click', () => this.refrescarTabla());

    document.getElementById('filterBtn').addEventListener('click', () => {
      this.handleFiltrado();
    });

    this.view.tablaBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-entregar')) {
        this.model.entregarVehiculo(e.target.dataset.id);
        this.view.renderTabla(this.model.getLista());
      }
    });
  }
  refrescarTabla() {
    const lista = this.model.getLista();
    this.view.renderTabla(lista);
  }
  handleReg(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      this.model.agregarVehiculo({
        matricula: data.get('matricula').toUpperCase(),
        marca: data.get('marca'),
        modelo: data.get('modelo'),
        anho: data.get('year'),
        nombreCliente: data.get('cliente'),
        telefono: data.get('telefono'),
        problemaCliente: data.get('problema'),
        estado: 'Para arreglar',
      });
      this.view.showModal('registerModal', false);
      e.target.reset();
    } catch (err) {
      alert(err.message);
    }
  }

  handleRep(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      this.model.repararVehiculo(data.get('repairMatricula'), {
        averiaReal: data.get('averiaReal'),
        mecanico: data.get('mecanico'),
        precio: data.get('precio'),
      });
      this.view.showModal('repairModal', false);
      this.view.renderTabla(this.model.getLista());
    } catch (err) {
      alert(err.message);
    }
  }
  handleFiltrado() {
    const selector = document.getElementById('filterState');
    const estadoSeleccionado = selector.value;

    try {
      const listaFiltrada = this.model.getLista(estadoSeleccionado);

      if (listaFiltrada.length === 0 && estadoSeleccionado !== '') {
        alert(`No hay vehículos registrados como: ${estadoSeleccionado}`);
      }

      this.view.renderTabla(listaFiltrada);
    } catch (error) {
      alert(error.message);
    }
  }
}
