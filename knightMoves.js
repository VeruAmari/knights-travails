import graph from "./graph.js";

export default function knightMoves(startArr, endArr) {
  // Movement Rules
  // Defines boundaries of the board

  const BOARD_SIZE_X = 8;
  const BOARD_SIZE_Y = 8;

  const board = graph(BOARD_SIZE_X, BOARD_SIZE_Y);
  const vertices = board.vertices;
  // const list = board.edgeList(vertices);
  // const matrix = board.edgeMatrix(vertices);
  const startKey = `${startArr[0]},${startArr[1]}`;
  const endKey = `${endArr[0]},${endArr[1]}`;

  const adjacencyList = board.adjacencyList(board.vertices);

  const checked = {};

  // Queue of squares to be checked next//

  let found = false;
  // Check if any of available moves is the target, if not, add them to queue

  function levelOrderSearch(currentKey, queueTo) {
    checked[currentKey] = currentKey;
    for (let key in adjacencyList[currentKey]) {
      if (key === endKey) {
        console.log("Path found!");
        found = true;
        return;
      }

      if (!checked[key]) {
        queueTo.push(key);
      }
    }
  }

  function levelOrderLooper() {
    let moves = 0;

    const queue1 = [startKey];
    const queue2 = [];
    while (!found && (queue1.length > 0 || queue2.length > 0)) {
      console.log(`Starting layer ${moves}.`);
      while (queue1.length > 0 && !found) {
        const next = queue1.shift();
        levelOrderSearch(next, queue2);
      }
      moves++;
      console.log(`Starting layer ${moves}.`);
      while (queue2.length > 0 && !found) {
        const next = queue2.shift();
        levelOrderSearch(next, queue1);
      }
      moves++;
    }
    if (!found) {
      return "Path not found :(";
    }
    return `Target square reached in ${moves} moves.`;
  }

  const result = levelOrderLooper();

  return result;
}
