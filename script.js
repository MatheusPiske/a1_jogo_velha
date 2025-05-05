const cells = document.querySelectorAll(".cell"); // Seleciona todas as células do tabuleiro
const statusText = document.getElementById("status"); // Elemento que mostra o status do jogo
const restartBtn = document.getElementById("restart"); // Botão de reiniciar

let currentPlayer = "X"; // Jogador atual
let board = ["", "", "", "", "", "", "", "", ""]; // Estado do tabuleiro
let gameActive = true; // Indica se o jogo ainda está em andamento

const winPatterns = [ // Combinações vencedoras
  [0,1,2],[3,4,5],[6,7,8], // Linhas
  [0,3,6],[1,4,7],[2,5,8], // Colunas
  [0,4,8],[2,4,6]          // Diagonais
];

function updateStatus() {
  // Atualiza o texto do status com o jogador da vez
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
}

function checkWinner() {
  // Verifica se houve vencedor ou empate
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `Jogador ${currentPlayer} venceu!`;
      gameActive = false;
      return;
    }
  }

  // Se não houver espaços vazios e ninguém venceu, é empate
  if (!board.includes("")) {
    statusText.textContent = "Empate!";
    gameActive = false;
  }
}

function handleClick(e) {
  // Lida com o clique em uma célula
  const index = e.target.dataset.index;

  // Ignora se a célula já foi jogada ou se o jogo acabou
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer; // Marca o tabuleiro
  e.target.textContent = currentPlayer; // Mostra o símbolo na tela

  checkWinner(); // Verifica se alguém ganhou

  if (gameActive) {
    // Alterna o jogador
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

function restartGame() {
  // Reinicia o jogo
  board.fill("");
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  updateStatus();
}

// Adiciona os eventos de clique às células e ao botão de reinício
cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

// Atualiza o status no início do jogo
updateStatus();
