const Collision = {
  HORIZONTAL: "horizontal",
  LEFT: "left",
  RIGHT: "right",
};

function collidesBounds({ shape, position }, colsn = 10, rowsn = 20) {
  const shapeLength = shape?.length || 0;

  for (let y = 0; y < shapeLength; y++) {
    for (let x = 0; x < shapeLength; x++) {
      const pixel = shape[y][x];

      if (!pixel) continue;

      const posx = position.x + x;
      const posy = position.y + y;

      if (posy === rowsn) return Collision.HORIZONTAL;
      if (posx < 0) return Collision.LEFT;
      if (posx >= colsn) return Collision.RIGHT;
    }
  }

  return false;
}

export function collidesLeft(block) {
  return (
    collidesBounds({
      ...block,
      position: { ...block.position, x: block.position.x - 1 },
    }) === Collision.LEFT
  );
}

export function collidesRight(block) {
  return (
    collidesBounds({
      ...block,
      position: { ...block.position, x: block.position.x + 1 },
    }) === Collision.RIGHT
  );
}

export function collidesHorizontal(block) {
  return (
    collidesBounds({
      ...block,
      position: { ...block.position, y: block.position.y + 1 },
    }) === Collision.HORIZONTAL
  );
}

export function collidesWithGrid({ position, shape }, arena) {
  const shapeLength = shape?.length || 0;

  for (let y = 0; y < shapeLength; y++) {
    for (let x = 0; x < shapeLength; x++) {
      const pixel = shape[y][x];

      if (!pixel) continue;

      const posx = position.x + x;
      const posy = position.y + y;

      if (arena?.[posy]?.[posx]) return true;
    }
  }

  return false;
}

export function collidesWithGridLeft(block, arena) {
  return collidesWithGrid(
    {
      ...block,
      position: { ...block.position, x: block.position.x - 1 },
    },
    arena
  );
}

export function collidesWithGridRight(block, arena) {
  return collidesWithGrid(
    {
      ...block,
      position: { ...block.position, x: block.position.x + 1 },
    },
    arena
  );
}
