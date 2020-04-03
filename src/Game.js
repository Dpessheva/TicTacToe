import React, { useState } from "react";
import ReactDOM from "react-dom";

const Square = ({ value, onClick }) => {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  };
  
  const Restart = ({ onClick }) => {
    return (
      <button className="restart" onClick={onClick}>
        Play again
      </button>
    );
  };
  const Game = () => {
    const [squares, setSqaures] = useState(Array(9).fill(null));
    const winner = calculateWinner(squares);
    const [isXNext, setIsNext] = useState(true);
    const nextSymbol = isXNext ? "X" : "O";
  
    function getStatus() {
      if (winner) {
        return "Winner: " + winner;
      } else if (isBoardFull(squares)) {
        return "Draw!";
      } else {
        return "Next player: " + nextSymbol;
      }
    }
    const renderRestartButton = () => {
      return (
        <Restart
          onClick={() => {
          setSqaures(Array(9).fill(null));
          setIsNext(true);
          }}
        />
      );
    }
    const renderSquare = (i) => {
      return (
        <Square
          value={squares[i]}
          onClick={() => {
            if (squares[i] !== null || winner !== null) {
              return;
            }
            const nextSquares = squares.slice();
            nextSquares[i] = isXNext ? "X" : "O";
            setSqaures(nextSquares);
            setIsNext(!isXNext);
          }}
        />
      );
    };
    return (
      <div className="container">
        <div className="game">
          <div className="game-board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <div className="game-info">{getStatus()}</div>
          <div className="restart-button">{renderRestartButton()}</div>
        </div>
      </div>
    );
  };
  
  function calculateWinner(squares) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  function isBoardFull(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        return false;
      }
    }
    return true;
  }

  export default Game;