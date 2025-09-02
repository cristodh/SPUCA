const solicitudes = {
  total: 0,
  aceptadas: 0,
  canceladas: 0
};

const ctx = document.getElementById("grafico").getContext("2d");
let chart;

// Función para actualizar gráfica
function actualizarGrafico(tipo) {
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: tipo,
    data: {
      labels: ["Solicitudes"],
      datasets: [
        {
          label: "Total",
          data: [solicitudes.total],
          backgroundColor: "#4A7FA7"
        },
        {
          label: "Aceptadas",
          data: [solicitudes.aceptadas],
          backgroundColor: "#1A3D63"
        },
        {
          label: "Canceladas",
          data: [solicitudes.canceladas],
          backgroundColor: "#B3CFE5"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Estadísticas de Solicitudes" }
      }
    }
  });
}

// Eventos
document.getElementById("agregar").addEventListener("click", () => {
  solicitudes.total++;
  document.getElementById("total").textContent = solicitudes.total;
  actualizarGrafico(document.getElementById("tipoGrafico").value);
});

document.getElementById("aceptar").addEventListener("click", () => {
  if (solicitudes.total > solicitudes.aceptadas + solicitudes.canceladas) {
    solicitudes.aceptadas++;
    document.getElementById("aceptadas").textContent = solicitudes.aceptadas;
    actualizarGrafico(document.getElementById("tipoGrafico").value);
  }
});

document.getElementById("cancelar").addEventListener("click", () => {
  if (solicitudes.total > solicitudes.aceptadas + solicitudes.canceladas) {
    solicitudes.canceladas++;
    document.getElementById("canceladas").textContent = solicitudes.canceladas;
    actualizarGrafico(document.getElementById("tipoGrafico").value);
  }
});

document.getElementById("tipoGrafico").addEventListener("change", (e) => {
  actualizarGrafico(e.target.value);
});

document.getElementById("imprimir").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Reporte de Solicitudes", 20, 20);
  doc.text(`Total: ${solicitudes.total}`, 20, 40);
  doc.text(`Aceptadas: ${solicitudes.aceptadas}`, 20, 50);
  doc.text(`Canceladas: ${solicitudes.canceladas}`, 20, 60);
  doc.save("Reporte_Solicitudes.pdf");

  // Reiniciar estadísticas al nuevo mes
  solicitudes.total = 0;
  solicitudes.aceptadas = 0;
  solicitudes.canceladas = 0;
  document.getElementById("total").textContent = 0;
  document.getElementById("aceptadas").textContent = 0;
  document.getElementById("canceladas").textContent = 0;
  actualizarGrafico(document.getElementById("tipoGrafico").value);
});

// Inicializar con gráfico de pie
actualizarGrafico("pie");
