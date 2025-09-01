import { getData } from "../services/fetch2.js";

const nombreDocente = document.getElementById("nombreDocente");
const role = document.getElementById("role");
const correo = document.getElementById("correo");
const sede = document.getElementById("sede");


async function traerInfoDocente() {
    const datosDocentes = await getData ('docentes')
    const docenteFiltrado = datosDocentes.filter((docente) => docente.id === localStorage.getItem("idDocente")) 
    nombreDocente.textContent = docenteFiltrado[0].NombreDocente
    correo.textContent = docenteFiltrado[0].emailDocenteR
    numeroC.textContent = docenteFiltrado[0].CedulaDocente
    sede.textContent = docenteFiltrado[0].sede
    console.log(docenteFiltrado[0].NombreDocente)
}
traerInfoDocente()



