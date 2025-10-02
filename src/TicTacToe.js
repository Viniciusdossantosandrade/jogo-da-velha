import React, { useEffect, useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  // cria um array vazio com 9 posicoes
  const emptyBoard = Array(9).fill("");

  const [board, setboard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (winner) {
      console.log("Jogo finalizado")
      return null;
    }
    //nao deixa clicar num quadrado que ja foi clicado 
    if (board[index] !== "") {
      console.log("Posicao ocupada")
      return null;
    }
    setboard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const checkWinner = () =>{
    //todas as possibilidades de vencer 
    const possibleWaysToWin = [
      //na horizontal
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      
      //na vertical
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) //console.log("O venceu!"); 
      setWinner ("O");
      if (cells.every(cell => cell === "X")) //console.log("X venceu!");
      setWinner ("X");

      checkDraw();
    });
  }

  const checkDraw = () => { // variavel de empate
    if (board.every(item => item !== "")) setWinner("E");
  }

  useEffect(checkWinner, [board]);

  const resetGame = () => {
    setCurrentPlayer("O");
    setboard(emptyBoard);
    setWinner(null);
  }


  return (
    <main>
      <h1 className='title'>Jogo da velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (
          <div
          key={index}
          className={`cell ${item}`}
          onClick={() => handleCellClick(index)}
        >
          {item}
          </div>
        ))}
      </div>
      
      
      {winner &&  //footer mensagem de vencedor ou empate na tela
      // abaixo um botao de recomecar jogo
      <footer>
        {winner === "E"  ?  
          <h2 className="winner-message">
            <span className={winner}>Empatou!</span>
          </h2>
        :
          <h2 className='winner-message'>
            <span className={winner}>{winner}</span>
          venceu!
        </h2>
        }
        
        <button onClick={resetGame}>Recomecar jogo!</button>
      </footer>
      }
    </main>
  );
}

export default TicTacToe;
