const logo = document.getElementById("logo");

logo.addEventListener("click", () => {
  logo.classList.add("clicked");

  // Esperar a que termine la animación (1s) y redirigir
  setTimeout(() => {
    window.location.href = "Registro.html"; // 🔗 Cambia a tu página
  }, 1000);
});
