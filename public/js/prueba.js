// Datos de ejemplo (pueden venir de BD o API)
let solicitudes = [
  { id: 1, estudiante: "Juan Pérez", tarea: "Ensayo Historia", fecha: "2025-08-29" },
  { id: 2, estudiante: "Ana Gómez", tarea: "Proyecto Matemáticas", fecha: "2025-08-30" },
  { id: 3, estudiante: "Carlos Ruiz", tarea: "Informe Biología", fecha: "2025-09-01" },
];

// Obtener referencia de la tabla
const tablaBody = document.querySelector("#tablaSolicitudes tbody");

// Función para renderizar las solicitudes
function renderSolicitudes() {
  tablaBody.innerHTML = ""; // limpiar tabla
  solicitudes.forEach((s) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${s.id}</td>
      <td>${s.estudiante}</td>
      <td>${s.tarea}</td>
      <td>${s.fecha}</td>
      <td>
        <button class="btn-confirmar" onclick="confirmarSolicitud(${s.id})">Confirmar</button>
        <button class="btn-eliminar" onclick="eliminarSolicitud(${s.id})">Eliminar</button>
      </td>
    `;

    tablaBody.appendChild(fila);
  });
}

// Eliminar solicitud
function eliminarSolicitud(id) {
  if (confirm("¿Seguro que deseas eliminar esta solicitud?")) {
    solicitudes = solicitudes.filter((s) => s.id !== id);
    renderSolicitudes();
  }
}

// Confirmar solicitud
function confirmarSolicitud(id) {
  const solicitud = solicitudes.find((s) => s.id === id);
  if (solicitud) {
    alert(`Solicitud de "${solicitud.estudiante}" para "${solicitud.tarea}" confirmada ✅`);
    solicitudes = solicitudes.filter((s) => s.id !== id);
    renderSolicitudes();
  }
}


renderSolicitudes();


// pruebaaaaaaaaaaa estudiante

const usuariosEstudiantes = [
  { usuarioEstudiante: "ale", Id:117270841, contrasenaEstudiante: "1234" },
  { usuarioEstudiante: "molly", contrasenaEstudiante: "1234" },
  { usuarioEstudiante: "Chris", contrasenaEstudiante: "1234" },
];

// Datos Inicio de sesion Estudiante//
const emailEstudianteIS = document.getElementById ("emailEstudianteIS");
const IDEstudianteIS = document.getElementById("IDEstudianteIS");
const passwordEstudianteIS = document.getElementById("passwordEstudianteIS");
const btnISEstudiante = document.getElementById("btnISEstudiante")

// Evento al hacer clic en "Iniciar Sesión Admin"
btnISEstudiante.addEventListener("click", () => {
  const usuarioEstudiante = emailEstudianteIS.value.trim();
  const cedulaEstudiante = IDEstudianteIS.value.trim();
  const contraseñaEstudiante = passwordEstudianteIS.value.trim();

  const esValido = usuariosValidos.some(
    (u) => u.usuarioEstudiante === usuarioEstudiante && u.contrasena  === contrasenaIngresada 
  );

  if (esValido) {
    alert("Ingreso exitoso. ¡Bienvenido " + usuarioIngresado + "!");
    window.location.href = "prueba.html"; // redirección opcional
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});

