import {postData, getData, patchData} from '../services/fetch2';


async function estructuraSolicitudes() {
    const listaEstudiantes = await getData('estudiantes');
    listaEstudiantes.forEach((soli)=>{
        
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