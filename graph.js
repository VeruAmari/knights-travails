export default function graph(x, y) {
  // Defines a knight's set of moves
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

  // Defines a square
  const vertex = (x, y) => {
    const coordinates = [x, y];
    return { coordinates };
  };
  // Defines an edge between two squares
  const edgeObj = (inVertex, outVertex) => {
    return [inVertex, outVertex];
  };

  // Defines legal squares in a grid of size X * Y
  const defineVertices = (sizeX, sizeY) => {
    let id = 0;
    let vertices = {};
    for (let i = 0; i < sizeX; i++) {
      for (let j = 0; j < sizeY; j++) {
        vertices[`${i},${j}`] = vertex(i, j, id);
        id++;
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
        }
      }
    }
    return adjacency;
  };

  let vertices = defineVertices(x, y);

  return { vertices, edgeList, edgeMatrix, adjacencyList };
}
