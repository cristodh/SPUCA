import { getData } from "../services/fetch2.js";

const nombreEstudiante = document.getElementById("nombreEstudiante");
const correo = document.getElementById("correo");
const numeroC = document.getElementById("numeroC");
const sede = document.getElementById("sede");
const cpuAsignada = document.getElementById("cpuAsignada");
const solicitud = document.getElementById("solicitud");
const btnLogout = document.getElementById("logout");

btnLogout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../pages/logoSPUCA.html";
});



async function traerInfoEstudiante() {
    const datosEstudiate = await getData ('estudiantes')
    const estudianteFiltrado = datosEstudiate.filter((estudiante) => estudiante.id === localStorage.getItem("idUsuario")) 
    nombreEstudiante.textContent = estudianteFiltrado[0].NombreEstudiante +" "+ estudianteFiltrado[0].ApellidosEstudiante
    correo.textContent = estudianteFiltrado[0].emailEstudianteR
    numeroC.textContent = estudianteFiltrado[0].CedulaEstudiante
    sede.textContent = estudianteFiltrado[0].sede
    cpuAsignada.textContent = estudianteFiltrado[0].serial
    console.log(estudianteFiltrado[0].NombreEstudiante)
}
async function estructuraSolicitudes() {
    const solicitudes = await getData('solicitudes');
    const solicitudesFiltro = solicitudes.filter((solicitud)=> solicitud.cedulaSolicitante == localStorage.getItem('cedulaUsuario'))
    solicitudesFiltro.forEach((solicitudFiltrada)=>{

        //div
        const divSolicitud = document.createElement('div')
        divSolicitud.setAttribute('class','info-solicitud')

        //imagenPerfil
        const imgUsuario = document.createElement('img')
        imgUsuario.setAttribute('src','../imgs/chico.png')
        imgUsuario.classList.add('foto-usuario')

        //nombre
        const pNombre = document.createElement('p')
        const strongNombre = document.createElement('strong')
        strongNombre.textContent = 'Nombre: '
        pNombre.appendChild(strongNombre)
        pNombre.innerHTML += solicitudFiltrada.nombreSolicitante

        //fechas
        const pFecha = document.createElement('p')
        const strongFecha = document.createElement('strong')
        strongFecha.textContent = 'Fecha: '
        pFecha.appendChild(strongFecha)
        pFecha.innerHTML += `Desde ${solicitudFiltrada.fechaSalida} hasta ${solicitudFiltrada.fechaEntrega}`

        //estadoSolicitud
        const pEstado = document.createElement('p')
        const strongEstado = document.createElement('strong')
        strongEstado.innerHTML += 'Estado: '
        pEstado.appendChild(strongEstado)
        pEstado.innerHTML += solicitudFiltrada.estado


        divSolicitud.appendChild(imgUsuario)
        divSolicitud.appendChild(pNombre)
        divSolicitud.appendChild(pFecha)
        divSolicitud.appendChild(pEstado)

        solicitud.appendChild(divSolicitud)
        
    })

}
estructuraSolicitudes()
traerInfoEstudiante()
