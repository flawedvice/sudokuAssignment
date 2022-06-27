"use strict";
class Stack {
    constructor(arr) {
        arr ? this.data = arr : this.data = [];
    }
    push(element) {
        this.data.push(element);
    }
    pop() {
        return this.data.pop();
    }
    read() {
        let lastItem = this.data[this.data.length - 1];
        return lastItem;
    }
}
class Queue {
    constructor(arr) {
        this.data = arr;
    }
    enqueue(element) {
        this.data.push(element);
    }
    dequeue() {
        return this.data.shift();
    }
    read() {
        let firstItem = this.data[0];
        return firstItem;
    }
}
/**
 * Task 1: Make Vector
 */
function MakeVector(row) {
    let puzzle = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
        puzzle[i].push(...row);
    }
    return puzzle;
}
/**
 * Task 2: Permute Vector
 */
function PermuteVector(row, p) {
    if (p === 0)
        return row;
    let q = new Queue(row);
    let temp;
    for (let i = 0; i < p; i++) {
        if (q.read() !== undefined) {
            temp = q.dequeue();
            q.enqueue(temp);
        }
    }
    return q.data;
}
/**
 * Task 3: Permute Rows
 */
function PermuteRows(puzzle, x, y, z) {
    let row0 = [...puzzle[0]];
    let row1 = [...puzzle[1]];
    let row2 = [...puzzle[2]];
    let row3 = [...puzzle[3]];
    return [PermuteVector(row0, x), PermuteVector(row1, y), PermuteVector(row2, z), row3];
}
/**
 * Task 4.a: Search Stack
 */
function SearchStack(stack, item) {
    let foundItem = false;
    let leftOverStack = new Stack();
    while (stack.read()) {
        if (stack.read() === item) {
            stack.pop();
            foundItem = true;
        }
        leftOverStack.push(stack.pop());
    }
    return foundItem ? leftOverStack : false;
}
/**
 * Task 5: Check Column
 */
function CheckColumn(puzzle, j) {
    const numbers = new Stack([1, 2, 3, 4]);
    let k = 0;
    while (k < 4) {
        if (!SearchStack(numbers, puzzle[k][j]))
            return false;
        k++;
    }
    return true;
}
/**
 * Task 6: Col Checks && Check Grids
 */
function ColChecks(puzzle) {
    for (let j = 0; j < 4; j++) {
        if (!CheckColumn(puzzle, j))
            return false;
    }
    return true;
}
function CheckGrids(puzzle) {
    const grids = [
        [puzzle[0][0], puzzle[0][1], puzzle[1][0], puzzle[1][1]],
        [puzzle[0][2], puzzle[0][3], puzzle[1][2], puzzle[1][3]],
        [puzzle[2][0], puzzle[2][1], puzzle[3][0], puzzle[3][1]],
        [puzzle[2][2], puzzle[2][3], puzzle[3][2], puzzle[3][3]],
    ];
    let k, i = 0;
    while (i < 4) {
        k = 0;
        while (k < 4) {
            let numbers = new Stack([1, 2, 3, 4]);
            if (!SearchStack(numbers, grids[k][i]))
                return false;
            k++;
        }
        i++;
    }
    return true;
}
/**
 * Task 7: Puzzle Vectors
 *
 * Design a vector data structure
 */
class Pointer {
    constructor(numbers) {
        this.data = numbers;
    }
}
class Vector {
    constructor(size) {
        this.data = [];
        let i = 0;
        while (i < size) {
            this.data.push(new Pointer([1, 2, 3, 4]));
            i++;
        }
    }
}
const vector = new Vector(4);
console.log('Vector:', vector.data.map(arr => arr));
/**
 * Results
 */
const row = [1, 2, 3, 4];
const puzzle = MakeVector(row);
const permutedPuzzle = PermuteRows(puzzle, 1, 2, 3);
console.log('permutedPuzzle:', permutedPuzzle);
console.log('Column Checks:', ColChecks(permutedPuzzle));
