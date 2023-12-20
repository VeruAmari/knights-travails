import vertex from "./nodes.js";

export default function knightMoves(start, end) {
  // Rules
  const MAX = 7;
  const MIN = 0;

  const moves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];
  let squares = [];
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const square = vertex([x, y]);
      moves.forEach((element) => {
        if (
          x + element[0] <= MAX &&
          x + element[0] >= MIN &&
          y + element[1] <= MAX &&
          y + element[1] >= MIN
        ) {
          square.moves.push([x + element[0], y + element[1]]);
        }
      });
      squares.push(square);
    }
  }
  return squares;
}
