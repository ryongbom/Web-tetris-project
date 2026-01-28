import GameBoard from './core/board.js';
import GameLogic from './core/game-logic.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("게임 로딩 완료!");

  let gamePlay = false;

  // 보드 만들기
  const policeBoard = new GameBoard('police-board', 'police');
  const terroristBoard = new GameBoard('terrorist-board', 'terrorist');

  // 게임로직 만들기
  const policeGame = new GameLogic(policeBoard, 'police');
  const terroristGame = new GameLogic(terroristBoard, 'terrorist');

  // 버튼 동작 련결
  const startButton = document.querySelector('.start-button');
  const stopButton = document.querySelector('.stop-button');

  startButton.addEventListener('click', () => {
    console.log("시작 버튼 클릭!");

    policeGame.startGame();
    terroristGame.startGame();
    gamePlay = true;
  });

  stopButton.addEventListener('click', () => {
    console.log("정지 버튼 클릭!");

    policeGame.stopGame();
    terroristGame.stopGame();
    gamePlay = false;
  });

  document.addEventListener('keydown', (event) => {
    if (gamePlay) {
      if (event.key === 'A' || event.key === 'a') {
        policeGame.movePiece(-1, 0);
      }
      else if (event.key === 'D' || event.key === 'd') {
        policeGame.movePiece(1, 0);
      }
      else if (event.key === 'S' || event.key === 's') {
        policeGame.movePiece(0, 1);
      }
      else if (event.key === 'W' || event.key === 'w') {
        policeGame.rotatePiece();
      }
      else if (event.key === ' ') {
        policeGame.hardDrop();
      }

      if (event.key === 'ArrowRight') {
        terroristGame.movePiece(1, 0);
      }
      else if (event.key === 'ArrowLeft') {
        terroristGame.movePiece(-1, 0);
      }
      else if (event.key === 'ArrowDown') {
        terroristGame.movePiece(0, 1);
      }
      else if (event.key === 'ArrowUp') {
        terroristGame.rotatePiece();
      }
      else if (event.key === 'Enter') {
        terroristGame.hardDrop();
        event.preventDefault();
      }
    }
  });
});


