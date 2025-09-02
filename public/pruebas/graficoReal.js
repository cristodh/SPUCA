import { postData, getData } from "../services/fetch2.js"

let chart;

// Función para agrupar solicitudes según rango
function agruparPorRango(solicitudes, rango) {
  const conteo = {};

  solicitudes.forEach(s => {
    const fecha = new Date(s.fechaSalida);
    let clave = "";

    switch (rango) {
      case "dia":
        clave = fecha.toISOString().split("T")[0];
        break;
      case "semana":
        const primera = new Date(fecha.setDate(fecha.getDate() - fecha.getDay()));
        clave = `Semana ${primera.toISOString().split("T")[0]}`;
        break;
      case "mes":
        clave = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;
        break;
      case "anio":
        clave = `${fecha.getFullYear()}`;
        break;
    }

    conteo[clave] = (conteo[clave] || 0) + 1;
  });

  return conteo;
}

// Cargar datos desde db.json
async function cargarDatos() {
  const response = await fetch("db.json");
  const data = await response.json();
  return data.solicitudes;
}

// Actualizar gráficos según selección
async function actualizarGraficos() {
  const solicitudes = await cargarDatos();
  const rango = document.getElementById("rango").value;
  const tipo = document.getElementById("tipoGrafico").value;

  const agrupado = agruparPorRango(solicitudes, rango);

  const labels = Object.keys(agrupado);
  const valores = Object.values(agrupado);

  if (chart) chart.destroy();

  const ctx = document.getElementById("chart").getContext("2d");
  let chartType = "line";

  if (tipo === "barras") chartType = "bar";
  if (tipo === "pie") chartType = "pie";
  if (tipo === "dona") chartType = "doughnut";

  chart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: labels,
      datasets: [{
        label: "Solicitudes",
        data: valores,
        backgroundColor: [
          "rgba(91, 140, 255, 0.7)",
          "rgba(0, 211, 167, 0.7)",
          "rgba(255, 122, 122, 0.7)",
          "rgba(244, 201, 93, 0.7)"
        ],
        borderColor: "#fff",
        borderWidth: 2,
        fill: tipo === "lineal"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#E6EDF3" } }
      },
      scales: {
        x: { ticks: { color: "#E6EDF3" } },
        y: { ticks: { color: "#E6EDF3" } }
      }
    }
  });
}

// Inicializar con gráfico por defecto
actualizarGraficos();
