"use strict";

/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.nodes.add(vertex));
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    vertex.adjacent.forEach(node => {
      node.adjacent.delete(vertex);
    });
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {

    let currentStack = [start];
    let seen = new Set(currentStack);
    let nodeVals = [];

    while (currentStack.length !== 0) {
      let currNode = currentStack.pop();
      nodeVals.push(currNode.value);

      for (let node of currNode.adjacent) {
        if (!seen.has(node)) {
          seen.add(node);
          currentStack.push(node);
        }
      }
    }
    return nodeVals;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {

    let currentQueue = [start];
    let seen = new Set(currentQueue.value);

    while (currentQueue.length !== 0) {
      let currNode = currentQueue.shift();

      for (let node of currNode.adjacent) {
        if (!seen.has(node.value)) {
          seen.add(node.value);
          currentQueue.push(node);
        }
      }
    }

    return Array.from(seen);
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    //SOLUTION
    if (start === end) return 0

    let currentQueue = [[start,0]];
    let seen = new Set(currentQueue.value);

    while (currentQueue.length !== 0) {

      let [currNode, count] = currentQueue.shift();

      for (let node of currNode.adjacent) {

        if (currNode === end) {
          return count;
        };

        if (!seen.has(node.value)) {
          seen.add(node.value);
          currentQueue.push([node,count + 1]);
        }
      }
    }
  }



    // ATTEMPT 2
    // let currentQueue = [start];
    // let seen = new Set(currentQueue.value);

    // let count = 0;

    // while (currentQueue.length !== 0) {

    //   let currNode = currentQueue.shift();
    //   let nextLevel = Array.from(currNode.adjacent);

    //   for (let node of currNode.adjacent) {
    //     if (node === nextLevel[0]){
    //       count++
    //     };
    //     if (node.value === end.value) {
    //       return count;
    //     };

    //     if (!seen.has(node.value)) {
    //       seen.add(node.value);
    //       currentQueue.push(node);
    //     }
    //   }
    // }
    // return count;

    // CurrQueue
    // seen R I T H
    // currNode H
    // path []:
    // count:


    // ATTEMPT 1
    // if (start.value === end.value) return path.push(val);
    // for (let node of start.adjacent) {
    //   if (!seen.has(node.value)) {
    //     seen.add(node.value);
    //     path.push(
    //       this.distanceOfShortestPath(node, end, val, seen, path) + 1 );
    //   }
    // }
    // return Math.min(...path);

}

module.exports = { Graph, Node };
