import { getData, patchData, postData, delData } from "../services/fetch2.js";

const newSerial = document.getElementById('newSerial');
const btnAgregar = document.getElementById('btnAgregar');
const btnAsignar = document.getElementById('btnAsignar');

const estudiantes = document.getElementById('estudiantes');
const numerosSerie = document.getElementById('numerosSerie');

const deleteName = document.getElementById("deleteName")
const deleteEstudiantes = document.getElementById("deleteEstudiantes")
const deleteDb = document.getElementById("deleteDb")

async function cargarSelects() { //cargar estudiantes y computadoras en selects
    const listaEstudiantes = await getData('estudiantes');
    const listaComputadoras = await getData('cpu');
    const filtroDisponibles = listaComputadoras.filter((computadora) => computadora.estado === 'Disponible');
    listaEstudiantes.forEach((estudiante) => {
        if (estudiante.serial != null) {
            return
        }
        const option = document.createElement('option');
        option.value = estudiante.id
        option.textContent = estudiante.NombreEstudiante + " " + estudiante.ApellidosEstudiante;


        estudiantes.appendChild(option);
    })
    filtroDisponibles.forEach((computadora) => {
        const option = document.createElement('option');
        option.value = computadora.serial
        option.textContent = computadora.serial;
        localStorage.setItem('idPc', computadora.id)
        numerosSerie.appendChild(option);
    })
}

async function agregarPc() {
    if (newSerial.value.trim() === '') {
        alert('Por favor ingrese un número de serie válido.');
        return;
    }
    const numeroSerie = `${newSerial.value}-2025-${Math.floor(Math.random() * 99)}`;
    const objPc = {
        serial: numeroSerie,
        estado: 'Disponible'
    }
    const peticion = await postData('cpu', objPc)
    console.log(peticion);
    alert(`Computadora con número de serie ${numeroSerie} agregada exitosamente.`);
    newSerial.value = '';
}
btnAgregar.addEventListener('click', agregarPc);

async function asignarPc() {
    const objAsignacion = {
        serial: numerosSerie.value,
    }
    const peticion = await patchData('estudiantes', objAsignacion, estudiantes.value)
    console.log(peticion);
    const cambiarEstado = await patchData('cpu', { estado: 'Asignada' }, localStorage.getItem('idPc'))
    cargarSelects()
}

cargarSelects();
btnAsignar.addEventListener('click', asignarPc)



async function cargarSelectsEliminar() {
    const listaEstudiantes = await getData('estudiantes');
    
    listaEstudiantes.forEach((usuario) => {
        const option = document.createElement('option')
        option.value = usuario.id
        option.textContent = usuario.NombreEstudiante + ' ' + usuario.ApellidosEstudiante
        deleteEstudiantes.appendChild(option)

        deleteEstudiantes.addEventListener('change', function (e) {
            localStorage.setItem('idEliminar', e.target.value)
        })
        document.getElementById('deleteEstudiantes').addEventListener('click', async function () {
            const peticion = await delData('estudiantes', localStorage.getItem('idEliminar'))
            console.log(peticion);

        })

    })
    const listaDocentes = await getData('docentes')
    listaDocentes.forEach((usuario) => {
        const option = document.createElement('option')
        option.value = usuario.id
        option.textContent = usuario.NombreDocente + ' ' + usuario.ApellidosDocente
        deleteName.appendChild(option)

        deleteName.addEventListener('change', function (e) {
            localStorage.setItem('idEliminar', e.target.value)
        })

        document.getElementById('deleteDocente').addEventListener('click', async function () {
            const peticion = await delData('docentes', localStorage.getItem('idEliminar'))
            console.log(peticion);

        })

    })
}
cargarSelectsEliminar()