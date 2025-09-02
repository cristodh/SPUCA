import { getData } from "../services/fetch2.js";

const nombreDocente = document.getElementById("nombreDocente");
const correo = document.getElementById("correo");
const sede = document.getElementById("sede");


async function traerInfoDocente() {
    const datosDocentes = await getData ('docentes')
    const docenteFiltrado = datosDocentes.filter((docente) => docente.id === localStorage.getItem("idDocente")) 
    nombreDocente.textContent = docenteFiltrado[0].NombreDocente+" "+ docenteFiltrado[0].ApellidosDocente
    correo.textContent = docenteFiltrado[0].CorreoElectronicoDocenteR
    sede.textContent = docenteFiltrado[0].modalidad
    console.log(docenteFiltrado[0].nombreDocente)
}
traerInfoDocente()

async function traerInfoEstudiante() {
    const datosEstudiate = await getData ('estudiantes')
    const estudianteFiltrado = datosEstudiate.filter((estudiante) => estudiante.id === localStorage.getItem("idUsuario")) 
    nombreEstudiante.textContent = estudianteFiltrado[0].NombreEstudiante +" "+ estudianteFiltrado[0].ApellidosEstudiante
    correo.textContent = estudianteFiltrado[0].emailEstudianteR
    numeroC.textContent = estudianteFiltrado[0].CedulaEstudiante
    sede.textContent = estudianteFiltrado[0].sede
    cpuAsignada.textContent = estudianteFiltrado[0].cpuAsignada
    console.log(estudianteFiltrado[0].NombreEstudiante)
}


async function estructuraSolicitudes() {
    const solicitudes = await getData('solicitudes');
    solicitudes.forEach((solicitud)=>{
        const divSolicitud = document.createElement('div')
        divSolicitud.setAttribute('class','info-solicitud')
        const imgUsuario = document.createElement('img')
        imgUsuario.setAttribute('src','../imgs/chico.png')
        imgUsuario.classList.add('foto-usuario')
        const pNombre = document.createElement('p')
        const strongNombre = document.createElement('strong')
        strongNombre.textContent = 'Nombre: '
        pNombre.appendChild(strongNombre)
        pNombre.innerHTML += solicitud.nombreSolicitante
        const pFecha = document.createElement('p')
        const strongFecha = document.createElement('strong')
        strongFecha.textContent = 'Fecha: '
        pFecha.appendChild(strongFecha)
        pFecha.innerHTML += `Desde ${solicitud.fechaSalida} hasta ${solicitud.fechaEntrega}`
        const pEstado = document.createElement('p')
        const strongEstado = document.createElement('strong')
        strongEstado.innerHTML += 'Estado: '
        pEstado.appendChild(strongEstado)
        pEstado.innerHTML += solicitudFiltrada.estado
        const eliminar = document.createElement('button')
        eliminar.innerHTML += 'eliminar'



        divSolicitud.appendChild(imgUsuario)
        divSolicitud.appendChild(pNombre)
        divSolicitud.appendChild(pFecha)
        divSolicitud.appendChild(pEstado)
        divSolicitud.appendChild(eliminar)

        solicitud.appendChild(divSolicitud)
        
    })

}
estructuraSolicitudes()
traerInfoEstudiante()




