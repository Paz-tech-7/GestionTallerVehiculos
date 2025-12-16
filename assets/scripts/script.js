/**
 * -------------------------------------
 *      Array global de objetos
 * -------------------------------------
 */
let vehiculos = [];


/**------------------------------
 *       Clase Vehiculo
 * -------------------------------
 */

class Vehiculo {
    constructor(matricula, marca, modelo, anho, nombreCliente, telefonocliente, problemaCliente) {
        this.matricula = matricula;
        this.marca = marca;
        this.modelo = modelo;
        this.anho = anho;
        this.nombreCliente = nombreCliente;
        this.telefonocliente = telefonocliente;
        this.problemaCliente = problemaCliente;
        this.averiaReal;
        this.precioReparacion;
        this.mecanico;
        this.estado = "Para arreglar";
    }
}

/**
 * ----------------------------------
 *      Evento Global
 * ----------------------------------
*/

document.addEventListener('DOMContentLoaded', function () {
    /**
     * ----------------------------------
     *      Constantes y Variables
     * ---------------------------------
    */
    const claseModalActivo = "modal--active";

    /**
     * -------------------------------------------------
     *       Variables globales (Elementos del DOM)
     * -------------------------------------------------
    */
    const modalregistro = document.getElementById("registerModal");
    const modalReparacion = document.getElementById("repairModal");
    const formularioRegistro = document.getElementById("vehicleRegisterForm");
    const formularioReparar = document.getElementById("vehicleRepairForm");
    const selectMatriculas = document.getElementById("repair-matricula");

    /**
     * --------------------------
     *         Botones
     * --------------------------
    */
    const mostrarRegistroBtn = document.getElementById("openRegister");
    const mostrarRepararBtn = document.getElementById("openRepair");
    const cerrarRegistroBtn = document.getElementById("closeRegister");
    const cerrarRepararBtn = document.getElementById("closeRepair");



    /**
     * ----------------------------------------
     *      Registrar Vehiculo
     * ----------------------------------------
    */
    function registrarVehiculo() {
        let matriculaEnviada = formularioRegistro.matricula.value;
        let marcaEnviada = formularioRegistro.marca.value;
        let modeloEnviado = formularioRegistro.modelo.value;
        let anhoEnviado = formularioRegistro.year.value;
        let clienteEnviado = formularioRegistro.cliente.value;
        let telefonoEnviado = formularioRegistro.telefono.value;
        let fallaEnviada = formularioRegistro.problema.value;

        const vehiculoRegistrado = new Vehiculo(matriculaEnviada, marcaEnviada, modeloEnviado, anhoEnviado, clienteEnviado, telefonoEnviado, fallaEnviada);

        vehiculos.push(vehiculoRegistrado);
    }


    /**
     * ----------------------------- 
     *       Reparar Vehiculos
     * -----------------------------
    */
    function repararVehiculo(matricula, averia_real, precio, mecanico) {
        let vehiculo = vehiculos.find(v => v.matricula === matricula);
        vehiculo.averiaReal = averia_real;
        vehiculo.precioReparacion = precio;
        vehiculo.mecanico = mecanico;
        vehiculo.estado = "Arreglado";
    }

    /**
     * -----------------------------
     *      Actualizar options
     * ----------------------------- 
    */
    function actualizarOpciones() {
        console.log(vehiculos);
        if (vehiculos.length !== 0) {
            let matriculas = vehiculos.map(vehiculo => {
                return vehiculo.estado !== "Arreglado" ? `<option value="${vehiculo.matricula}">${vehiculo.matricula}</option>` : `<option value="0">No existen vehiculos</option>`;
            })
            selectMatriculas.innerHTML = matriculas.join('');
        }
        else {
            selectMatriculas.innerHTML = `<option value="0">No existen vehiculos</option>`
            return;
        }
    }

    /**
     * -----------------------------
     *      Vaciar formularios
     * -----------------------------
    */
    function formatearRegistro() {
        formularioRegistro.reset();
    }

    function formatearReparacion() {
        formularioReparar.reset()
    }
    /**
     * -----------------------------
     *           EVENTOS
     * -----------------------------
    */

    mostrarRegistroBtn.addEventListener("click", function () {
        modalregistro.classList.add(claseModalActivo);
    });

    cerrarRegistroBtn.addEventListener("click", function () {
        modalregistro.classList.remove(claseModalActivo);
    })

    mostrarRepararBtn.addEventListener("click", function () {
        modalReparacion.classList.add(claseModalActivo);
        actualizarOpciones();
    })

    cerrarRepararBtn.addEventListener("click", function () {
        modalReparacion.classList.remove(claseModalActivo);
    })

    formularioRegistro.addEventListener("submit", function (e) {
        e.preventDefault();
        registrarVehiculo();
        modalregistro.classList.remove(claseModalActivo);
        formatearRegistro();
    });

    formularioReparar.addEventListener("submit", function (e) {
        e.preventDefault();
        let matricula = formularioReparar.repairMatricula.value;
        let averiaReal = formularioReparar.averiaReal.value;
        let mecanico = formularioReparar.mecanico.value;
        let precioReparacion = formularioReparar.precio.value;
        console.log(averiaReal)
        repararVehiculo(matricula, averiaReal, precioReparacion, mecanico);
        modalReparacion.classList.remove(claseModalActivo);
    });

})
