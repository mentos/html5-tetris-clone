import { COLOURS } from "./canvas";
import { collidesLeft, collidesRight, collidesWithGrid } from "./collision";
import { rotate } from "./matrix";

const tetrominoes = {
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  O: [
    [2, 2],
    [2, 2],
  ],
  T: [
    [3, 3, 3],
    [0, 3, 0],
    [0, 0, 0],
  ],
  L: [
    [0, 4, 0],
    [0, 4, 0],
    [4, 4, 0],
  ],
  J: [
    [0, 5, 0],
    [0, 5, 0],
    [0, 5, 5],
  ],
  S: [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0],
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
};

export function drawTetramino(ctx, { shape, position, color }) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape.length; x++) {
      const pixel = shape[y][x];

      if (!pixel) continue;

      ctx.fillStyle = color;
      ctx.fillRect(x + position.x, y + position.y, 1, 1);
    }
  }
}

export function randomTetromino() {
  const shapes = Object.values(tetrominoes);
  const shape = shapes[(Math.random() * shapes.length) | 0];
  const color = COLOURS[shape.flatMap((r) => r).filter((r) => r)[0] - 1];

  return {
    color,
    position: { x: 3, y: 0 },
    shape,
  };
}

export function rorateTetramino(tetramino, arena) {
  let newTetramino = {
    ...tetramino,
    shape: rotate(tetramino.shape),
  };

  if (collidesWithGrid(newTetramino, arena)) {
    return tetramino;
  }

  if (collidesLeft(newTetramino)) {
    newTetramino.position.x = 0;
  }

  if (collidesRight(newTetramino)) {
    newTetramino.position.x = arena[0].length - newTetramino.shape.length;
  }

  return newTetramino;
}
