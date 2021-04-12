export function merge(arena, { position, shape }) {
  const _arena = arena.slice(0);

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape.length; x++) {
      const pixel = shape[y][x];

      if (!pixel) continue;

      _arena[y + position.y][x + position.x] = pixel;
    }
  }

  return _arena;
}

export function rotate(matrix) {
  return matrix.map((row, i) =>
    row.map((_, j) => matrix[matrix.length - 1 - j][i])
  );
}
