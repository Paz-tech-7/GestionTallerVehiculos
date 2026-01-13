//Archivo que tendra toda la logica de negocio, validaciones de mi programa

export class TallerModel {
  constructor() {
    const datosRecuperados = localStorage.getItem('vehiculos_taller');
    this.vehiculos = datosRecuperados ? JSON.parse(datosRecuperados) : [];
  }

  validarMatricula(matricula) {
    //Matricula con 7 caracteres
    if (matricula.length !== 7) return false;

    let contadorNumeros = 0;
    let contadorLetras = 0;

    //Forma en la que opte para validar la matricula con las dos opciones
    for (let caracter of matricula) {
      if (caracter >= '0' && caracter <= '9') {
        contadorNumeros++;
      } else if (
        (caracter >= 'A' && caracter <= 'Z') ||
        (caracter >= 'a' && caracter <= 'z')
      ) {
        contadorLetras++;
      }
    }
    const opcionA = contadorNumeros === 4 && contadorLetras === 3;
    const opcionB = contadorNumeros === 3 && contadorLetras === 4;

    return opcionA || opcionB;
  }
  guardarEnLocalStorage() {
    localStorage.setItem('vehiculos_taller', JSON.stringify(this.vehiculos));
  }
  agregarVehiculo(vehiculo) {
    if (
      !vehiculo.matricula ||
      !vehiculo.marca ||
      !vehiculo.modelo ||
      !vehiculo.anho ||
      !vehiculo.nombreCliente ||
      !vehiculo.telefono ||
      !vehiculo.problemaCliente
    ) {
      throw new Error('Todos los campos deben estar rellenados.');
    }
    //Matricula de vehiculo, repetida siempre y cuando tenga un estado distinto a recogido
    const estaEnTaller = this.vehiculos.some(
      (v) => v.matricula === vehiculo.matricula && v.estado !== 'Recogido'
    );

    if (estaEnTaller) {
      throw new Error(
        `El vehículo ${vehiculo.matricula} ya está en el taller pendiente de reparación o entrega.`
      );
    }

    const anioActual = new Date().getFullYear();
    if (
      parseInt(vehiculo.anho) < 1900 ||
      parseInt(vehiculo.anho) > anioActual
    ) {
      throw new Error(`El año debe estar entre 1900 y ${anioActual}.`);
    }

    this.vehiculos.push(vehiculo);
    this.guardarEnLocalStorage();
  }

  repararVehiculo(matricula, datos) {
    const vehiculo = this.vehiculos.find(
      (v) => v.matricula === matricula && v.estado === 'Para arreglar'
    );

    if (!vehiculo) {
      throw new Error(
        'No se encontró ningún registro pendiente de reparación para esta matrícula.'
      );
    }

    if (!datos.averiaReal || !datos.mecanico || parseFloat(datos.precio) <= 0) {
      throw new Error('Datos de reparación incompletos o precio inválido.');
    }

    Object.assign(vehiculo, datos, { estado: 'Arreglado' });
    this.guardarEnLocalStorage();
  }

  entregarVehiculo(matricula) {
    const vehiculo = this.vehiculos.find(
      (v) => v.matricula === matricula && v.estado === 'Arreglado'
    );

    if (!vehiculo) {
      throw new Error(
        'Este vehículo no tiene una reparación finalizada pendiente de entrega.'
      );
    }

    vehiculo.estado = 'Recogido';
    this.guardarEnLocalStorage();
  }

  getLista(filtro = null) {
    if (!filtro || filtro === '') {
      return this.vehiculos;
    }
    return this.vehiculos.filter((v) => v.estado === filtro);
  }
}
