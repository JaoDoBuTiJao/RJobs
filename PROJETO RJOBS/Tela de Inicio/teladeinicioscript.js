function handleKeyPress(event) {
    if (event.keyCode === 13) { // Se a tecla pressionada for Enter (código 13)
        document.getElementById("construction-popup").style.display = "block"; // Mostrar a janela pop-up de construção
    }
}

function closeMessage() {
    document.getElementById("construction-popup").style.display = "none"; // Ocultar a janela pop-up de construção
}
