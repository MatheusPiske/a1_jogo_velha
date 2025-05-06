const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

// Recupera os nomes dos jogadores do localStorage ou usa padrão
const nomeX = localStorage.getItem("player1") || "Jogador X";
const nomeO = localStorage.getItem("player2") || "Jogador O";

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateStatus() {
  const nomeAtual = currentPlayer === "X" ? nomeX : nomeO;
  statusText.textContent = `Vez de: ${nomeAtual}`;
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const nomeVencedor = currentPlayer === "X" ? nomeX : nomeO;
      statusText.textContent = `Vitória de ${nomeVencedor}!`;
      gameActive = false;

      // Atualiza status da partida no localStorage
      atualizarPartida(`Vitória de ${nomeVencedor}`);
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "Empate!";
    gameActive = false;

    // Atualiza status da partida no localStorage
    atualizarPartida("Empate");
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

function restartGame() {
  board.fill("");
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  gameActive = true;
  updateStatus();
}

function atualizarPartida(novoStatus) {
  const partidas = JSON.parse(localStorage.getItem("partidas")) || [];
  if (partidas.length > 0) {
    partidas[partidas.length - 1].status = novoStatus;
    localStorage.setItem("partidas", JSON.stringify(partidas));
  }
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
updateStatus();
