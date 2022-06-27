class Stack {
    data: number[];
    push(element: number) {
        this.data.push(element);
    }
    pop() {
        return this.data.pop();
    }
    read() {
        let lastItem = this.data[this.data.length-1];
        return lastItem;
    }
    constructor(arr?: number[]) {
        arr ? this.data = arr : this.data = [];
    }
}

class Queue {
    data: number[];
    enqueue(element: number) {
        this.data.push(element);
    }
    dequeue() {
        return this.data.shift();
    }
    read() {
        let firstItem = this.data[0];
        return firstItem;
    }
    constructor(arr: number[]) {
        this.data = arr;
    }
}

/**
 * Task 1: Make Vector
 */

function MakeVector(row: number[]) {
    let puzzle: number[][] = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
        puzzle[i].push(...row);
    }
    return puzzle;
}

/**
 * Task 2: Permute Vector
 */

function PermuteVector(row: number[], p: number) {
    if (p === 0) return row;
    let q = new Queue(row);
    let temp: number;
    for (let i = 0; i < p; i++) {
        if (q.read() !== undefined) {
            temp = q.dequeue() as number;
            q.enqueue(temp);
        }
    }
    return q.data as number[];
}

/**
 * Task 3: Permute Rows
 */

function PermuteRows(puzzle: number[][], x: number, y: number, z: number): number[][] {
    let row0 = [...puzzle[0]];
    let row1 = [...puzzle[1]];
    let row2 = [...puzzle[2]];
    let row3 = [...puzzle[3]];
    
    return [PermuteVector(row0, x), PermuteVector(row1, y), PermuteVector(row2, z), row3];
}

/**
 * Task 4.a: Search Stack
 */

function SearchStack(stack: Stack, item: number) {
    let foundItem = false;
    let leftOverStack = new Stack()
    while(stack.read()) {
        if (stack.read() === item) {
            stack.pop()
            foundItem = true;
        }
        leftOverStack.push(stack.pop() as number)
    }
    return foundItem ? leftOverStack : false;
}

/**
 * Task 5: Check Column
 */

function CheckColumn(puzzle: number[][], j: number) {
    const numbers = new Stack([1,2,3,4]);
    let k = 0;
    while (k < 4) {
        if (!SearchStack(numbers, puzzle[k][j])) return false
        k++;
    }
    return true;
}

/**
 * Task 6: Col Checks && Check Grids
 */

function ColChecks(puzzle: number[][]) {
    for (let j = 0; j < 4; j++) {
        if (!CheckColumn(puzzle, j)) return false;
    }
    return true;
}

function CheckGrids(puzzle: number[][]) {
  
    const grids = [
        [puzzle[0][0], puzzle[0][1], puzzle[1][0], puzzle[1][1]],
        [puzzle[0][2], puzzle[0][3], puzzle[1][2], puzzle[1][3]],
        [puzzle[2][0], puzzle[2][1], puzzle[3][0], puzzle[3][1]],
        [puzzle[2][2], puzzle[2][3], puzzle[3][2], puzzle[3][3]],
    ]
    let k: number, i = 0;
    while(i < 4) {
        k = 0;
        while (k < 4) {
            let numbers = new Stack([1,2,3,4]);
            if (!SearchStack(numbers, grids[k][i])) return false;
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
    data: number[];
    constructor(numbers: number[]) {
        this.data = numbers;
    }
}
class Vector {
    data: Pointer[];
    constructor(size: number) {
        this.data = [];
        let i = 0;
        while(i < size) {
            this.data.push(new Pointer([1,2,3,4]));
            i++
        }
    }
}
const vector = new Vector(4);
console.log('Vector:', vector.data.map(arr => arr));

/**
 * Task 8: Make Solution
 */

function MakeSolution(row: number[]) {
    let orderedPuzzle = MakeVector(row);
    let x = 0, y = 1, z = 2;
    let permutedPuzzle: number[][] = PermuteRows(orderedPuzzle, x, y, z);
    while(true) {
        if (ColChecks(permutedPuzzle) && CheckGrids(permutedPuzzle)) break;
        x = Math.round(Math.random()*3), y = Math.round(Math.random()*3), z = Math.round(Math.random()*3);
        permutedPuzzle = PermuteRows(permutedPuzzle, x, y, z);
    }
}

function SetBlanks(puzzle: number[][],n: number) {
    let row = Math.round(Math.random()*4), column = Math.round(Math.random()*4);
    let cleanedCells = 0;
    while(cleanedCells < n) {
        if (puzzle[row][column] !== -1) {
            puzzle[row][column] = -1;
            cleanedCells++;
        }
    }
    return puzzle.map(row => row.map(cell => cell === -1 ? '' : String(cell)))
}

/**
 * Task 10: Algorithm Limitations
 */
"As it was pointed out, a mayor flaw in this algorithm is the lack of randomness at the moment of permutating the cells of the puzzle. A better way to do this in order to get the broadest set of possible layouts is to randomly sort the numbers instead of permutating them so we are not limited by the first row inserted."

/**
 * Results
 */

const row = [1,2,3,4];
const puzzle = MakeVector(row);
const permutedPuzzle = PermuteRows(puzzle, 1,2,3);

console.log('permutedPuzzle:', permutedPuzzle)
console.log('Column Checks:', ColChecks(permutedPuzzle));



