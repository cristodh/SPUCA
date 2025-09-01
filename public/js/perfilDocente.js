import { createElement } from "react";
import { getData } from "../services/fetch2.js";

const nombreDocente = document.getElementById("nombreDocente");
const role = document.getElementById("role");
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

