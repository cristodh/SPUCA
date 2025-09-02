import { delData, getData, patchData } from "../services/fetch2.js";

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
    const datosDocentes = await getData('docentes')
    const docenteFiltrado = datosDocentes.filter((docente) => docente.id === localStorage.getItem("idDocente"))
    nombreDocente.textContent = docenteFiltrado[0].NombreDocente + " " + docenteFiltrado[0].ApellidosDocente
    correo.textContent = docenteFiltrado[0].CorreoElectronicoDocenteR
    sede.textContent = docenteFiltrado[0].modalidad
    console.log(docenteFiltrado[0].nombreDocente)
}
traerInfoDocente()
/* Función para mostrar las solicitudes en el perfil del docente*/
async function estructuraSolicitudes() {
    const solicitudes = await getData('solicitudes');
    solicitudes.forEach((soli) => {

        //div
        const divSolicitud = document.createElement('div')
        divSolicitud.setAttribute('class', 'info-solicitud')
        const btnEliminar = document.createElement("button")
        const btnEditar = document.createElement("button")
        btnEditar.textContent = "ACEPTAR"
        btnEliminar.textContent = "ELIMINAR"
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
        divSolicitud.appendChild(btnEditar)
        divSolicitud.appendChild(btnEliminar)

        solicitud.appendChild(divSolicitud)
        console.log(solicitud);
        
        btnEliminar.addEventListener("click",async function(){
            const peticion = await delData("solicitudes",soli.id)
            console.log(peticion);
            window.location.reload()
        })

        btnEditar.addEventListener("click",async function() {
            const peticion = await patchData("solicitudes",{"estado":"Aceptado"},soli.id)
            console.log(peticion);
            window.location.reload()
            
        })
    })
}
estructuraSolicitudes()


//botones editar y eliminar

//evento eliminar
btnEliminar.addEventListener("click", () => {
    solicitudes.splice(index, 1); // elimina por índice
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
    location.reload();
});

//evento editar
btnEditar.addEventListener("click", () => {
    //inputs (ejemplo, adáptalo a tu formulario real)
    const nuevaNombre = document.getElementById("nombreC");
    const nuevaFechaSalida = document.getElementById("fechaSa");
    const nuevaFechaEntrega = document.getElementById("fechaEn");
    const nuevoEstado = document.getElementById("estadoSolicitud");

    //prellenar
    nuevaNombre.value = soli.nombreSolicitante;
    nuevaFechaSalida.value = soli.fechaSalida;
    nuevaFechaEntrega.value = soli.fechaEntrega;
    if (nuevoEstado) nuevoEstado.value = soli.estado;

    //botón confirmar
    const btnConfirmar = document.createElement("button");
    btnConfirmar.textContent = "Confirmar cambios";
    divSolicitud.appendChild(btnConfirmar);

    btnConfirmar.addEventListener("click", () => {
        //actualizar
        soli.nombreSolicitante = nuevaNombre.value;
        soli.fechaSalida = nuevaFechaSalida.value;
        soli.fechaEntrega = nuevaFechaEntrega.value;
        soli.estado = nuevoEstado ? nuevoEstado.value : soli.estado;

        localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
        location.reload();
    });
});

estructuraSolicitudes();
