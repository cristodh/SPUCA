document.addEventListener("DOMContentLoaded", () => {
  // Pestañas
  const linkEst = document.getElementById("linkEstudiante");
  const linkDoc = document.getElementById("linkDocente");
  const linkAdmin = document.getElementById("linkAdmin");

  const contEst = document.getElementById("Estudiante");
  const contDoc = document.getElementById("Docente");
  const contAdmin = document.getElementById("Administrador");

  // --- Estudiante pestaña ---
  linkEst.addEventListener("click", () => {
    contEst.style.display = "block";
    contDoc.style.display = "none";
    contAdmin.style.display = "none";

    linkEst.classList.add("activo");
    linkDoc.classList.remove("activo");
    linkAdmin.classList.remove("activo");
  });

  // --- Docente  pestaña---
  linkDoc.addEventListener("click", () => {
    contDoc.style.display = "block";
    contEst.style.display = "none";
    contAdmin.style.display = "none";

    linkDoc.classList.add("activo");
    linkEst.classList.remove("activo");
    linkAdmin.classList.remove("activo");
  });

  // --- Administrador pestaña---
  linkAdmin.addEventListener("click", () => {
    contAdmin.style.display = "block";
    contEst.style.display = "none";
    contDoc.style.display = "none";

    linkAdmin.classList.add("activo");
    linkEst.classList.remove("activo");
    linkDoc.classList.remove("activo");
  });

  // --- Estudiante: mostrar/ocultar registro ---
  const btnCrearEst = document.getElementById("RegistroEstudianteFormulario");
  const formEst = document.getElementById("RegistroEstudianteFormularioOculto");
  const loginEst = document.getElementById("RegistroEstudianteOptions");
  const btnAtras = document.getElementById("bntAtras");

  btnCrearEst.addEventListener("click", () => {
    document.body.style.backgroundImage =
      'linear-gradient(to right, #1b1e27, #1b1e27, #1f212893, rgba(0, 0, 0, 0)), url("../imgs/computadoras.jpg")';
    loginEst.style.display = "none";
    formEst.style.display = "block";
  });

  btnAtras.addEventListener("click", () => {
    document.body.style.backgroundImage =
      'linear-gradient(to right, #1b1e27, #1b1e27, #1f212893, rgba(0, 0, 0, 0)), url("../imgs/laptop dia.jpg")';
    formEst.style.display = "none";
    loginEst.style.display = "block";
  });

  // --- Docente: mostrar/ocultar registro ---
  const btnCrearDoc = document.getElementById("RegistroDocenteFormulario");
  const formDoc = document.getElementById("RegistroDocenteFormularioOculto");
  const loginDoc = document.getElementById("RegistroDocenteOptions");
  const btnAtras2 = document.getElementById("bntAtras2");

  btnCrearDoc.addEventListener("click", () => {
    document.body.style.backgroundImage =
      'linear-gradient(to right, #1b1e27, #1b1e27, #1f212893, rgba(0, 0, 0, 0)), url("../imgs/profe explicando vertical.jpg")';
    loginDoc.style.display = "none";
    formDoc.style.display = "block";
  });

  btnAtras2.addEventListener("click", () => {
    document.body.style.backgroundImage =
      'linear-gradient(to right, #1b1e27, #1b1e27, #1f212893, rgba(0, 0, 0, 0)), url("../imgs/profe en pizarra.jpg")';
    formDoc.style.display = "none";
    loginDoc.style.display = "block";
  });
});


// Datos válidos de Administrador
const usuariosValidos = [
  { usuario: "AML", contrasena: "1234" },
  { usuario: "MCA", contrasena: "1234" },
  { usuario: "CDH", contrasena: "1234" },
];

// Obtener inputs y botón del DOM
const inputUsuario = document.getElementById("input-emailAdmin");
const inputContrasena = document.getElementById("input-passwordAdmin");
const botonAdmin = document.getElementById("btnAdminIS");

// Evento al hacer clic en "Iniciar Sesión Admin"
botonAdmin.addEventListener("click", () => {
  const usuarioIngresado = inputUsuario.value.trim();
  const contrasenaIngresada = inputContrasena.value.trim();

  const esValido = usuariosValidos.some(
    (u) => u.usuario === usuarioIngresado && u.contrasena === contrasenaIngresada
  );

  if (esValido) {
    alert("Ingreso exitoso. ¡Bienvenido " + usuarioIngresado + "!");
    window.location.href = "../pages/AdminTools.html"; // redirección opcional
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});

//registro estudiante

import { postDataEst } from "../services/fetch.js";

const NombreEstudiante = document.getElementById('NombreEstudiante');
const ApellidosEstudiante = document.getElementById('ApellidosEstudiante');
const CedulaEstudiante = document.getElementById('CedulaEstudiante');
const fechaEstudiante = document.getElementById('fechaEstudiante');
const emailEstudianteR = document.getElementById('emailEstudianteR');
const passwordEstudianteR = document.getElementById('passwordEstudianteR');
const passwordEstudianteRConfirmar = document.getElementById('passwordEstudianteRConfirmar');
const pregunta1 = document.getElementById("pregunta1");
const pregunta2 = document.getElementById("pregunta2");
const pregunta3 = document.getElementById("pregunta3");
const Provincia = document.getElementById("Provincia");
const direccionCompleta = document.getElementById("direccionCompleta");
const telefonoEstudiante = document.getElementById("telefonoEstudiante");
const btnCrearEstudiante = document.getElementById("btnCrearEstudiante");

async function agregarEstudiante() {
  // Validación rápida de contraseñas
  if (passwordEstudianteR.value !== passwordEstudianteRConfirmar.value) {
    alert("⚠️ Las contraseñas no coinciden");
    return;
  }

  const nuevoEstudiante = {
    NombreEstudiante: NombreEstudiante.value,
    ApellidosEstudiante: ApellidosEstudiante.value,
    CedulaEstudiante: CedulaEstudiante.value,
    fechaEstudiante: fechaEstudiante.value,
    emailEstudianteR: emailEstudianteR.value,
    passwordEstudianteR: passwordEstudianteR.value,
    pregunta1: pregunta1.value,
    pregunta2: pregunta2.value,
    pregunta3: pregunta3.value,
    Provincia: Provincia.value,
    direccionCompleta: direccionCompleta.value,
    telefonoEstudiante: telefonoEstudiante.value
  };

  try {
    const peticion = await postDataEst(nuevoEstudiante);
    console.log("✅ Respuesta del servidor:", peticion);
    alert("Estudiante registrado correctamente");
  } catch (error) {
    console.error("❌ Error al registrar estudiante:", error);
    alert("Error al registrar estudiante");
  }
}

btnCrearEstudiante.addEventListener('click', agregarEstudiante);

