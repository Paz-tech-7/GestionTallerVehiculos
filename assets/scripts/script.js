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
     * 
     * 
     * 
    */
    const claseModalActivo = "modal--active";

    /**
     * -------------------------------------------------
     *       Variables globales (Elementos del DOM)
     * -------------------------------------------------
    */
    const modalregistro = document.getElementById("register-modal");
    const modalReparacion = document.getElementById("repair-modal");
    const formularioRegistro = document.getElementById("vehicle-registration-form");
    const formularioReparar = document.getElementById("vehicle-repair-form");
    const selectMatriculas = document.getElementById("repair-matricula");

    /**
     * --------------------------
     *         Botones
     * --------------------------
    */
    const mostrarRegistroBtn = document.getElementById("open-register-modal");
    const mostrarRepararBtn = document.getElementById("open-repair-modal");
    const cerrarRegistroBtn = document.getElementById("close-register-modal");
    const cerrarRepararBtn = document.getElementById("close-repair-modal");


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
    function repararVehiculo(matricula, averiaReal, precio, mecanico) {
        let vehiculo = vehiculos.find(v => v.matricula === matricula);
        vehiculo.averiaReal = averiaReal;
        vehiculo.precioReparacion = precio;
        vehiculo.mecanico = mecanico;
        vehiculo.estado = "Arreglado";
    }

    /**
     * -----------------------------
     *      Actualizar options
     * ----------------------------- 
    */
    function actualizarOpciones(){
        vehiculos.forEach(v => {
            selectMatriculas.innerHTML += `
            <option value="${v.matricula}">${v.matricula}</option>
            `
        });
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
        console.log(vehiculos);
        modalregistro.classList.remove(claseModalActivo);
    });

    formularioReparar.addEventListener("submit", function (e) {
        e.preventDefault();
        
        modalReparacion.classList.remove(claseModalActivo);
    });

})
