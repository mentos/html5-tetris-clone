import {
  randomTetromino,
  rorateTetramino,
  drawTetramino,
} from "./tetrominoes";
import {
  collidesHorizontal,
  collidesLeft,
  collidesRight,
  collidesWithGrid,
  collidesWithGridLeft,
  collidesWithGridRight,
} from "./collision";
import { merge } from "./matrix";
import { clearCanvas, drawGrid, drawStage } from "./canvas";
import * as audio from "./audio";

const stageCtx = document.getElementById("stage").getContext("2d");
const linesCtx = document.getElementById("lines").getContext("2d");
const dropsCtx = document.getElementById("drops").getContext("2d");
const $score = document.querySelector("#score span:first-child");
const $level = document.querySelector("#score span:last-child");

const COLS = 10;
const GRID_SIZE = stageCtx.canvas.width / COLS;
const ROWS = 22;
const SCORE_INCREMENT = 1;
const SPEED = 0.3;

stageCtx.scale(GRID_SIZE, GRID_SIZE);
linesCtx.scale(GRID_SIZE, GRID_SIZE);
dropsCtx.scale(GRID_SIZE, GRID_SIZE);

let arena = Array(ROWS)
  .fill([])
  .map(() => Array(COLS).fill(0));
let prevTime = 0;
let score = 0;
let level = 1;
let tetramino = randomTetromino();
let isGameOver = false;

drawGrid(linesCtx, ROWS, COLS);
drawStage(stageCtx, arena);
gameTick();

function gameTick(time = 0) {
  const tick = (time / ((SPEED * 1000) / (level * 0.3))) | 0;

  if (prevTime !== tick) {
    prevTime = tick;

    const [_arena, _tetramino] = moveDown(arena, tetramino) || [];

    if (_arena) arena = _arena;
    if (_arena?.[0].some((r) => r)) isGameOver = true;

    if (isGameOver) {
      document.removeEventListener("keydown", playerControls);
      audio.fxGameOver.play();
      return false;
    }

    if (_tetramino) tetramino = _tetramino;

    level = Math.max(((score / 10) | 0) + 1, 1);

    $level.innerText = level;
    $score.innerText = (score * 10).toString().padStart(6, "0");
  }

  clearCanvas(dropsCtx, { width: COLS, height: ROWS });
  drawTetramino(dropsCtx, tetramino);

  window.requestAnimationFrame(gameTick);
}

document.addEventListener("keydown", playerControls);

function playerControls(e) {
  switch (e.key) {
    case "ArrowDown":
      const [_arena, _tetramino] = moveDown(arena, tetramino) || [];
      if (_arena) arena = _arena;
      if (_tetramino) tetramino = _tetramino;
      break;

    case "ArrowLeft":
      if (
        !collidesLeft(tetramino) &&
        !collidesWithGridLeft(tetramino, arena)
      ) {
        tetramino.position.x -= 1;
      }
      break;

    case "ArrowRight":
      if (
        !collidesRight(tetramino) &&
        !collidesWithGridRight(tetramino, arena)
      ) {
        tetramino.position.x += 1;
      }
      break;

    case "ArrowUp":
      tetramino = rorateTetramino(tetramino, arena);
      break;
  }
}

function calculateScoreAndClear(arena) {
  let _arena = arena.slice(0);
  let tempScore = 0;

  for (let i = 0; i < _arena.length; i++) {
    if (_arena[i].every((i) => i)) {
      _arena.splice(i, 1);
      _arena.unshift(Array(10).fill(0));
      tempScore += SCORE_INCREMENT;
    }
  }

  const fx = tempScore ? audio.fxScore : audio.fxDrop;
  fx.volume = 0.4;
  fx.play();

  score += tempScore;

  return _arena;
}

function moveDown(arena, tetramino) {
  if (
    collidesHorizontal(tetramino) ||
    collidesWithGrid(
      {
        ...tetramino,
        position: { ...tetramino.position, y: tetramino.position.y + 1 },
      },
      arena
    )
  ) {
    let _arena = calculateScoreAndClear(merge(arena, tetramino));
    let _tetramino = randomTetromino();

    clearCanvas(stageCtx, { width: COLS, height: ROWS });
    drawStage(stageCtx, _arena);

    return [_arena, _tetramino];
  } else {
    tetramino.position.y += 1;
  }
}
