import { postDataSolicitudes } from "../services/fetch.js"

const nombreC= document.getElementById('nombreC')
const numeCe= document.getElementById('numeCe')
const correo= document.getElementById('correo')
const sede= document.getElementById('sede')
const fechaSa= document.getElementById('fechaSa')
const fechaEn= document.getElementById('fechaEn')
const checkacepto= document.getElementById('checkacepto')
const modeloPc= document.getElementById('modeloPc')
const enviar= document.getElementById('enviar')

async function agregarSolicitud() {
    const usuarioSolicitud = {
        nombreSolicitante: nombreC.value,
        cedulaSolicitante: numeCe.value,
        correoSolicitante: correo.value,
        sedeSolicitante:sede.value,
        fechaSalida: fechaSa.value,
        fechaEntrega: fechaEn.value,
        ModeloDePc: modeloPc.value
    }
    const peticion = await postDataSolicitudes(usuarioSolicitud)
    console.log(peticion);
}
enviar.addEventListener('click',agregarSolicitud)

