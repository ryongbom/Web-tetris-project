import GameBoard from './core/board.js';
import Tetromino from './core/piece.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. 보드 만들기
  const policeBoard = new GameBoard('police-board', 'police');
  const terroristBoard = new GameBoard('terrorist-board', 'terrorist');
  
  // 2. 블록 만들기
  const policeBlock = new Tetromino('L', 'police');
  const terroristBlock = new Tetromino('J', 'terrorist');
  
  // 3. 블록 그리기 (오늘의 핵심!)
  policeBoard.drawPiece(policeBlock);
  terroristBoard.drawPiece(terroristBlock);
});