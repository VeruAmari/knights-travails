export default function graph(x, y) {
  //
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

  // Defines an edge between two squares
  const edgeObj = (inVertex, outVertex) => {
    return [inVertex, outVertex];
  };

  // Defines legal squares in a grid of size X * Y
  const defineVertices = (sizeX, sizeY) => {
    let vertices = {};
    for (let i = 0; i < sizeX; i++) {
      for (let j = 0; j < sizeY; j++) {
        vertices[`${i},${j}`] = [i, j];
      }
    }
    return vertices;
  };

  // Creates an edge list following to moves rules
  const edgeList = (vertexList) => {
    const edges = [];
    for (let key in vertexList) {
      for (let move of moves) {
        let k = `${Number(key[0]) + Number(move[0])},${
          Number(key[2]) + Number(move[1])
        }`;

        if (vertexList[k]) {
          const edge = edgeObj(vertexList[key], vertexList[k]);
          if (!(edge in edges)) {
            edges.push(edge);
          }
        }
      }
    }
    return edges;
  };

  const edgeMatrix = (vertexList) => {
    // X axis in matrix
    let xMatrix = [];

    for (let key1 in vertexList) {
      // Y axis in matrix
      let yMatrix = [];

      let edge;
      for (let key2 in vertexList) {
        edge = 0;

        //
        for (let move of moves) {
          let k = `${Number(key1[0]) + Number(move[0])},${
            Number(key1[2]) + Number(move[1])
          }`;

          if (vertexList[k] === vertexList[key2]) {
            edge = 1;
          }
        }

        //        vertexList[key1];
        //      vertexList[key2];
        yMatrix.push(edge);
      }
      xMatrix.push(yMatrix);
    }
    const data = xMatrix;
    let string = "";

    data.forEach((element) => {
      element.forEach((axis) => {
        string += "[" + axis + "]";
      });
      string += "\n";
    });

    return { data, string };
  };

  const adjacencyList = (vertexList) => {
    // Create adjacency object
    const adjacency = {};

    for (let key in vertexList) {
      adjacency[key] = {};
      for (let move of moves) {
        const moveKey = `${Number(key[0]) + Number(move[0])},${
          Number(key[2]) + Number(move[1])
        }`;
        if (vertices[moveKey]) {
          adjacency[key][moveKey] = vertexList[moveKey];
          /*
          if (!adjacency[key]) {
            adjacency[key] = vertexList[moveKey];
          } else {
            adjacency[key][moveKey] = vertexList[moveKey];
          }
        */
        }
      }
    }
    return adjacency;
  };

  let vertices = defineVertices(x, y);
  /*
  let list = edgeList(vertices);
  let matrix = edgeMatrix(vertices);
*/
  return { vertices, edgeList, edgeMatrix, adjacencyList };
}
//const myGraph = graph(8, 8);

//console.log(myGraph.adjacencyList(myGraph.vertices));

// console.log(myGraph.matrix.string);
