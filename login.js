const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Pega os nomes dos jogadores
  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();

  // Salva no localStorage para usar no jogo
  localStorage.setItem("player1", player1);
  localStorage.setItem("player2", player2);

  // Redireciona para o jogo
  window.location.href = "jogo/index.html";
});
