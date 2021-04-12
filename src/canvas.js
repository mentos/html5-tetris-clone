export const COLOURS = [
  "#932e29",
  "#c8592c",
  "#ecd24a",
  "#2a5740",
  "#532e57",
  "#2f3f7a",
  "#957759",
];

export function drawStage(ctx, arena) {
  const rows = arena.length;
  const cols = arena[0].length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (arena[y][x]) {
        ctx.fillStyle = COLOURS[arena[y][x] - 1];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

export function drawGrid(ctx, rows, cols) {
  for (let x = 0; x < cols; x++) {
    drawLine(ctx, { x, y: 0 }, { x, y: rows });
  }
  for (let y = 0; y < rows; y++) {
    drawLine(ctx, { x: 0, y }, { x: cols, y });
  }
}

export function drawLine(ctx, a, b, lineWidth = 0.05) {
  ctx.strokeStyle = "#1d1d1d";
  ctx.lineWidth = lineWidth;
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

export function clearCanvas(ctx, { width, height }) {
  ctx.clearRect(0, 0, width, height);
}
