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

  function levelOrderSearch(keystart, keytarget) {
    const checked = {};

    // Queue of squares to be checked next//

    let found = false;
    function addToQueue(currentKey, queueTo, keytarget) {
      // Checks if any of available moves is the target, if not, add them to queue

      checked[currentKey] = currentKey;
      for (let key in adjacencyList[currentKey]) {
        if (key === keytarget) {
          found = true;
          return [currentKey, key];
        }

        if (!checked[key] && !queueTo.includes(key)) {
          queueTo.push(key);
        }
      }
      return false;
    }
    if (keystart === keytarget) {
      return keytarget;
    }
    let moves = 0;

    const queue1 = [keystart];
    const queue2 = [];
    const result = [];

    while (!found && (queue1.length > 0 || queue2.length > 0)) {
      while (queue1.length > 0 && !found) {
        const next = queue1.shift();
        const myPath = addToQueue(next, queue2, keytarget);
        if (myPath) {
          result.push(...myPath);
        }
      }
      moves++;
      while (queue2.length > 0 && !found) {
        const next = queue2.shift();
        const myPath = addToQueue(next, queue1, keytarget);
        if (myPath) {
          result.push(...myPath);
        }
      }
      moves++;
    }
    if (!found) {
      return "Path not found :(";
    }
    const theResult = {
      path: result,
      inMoves: `You made it in ${moves} moves! Here's your path:`,
    };
    return theResult;
  }

  const result = levelOrderSearch(startKey, endKey);
  while (!result.path.includes(startKey)) {
    // Iteratively check for the move from which given key was found in order to recreate the path
    const newResult = levelOrderSearch(startKey, result.path[0]);
    result.path.unshift(newResult.path[0]);
  }
  return result;
}
