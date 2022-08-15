import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Square from "./components/Square";
import { Patterns } from "./components/Patterns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
const App = () => {
  const [board, setBorad] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [play, setPlay] = useState(true);
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  const finish = useRef("");
  useEffect(() => {
    checkWin();
  }, [board]);
  useEffect(() => {
    if (result.state !== "none") {
      setPlay(false);
      setPlayer("X");
      if (result.winner === "X") {
        finish.current.value = "Game Finshed and Winner is Player 1";
      }
      if (result.winner === "O") {
        finish.current.value = "Game Finshed and Winner is Player 2";
      }
    }
  }, [result]);
  const choose = (area) => {
    if (play) {
      setBorad(
        board.map((val, index) => {
          if (index === area && val === "") {
            if (player === "O") {
              setPlayer("X");
            } else {
              setPlayer("O");
            }
            return player;
          }
          return val;
        })
      );
    }
  };
  const checkWin = () => {
    Patterns.forEach((pattern) => {
      const firstplayer = board[pattern[0]];
      if (firstplayer === "") return;
      let Winningpattern = true;
      pattern.forEach((index) => {
        if (board[index] !== firstplayer) {
          Winningpattern = false;
        }
      });
      const Tie = () => {
        return board.every((ele) => ele);
      };
      if (!Winningpattern && Tie()) {
        finish.current.value = "Tied";
        setPlay(false);
      }
      if (Winningpattern) {
        setResult({ winner: firstplayer, state: "Won" });
        if (firstplayer === "X") {
          setPlayer1(player1 + 1);
        } else {
          setPlayer2(player2 + 1);
        }
      }
    });
  };

  const resetGame = () => {
    finish.current.value = "";
    setPlay(true);
    setBorad(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  };
  const resetScore = () => {
    setPlayer1(0);
    setPlayer2(0);
    setPlayer("X");
  };
  return (
    <div className='Container'>
      <div className='wrapper'>
        <div className='Header-con'>
          <span>Tic-Tac-Toe</span>
        </div>
        <div className='score-con'>
          <span className='score'>Player 1 : {player1}</span>
          <span className='score'> Player 2 : {player2}</span>
          <button
            onClick={() => {
              resetScore();
            }}>
            Reset
          </button>
        </div>
        <div className='game'>
          <div className='board'>
            <div className='row'>
              <Square
                val={board[0]}
                chooseSquare={() => choose(0)}
                class='square-top-left'
              />
              <Square
                val={board[1]}
                chooseSquare={() => choose(1)}
                class='square-top'
              />
              <Square
                val={board[2]}
                chooseSquare={() => choose(2)}
                class='square-top-right'
              />
            </div>
            <div className='row'>
              <Square
                val={board[3]}
                chooseSquare={() => choose(3)}
                class='square-left'
              />
              <Square
                val={board[4]}
                chooseSquare={() => choose(4)}
                class='square'
              />
              <Square
                val={board[5]}
                chooseSquare={() => choose(5)}
                class='squareright'
              />
            </div>
            <div className='row'>
              <Square val={board[6]} chooseSquare={() => choose(6)} />
              <Square val={board[7]} chooseSquare={() => choose(7)} />
              <Square val={board[8]} chooseSquare={() => choose(8)} />
            </div>
          </div>
        </div>
        <div ref={finish} className={"result"}>
          <button onClick={() => resetGame()}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <span> {finish.current.value}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
