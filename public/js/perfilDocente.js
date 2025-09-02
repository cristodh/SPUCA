import { getData } from "../services/fetch2.js";

const nombreDocente = document.getElementById("nombreDocente");
const correo = document.getElementById("correo");
const sede = document.getElementById("sede");
const solicitud = document.getElementById("solicitud");
const btnLogout = document.getElementById("logout");

btnLogout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../pages/logoSPUCA.html";
});

/*Función para mostrar la información del docente*/
async function traerInfoDocente() {
    const datosDocentes = await getData ('docentes')
    const docenteFiltrado = datosDocentes.filter((docente) => docente.id === localStorage.getItem("idDocente")) 
    nombreDocente.textContent = docenteFiltrado[0].NombreDocente+" "+ docenteFiltrado[0].ApellidosDocente
    correo.textContent = docenteFiltrado[0].CorreoElectronicoDocenteR
    sede.textContent = docenteFiltrado[0].modalidad
    console.log(docenteFiltrado[0].nombreDocente)
}
traerInfoDocente()
/* Función para mostrar las solicitudes en el perfil del docente*/
async function estructuraSolicitudes() {
    const solicitudes = await getData('solicitudes');
    solicitudes.forEach((soli)=>{
        
        //div
        const divSolicitud = document.createElement('div')
        divSolicitud.setAttribute('class','info-solicitud')

        //imagenPerfil
        const imgUsuario = document.createElement('img')
        imgUsuario.setAttribute('src','../imgs/emoji (1).png')
        imgUsuario.classList.add('foto-usuario')

        //nombre
        const pNombre = document.createElement('p')
        const strongNombre = document.createElement('strong')
        strongNombre.textContent = 'Nombre: '
        pNombre.appendChild(strongNombre)
        pNombre.innerHTML += soli.nombreSolicitante

        //fechas
        const pFecha = document.createElement('p')
        const strongFecha = document.createElement('strong')
        strongFecha.textContent = 'Fecha: '
        pFecha.appendChild(strongFecha)
        pFecha.innerHTML += `Desde ${soli.fechaSalida} hasta ${soli.fechaEntrega}`

        //estadoSolicitud
        const pEstado = document.createElement('p')
        const strongEstado = document.createElement('strong')
        strongEstado.innerHTML += 'Estado: '
        pEstado.appendChild(strongEstado)
        pEstado.innerHTML += soli.estado


        divSolicitud.appendChild(imgUsuario)
        divSolicitud.appendChild(pNombre)
        divSolicitud.appendChild(pFecha)
        divSolicitud.appendChild(pEstado)

        solicitud.appendChild(divSolicitud)
        console.log(solicitud);
    })
}
estructuraSolicitudes()
