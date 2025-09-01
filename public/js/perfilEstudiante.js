import { getData } from "../services/fetch2.js";

const nombreEstudiante = document.getElementById("nombreEstudiante");
const role = document.getElementById("role");
const correo = document.getElementById("correo");
const numeroC = document.getElementById("numeroC");
const sede = document.getElementById("sede");


async function traerInfoEstudiante() {
    const datosEstudiate = await getData ('estudiantes')
    const estudianteFiltrado = datosEstudiate.filter((estudiante) => estudiante.id === localStorage.getItem("idUsuario")) 
    nombreEstudiante.textContent = estudianteFiltrado[0].NombreEstudiante
    correo.textContent = estudianteFiltrado[0].emailEstudianteR
    numeroC.textContent = estudianteFiltrado[0].CedulaEstudiante
    sede.textContent = estudianteFiltrado[0].sede
    console.log(estudianteFiltrado[0].NombreEstudiante)
}
traerInfoEstudiante()



