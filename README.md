# 🛠️ Gestión de un Taller Mecánico (Aplicación JavaScript en Memoria)

## 1. Objetivo del Proyecto

Desarrollar una aplicación en JavaScript que simule la gestión completa de un taller mecánico.

El sistema debe:
1.  Permitir el **registro** de vehículos.
2.  Gestionar su **reparación** y facturación.
3.  Marcar su **entrega** al cliente.

> **Restricción de Implementación:** Toda la información se almacenará **exclusivamente en estructuras de datos en memoria**. No se utilizarán bases de datos ni almacenamiento externo.

---

## 2. Diagrama Lógico de Datos (Objeto Vehículo)

Cada vehículo registrado será un objeto con la siguiente estructura:

| Campo | Descripción | Estado Inicial | Tipo de Dato |
| :--- | :--- | :--- | :--- |
| `matrícula` | Identificador único. | N/A | `string` |
| `marca` | Marca del vehículo. | N/A | `string` |
| `modelo` | Modelo del vehículo. | N/A | `string` |
| `año` | Año de fabricación. | N/A | `number` |
| `cliente` | Nombre del cliente. | N/A | `string` |
| `teléfono` | Teléfono de contacto. | N/A | `string` |
| `problemaCliente` | Descripción inicial del problema. | N/A | `string` |
| `estado` | **Estado actual del proceso.** | `"Para arreglar"` | `string` |
| `averíaReal` | Descripción técnica de la avería. | Vacío (se añade en reparación) | `string` |
| `precio` | Precio final de la reparación. | Vacío (se añade en reparación) | `number` |
| `mecánico` | Nombre del mecánico que reparó. | Vacío (se añade en reparación) | `string` |

### Estados Posibles

1.  `"Para arreglar"` (Inicial)
2.  `"Arreglado"`
3.  `"Recogido"` (Final)

---

## 3. Requisitos Funcionales y Operaciones

El código JavaScript se organizará en torno a estas funciones para la gestión:

| Operación | Función | Descripción y Restricciones |
| :--- | :--- | :--- |
| **Añadir Vehículo** | `registrarVehículo(datos)` | Registra un nuevo vehículo con estado **"Para arreglar"**. Requiere que la matrícula sea **única**. |
| **Listar Todos** | `listarVehículos()` | Muestra una tabla con todos los vehículos y sus datos. |
| **Registrar Reparación** | `repararVehículo(...)` | Añade `averíaReal`, `precio` y `mecánico`. Cambia estado a **"Arreglado"**. **Solo si estaba en "Para arreglar"**. |
| **Marcar Recogido** | `marcarComoRecogido(matrícula)` | Cambia estado a **"Recogido"**. **Solo si estaba en "Arreglado"**. |
| **Filtrar por Estado** | `filtrarPorEstado(estado)` | Muestra solo los vehículos cuyo estado coincida con el filtro. |

---

## 4. Flujo de Interacción y Validaciones

La interfaz de usuario deberá manejar las siguientes validaciones críticas:

### A. Al Registrar

* **Matrícula:** Debe ser no vacía y única en el array de vehículos.
* **Campos:** Todos los campos iniciales (`marca`, `modelo`, `cliente`, etc.) deben estar completos.

### B. Al Reparar

* **Existencia:** El vehículo debe existir.
* **Estado:** Solo se permite la reparación si el estado actual es **"Para arreglar"**.
* **Datos de Reparación:** El precio debe ser $> 0$ y el nombre del mecánico no debe estar vacío.

### C. Al Marcar Como Recogido

* **Existencia:** El vehículo debe existir.
* **Estado:** Solo se permite marcar como recogido si el estado actual es **"Arreglado"**.