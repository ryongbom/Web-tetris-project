import { BOARD, COLORS } from "../utils/constants.js";

class GameBoard {
    constructor(boardID, playerType) {
        // DOM요소 찾기
        this.boardElement = document.getElementById(boardID);
        this.playerType = playerType;
        this.rows = BOARD.ROWS;
        this.cols = BOARD.COLS;

        // 격자자료 초기화
        this.grid = this.createEmptyGrid();

        //board Rendering
        this.renderBoard();
    }

    createEmptyGrid() {
        const grid = [];
        for (let rows = 0; rows < this.rows; rows++) {
            grid[rows] = [];
            for (let cols = 0; cols < this.cols; cols++) {
                grid[rows][cols] = 0;
            }
        }
        return grid;
    }

    renderBoard() {
        // 모든 cell 생성
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                this.boardElement.appendChild(cell);
            }
        }
    }
    drawPiece(piece) {
        const coords = piece.getCoordinates();

        coords.forEach(coord => {
            // 좌표가 보드 안인지 확인
            if (coord.x >= 0 && coord.x < this.cols && coord.y >= 0 && coord.y < this.rows) {
                // 해당 칸 찾기
                const cellIndex = coord.y * this.cols + coord.x;
                const cell = this.boardElement.children[cellIndex];

                if (cell) {
                    cell.style.backgroundColor = piece.color;
                }
            }
        });
    }
}

export default GameBoard;