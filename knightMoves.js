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

  // Some pseudocode
  // Try to move from start to end
  // Let's say end is [6,0]
  // And start is [1, 2]
  // [3, 3]
  // [5, 2]
  // [6, 0]
  // Let's try with [0, 0] [3,2]
  // [1, 2]
  // [2, 4]
  // [5, 4]
  // If the difference between x and y is more than 1
  //

  let squares = {};
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
      squares[`${square.square[0]},${square.square[1]}`] = square;
    }
  }

  function traverse() {
    console.log("Start: ", squares[`${start[0]},${start[1]}`]);
    console.log("End: ", squares[`${end[0]},${end[1]}`]);
  }
  const path = traverse();
  return path;
}
