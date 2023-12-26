import knightMoves from "./knightMoves.js";
//knightMoves([0, 0], [3, 2]);

const knight = knightMoves([0, 0], [7, 7]);
let path = "";
knight.path.forEach((element) => {
  path += "[" + element + "]\n";
});

console.log(knight.inMoves);
console.log(path);
