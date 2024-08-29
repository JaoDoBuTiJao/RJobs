// Verificar 'darkMode' no localStorage
let darkMode = localStorage.getItem("darkMode");

const darkModeToggle = document.querySelector("#dark-mode-toggle");

const enableDarkMode = () => {
  // 1. Adicionar uma classe ao body
  document.body.classList.add("darkmode");
  // 2. Atualizar darkMode no localStorage
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  // 1. Retirar a classe do Body
  document.body.classList.remove("darkmode");
  // 2. Atualizar darkMode no localStorage
  localStorage.setItem("darkMode", null);
};

// Se o usuário ja visitou e ligou o darkMode
// Começa ja com o darkMode ligado
if (darkMode === "enabled") {
  enableDarkMode();
}

// Quando alguém aperta o botão
darkModeToggle.addEventListener("click", () => {
  // Pega a configuração do darkMode
  darkMode = localStorage.getItem("darkMode");

  // Se está desligado, liga
  if (darkMode !== "enabled") {
    enableDarkMode();
    // Se está ligado, desliga
  } else {
    disableDarkMode();
  }
});
