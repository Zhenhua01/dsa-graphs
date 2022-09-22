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
  distanceOfShortestPath(start, end, val) {
    let seen = new Set(currentStack.value)
    let shortestPath = [];

    if (start.value === end.value) return val +1;
    if (start.adjacent.length === 0 || ) return Infinity;

    for (let node of start.adjacent){
        if ( !seen.has(node.value)) distanceOfShortestPath(node,end,val+1);
    }
    return Math.min(shortestPath)
  }
}

module.exports = { Graph, Node };
