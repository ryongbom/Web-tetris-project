import Tetromino from "./piece.js";

export default class GameLogic {
    constructor(board, playerType) {
        this.board = board;
        this.playerType = playerType;
        this.currentPiece = null;
        this.gameLoop = null;

        this.spawnNewPiece();
        this.draw();
    }

    // 랜덤 블럭 생성기
    spawnNewPiece() {
        const types = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
        const randomType = types[Math.floor(Math.random() * types.length)];

        this.currentPiece = new Tetromino(randomType, this.playerType);

        // 블록을 정확히 중앙에 위치시키기
        const pieceWidth = this.currentPiece.getWidth();
        const boardCenter = Math.floor(this.board.cols / 2);  // 10 / 2 = 5

        // 각 블록 타입별 정확한 중앙 정렬
        if (randomType === 'I') {
            this.currentPiece.position.x = boardCenter - 2;
        } else if (randomType === 'O') {
            this.currentPiece.position.x = boardCenter - 1;
        } else {
            this.currentPiece.position.x = boardCenter - 1;
        }

        this.currentPiece.position.y = 0;

        this.draw();
    }

    // 충돌확인 함수
    isValidMove(dx, dy) {
        if (!this.currentPiece) return false;

        const coords = this.currentPiece.getCoordinates();

        for (const coord of coords) {
            const newX = coord.x + dx;
            const newY = coord.y + dy;

            if (newX < 0 || newX >= this.board.cols || newY >= this.board.rows) {
                return false;
            }

            if (newY < 0) {
                return false;
            }

            if (newY >= 0 && newY < this.board.rows &&
                newX >= 0 && newX < this.board.cols) {
                if (this.board.grid[newY][newX] === 1) {
                    return false;
                }
            }
        }
        return true;
    }

    // 블럭 이동시 처리함수
    movePiece(dx, dy) {
        if (!this.currentPiece) return false;

        if (!this.isValidMove(dx, dy)) {
            if (dy > 0) {
                console.log(`${this.playerType} 블록 바닥에 닿음!`);
                this.lockPiece();
            }
            return false;
        }

        this.currentPiece.position.x += dx;
        this.currentPiece.position.y += dy;

        this.draw();
        return true;
    }

    // 볼록 회전함수
    rotatePiece() {
        if (!this.currentPiece) return;

        // 원래 모양 저장
        const originalShape = this.currentPiece.shape.map(row => [...row]);

        // 회전
        this.currentPiece.rotate();

        // 회전 후 충돌 체크
        if (!this.isValidMove(0, 0)) {
            // 충돌하면 원래 모양으로 돌아가기
            this.currentPiece.shape = originalShape;
            return;
        }
        this.draw();
    }

    lockPiece() {
        let coords = this.currentPiece.getCoordinates();

        coords.forEach((coord) => {
            if (coord.y >= 0 && coord.y < this.board.rows &&
                coord.x >= 0 && coord.x < this.board.cols) {
                this.board.grid[coord.y][coord.x] = 1;
            }
        });

        this.clearCompletedLines();

        this.spawnNewPiece();
    }

    clearCompletedLines() {
        let linesCleared = 0;
        let rowsToRemove = [];

        for (let row = this.board.rows - 1; row >= 0; row--) {
            let isLineFull = true;
            for (let col = 0; col < this.board.cols; col++) {
                if (this.board.grid[row][col] === 0) {
                    isLineFull = false;
                    break;
                }
            }

            if (isLineFull) {
                rowsToRemove.push(row);
                linesCleared++;
            }
        }

        if (linesCleared > 0) {
            rowsToRemove.forEach(row => {
                this.board.grid.splice(row, 1);
            });

            for (let i = 0; i < linesCleared; i++) {
                this.board.grid.unshift(new Array(this.board.cols).fill(0));
            }

            this.draw();
        }

        return linesCleared;
    }

    // 고정된 블록그리기 메쏘드
    drawFixedPiece() {
        for (let row = 0; row < this.board.rows; row++) {
            for (let col = 0; col < this.board.cols; col++) {
                if (this.board.grid[row][col] === 1) {
                    const cellIndex = row * this.board.cols + col;
                    const cell = this.board.boardElement.children[cellIndex];

                    if (cell) {
                        if (this.playerType === 'police') {
                            cell.style.backgroundColor = '#2e5a7eff';
                        } else {
                            cell.style.backgroundColor = '#923126ff';
                        }
                    }
                }
            }
        }
    }

    // 생성된 볼록그리기 함수
    draw() {
        // 모든 셀 초기화
        for (let i = 0; i < this.board.boardElement.children.length; i++) {
            this.board.boardElement.children[i].style.backgroundColor = '#2D2D2D';
        }
        this.drawFixedPiece();

        // 보드새로그리기
        if (this.currentPiece) {
            this.board.drawPiece(this.currentPiece);
        }
    }


    // 자동락하 함수
    startGame() {
        console.log(`${this.playerType} 게임 시작!`);

        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }

        this.gameLoop = setInterval(() => {
            console.log(`${this.playerType} 블록 떨어지는 중...`);

            this.movePiece(0, 1);
        }, 800);
    }

    // 오락정지 함수
    stopGame() {
        console.log(`${this.playerType} 게임 정지!`);

        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }

    hardDrop() {
        if (!this.currentPiece) return;

        let canMove = true;
        while (canMove) {
            canMove = this.movePiece(0, 1);
        }
    }
}