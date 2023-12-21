import vertex from "./nodes.js";

export default function knightMoves(start, end) {
  // Movement Rules
  // Defines boundaries of the board
  const MAX = 7;
  const MIN = 0;

  // Defines the set of moves of a knight
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
  /**
   * Check if any of moves are the target when performed from current square.
   *
   */
  //Unused object//
  const squares = {};
  //Unused object//

  // Object containing checked squares//
  const checked = {};

  // Queue of squares to be checked next//
  let queue = [start];
  let found = false;
  // Check if any of available moves is the target, if not, add them to queue
  function checkMoves(current) {
    if (!checked[`${current[0]},${current[1]}`]) {
      checked[`${current[0]},${current[1]}`] = vertex(current);
    }
    // Add current node to checked
    //checked[`${current[0]},${current[1]}`] = vertex(current[0], current[1]);

    console.log("\nCurrent:", current, "\nTarget:", end, "\n");
    const [x, y] = current;
    const [i, j] = end;
    for (const move of moves) {
      const key = `${x + move[0]},${y + move[1]}`;
      if (
        // Check only moves that don't go out of the board
        x + move[0] <= MAX &&
        x + move[0] >= MIN &&
        y + move[1] <= MAX &&
        y + move[1] >= MIN
      ) {
        if (x + move[0] === i && y + move[1] === j) {
          found = true;
          if (!checked[key]) {
            checked[key] = vertex([x + move[0], y + move[1]]);
          }
          console.log("Target square", checked[key], "reached from ", current);
          return checked[key];
        } else {
          if (!checked[key]) {
            // If square has already been visited, ignore it
            //return false;
            checked[key] = vertex([x + move[0], y + move[1]]);
            queue.push(checked[key]);
            console.log(checked[key], "added to queue.");
          }
        }
      }
    }
  }
  // Older code
  /*
  function oldCheckMoves(current) {
    console.log("\nCurrent:", current, "\nTarget:", end, "\n");
    const [x, y] = current;
    const [i, j] = end;
    moves.forEach((element) => {
      const key = `${(x + element[0], y + element[1])}`;
      if (
        // Check only moves that don't go out of the board
        x + element[0] <= MAX &&
        x + element[0] >= MIN &&
        y + element[1] <= MAX &&
        y + element[1] >= MIN
      ) {
        if (x + element[0] === i && y + element[1] === j) {
          console.log("Target square reached.");
          found = true;
          return current;
        } else {
          if (checked[key] || found) {
            // If square has already been visited, ignore it
            //console.log("Already checked ", checked[key]);
            return false;
          }
          checked[key] = vertex([x + element[0], y + element[1]]);
          console.log("To be checked:", checked[key]);
          queue.push(checked[key]);
        }
      }
    });
    queue.forEach(() => {
      oldCheckMoves(queue.shift());
    });
  }
  function mapSquares() {
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
            const key = `${x + element[0]},${y + element[1]}`;
            if (!squares[key]) {
              squares[key] = vertex(x + element[0], y + element[1]);
            }
            square.moves[key] = squares[key];
          }
        });
        squares[`${square.square[0]},${square.square[1]}`] = square;
      }
    }
  }

  function traverse() {
    console.log("Start: ", squares[`${start[0]},${start[1]}`]);
    console.log("End: ", squares[`${end[0]},${end[1]}`]);
  }*/

  let curr;
  while (queue.length > 0 && !found) {
    const next = queue.shift();
    if (!checked[`${next[0]},${next[1]}`]) {
      checked[`${next[0]},${next[1]}`] = next;
    } //prev = curr;
    console.log("A new check starts.");
    curr = checkMoves(next);
  }
  //const path = checkMoves(start, end);
  //console.log("Current was ", curr);
  return 0;
}
