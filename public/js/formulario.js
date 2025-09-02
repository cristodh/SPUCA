import { postData, getData } from "../services/fetch2.js"

const nombreC = document.getElementById('nombreC')
const numeCe = document.getElementById('numeCe')
const correo = document.getElementById('correo')
const sede = document.getElementById('sede')
const fechaSa = document.getElementById('fechaSa')
const fechaEn = document.getElementById('fechaEn')
const checkacepto = document.getElementById('checkacepto')
const cpuAsignada = document.getElementById('cpuAsignada')
const enviar = document.getElementById('enviar')

const form = document.getElementById('form')

//autorelleno de info
async function rellenarInfo() {
    const datosEstudiate = await getData ('estudiantes')
    const estudianteFiltrado = datosEstudiate.filter((estudiante) => estudiante.id === localStorage.getItem("idUsuario")) 
    nombreC.value = estudianteFiltrado[0].NombreEstudiante +" "+ estudianteFiltrado[0].ApellidosEstudiante
    numeCe.value = estudianteFiltrado[0].CedulaEstudiante
    correo.value = estudianteFiltrado[0].emailEstudianteR
    sede.value = estudianteFiltrado[0].sede
    cpuAsignada.value = estudianteFiltrado[0].serial
    console.log(estudianteFiltrado[0].NombreEstudiante)
}
rellenarInfo()

//se valida si los campos estan llenos
function validarFormulario() {
    if (
        nombreC.value.trim() === "" ||
        numeCe.value.trim() === "" ||
        correo.value.trim() === "" ||
        sede.value.trim() === "" ||
        fechaSa.value.trim() === "" ||
        fechaEn.value.trim() === "" ||
        cpuAsignada.value.trim() === "" ||
        !checkacepto.checked
    ) {
        return false
    }
    return true
}

// Evento boton submit
enviar.addEventListener('click', function () {
    
    if (!validarFormulario()) {
        alert("⚠️ Debes completar todos los campos y aceptar los términos.")
        return
    } else {}
    agregarSolicitud();
    alert('Formulario enviado con exito')
    window.close();
})

//se envia al db.json
async function agregarSolicitud() {
    const usuarioSolicitud = {
        nombreSolicitante: nombreC.value,
        cedulaSolicitante: numeCe.value,
        correoSolicitante: correo.value,
        sedeSolicitante: sede.value,
        fechaSalida: fechaSa.value,
        fechaEntrega: fechaEn.value,
        cpu: serial.value,
        estado: "En revisión"
    }
    const peticion = await postData("solicitudes", usuarioSolicitud)
    console.log(peticion);
    window.location.href = "../pages/perfilEstudiante.html"
}


