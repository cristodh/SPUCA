import {
    postDataEst, putDataEst, getDataEst, deleteDataEst,
    postDataDoc, putDataDoc, getDataDoc, deleteDataDoc,
    postDataCpu, putDataCpu, getDataCpu, deleteDataCpu
} from './fetch.js';

//   ESTUDIANTES
async function mostrarEstudiantes() {
    const estudiantes = await getDataEst();
    console.log("Lista de estudiantes:", estudiantes);
}

async function agregarEstudiante() {
    const nuevoEstudiante = { nombre: "Juan Pérez", serialNumber: "CPU-001" };
    const respuesta = await postDataEst(nuevoEstudiante);
    console.log("Estudiante agregado:", respuesta);
}

async function actualizarEstudiante() {
    const estudianteActualizado = { id: 1, nombre: "Juan Modificado", serialNumber: "CPU-999" };
    const respuesta = await putDataEst(estudianteActualizado);
    console.log("Estudiante actualizado:", respuesta);
}

async function eliminarEstudiante() {
    const id = 2;
    const respuesta = await deleteDataEst(id);
    console.log("Estudiante eliminado:", respuesta);
}


//   DOCENTES
async function mostrarDocentes() {
    const docentes = await getDataDoc();
    console.log("Lista de docentes:", docentes);
}

async function agregarDocente() {
    const nuevoDocente = { nombre: "Ana Gómez", especialidad: "Matemáticas" };
    const respuesta = await postDataDoc(nuevoDocente);
    console.log("Docente agregado:", respuesta);
}

async function actualizarDocente() {
    const docenteActualizado = { id: 1, nombre: "Ana Modificada", especialidad: "Física" };
    const respuesta = await putDataDoc(docenteActualizado);
    console.log("Docente actualizado:", respuesta);
}

async function eliminarDocente() {
    const id = 2;
    const respuesta = await deleteDataDoc(id);
    console.log("Docente eliminado:", respuesta);
}

//   CPU
async function mostrarCpu() {
    const cpus = await getDataCpu();
    console.log("Lista de CPUs:", cpus);
}

async function agregarCpu() {
    const nuevoCpu = { marca: "Dell", modelo: "Optiplex 790" };
    const respuesta = await postDataCpu(nuevoCpu);
    console.log("CPU agregada:", respuesta);
}

async function actualizarCpu() {
    const cpuActualizada = { id: 1, marca: "HP", modelo: "EliteDesk 800" };
    const respuesta = await putDataCpu(cpuActualizada);
    console.log("CPU actualizada:", respuesta);
}

async function eliminarCpu() {
    const id = 2;
    const respuesta = await deleteDataCpu(id);
    console.log("CPU eliminada:", respuesta);
}

// ==========================
//   EJECUCIÓN DE PRUEBAS
// ==========================

// Puedes llamar a las funciones según lo que quieras probar:
mostrarEstudiantes();
agregarEstudiante();
actualizarEstudiante();
eliminarEstudiante();

mostrarDocentes();
agregarDocente();
actualizarDocente();
eliminarDocente();

mostrarCpu();
agregarCpu();
actualizarCpu();
eliminarCpu();
