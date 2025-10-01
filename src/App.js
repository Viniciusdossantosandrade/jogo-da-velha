import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  const handleClick = (i) => {
    if (board[i] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);


    if (calculateWinner(newBoard) || newBoard.every(cell => cell !== null)) {
      setGameOver(true);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  const renderSquare = (i) => {
    const squareClass = board[i] === 'X' ? 'X' : board[i] === 'O' ? 'O' : '';
    return (
      <button className={`square ${squareClass}`} onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  let status;
  if (winner) {
    status = `Vencedor: ${winner}`;
  } else if (isDraw) {
    status = 'Empatou';
  } else {
    status = `Próximo jogador: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {[...Array(3)].map((_, row) => (
          <div className="board-row" key={row}>
            {[...Array(3)].map((_, col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      {gameOver && (
        <button className="reset-btn" onClick={handleReset}>
          🔁 Reiniciar Jogo
        </button>
      )}
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default App;
