// (1) [2, 4, 1, 5, 9, -3] 6 => [[2, 4], [1, 5], [9, -3]] | O(n^2) +
function sumParIter(arr, n) {
    const pars = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === n) {
                pars.push([arr[i], arr[j]])
            }
        }
    }
    return pars;
}
// console.log(sumParIter([2, 4, 1, 5, 9, -3], 6));
// console.log(sumParIter([2, -3, 1, 4, 9, 5], 6));

// (2) Вывести испорты (дочерние зависимости первые)
const lib = {
    a: {
        x: true,
        y: true,
    },
    b: {
        z: true
    }
}
function importDep(lib) {
    const loaded = {};
}

// (3) [100, 50, 0, 150, 100, 0, -30, 70] 3 => [150, 100, 100] | O(log 2 N) +
function bigNums(arr, k) {
    const sortedArr = quickSort(arr).reverse();
    const sortedArr2 = arr.sort((a, b) => b - a);
    return sortedArr2.slice(0, k);
}
function quickSort(array) {
    if (array.length <= 1) {
        return array
    }
    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array[pivotIndex]
    let less = []
    let greater = []
    for (let i = 0; i < array.length; i++) {
        if(i === pivotIndex)
            continue
        if (array[i] < pivot) {
            less.push(array[i])
        } else {
            greater.push(array[i])
        }
    }
    return [...quickSort(less), pivot, ...quickSort(greater)]
}
// console.log(bigNums([100, 50, 0, 150, 100, 0, -30, 70], 3))

// (4) [1, 4, 7] [0, 3, 5, 9] => [0, 1, 3, 4, 5, 7, 9] | O(n ^ 2) +
function merge(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let end = a.length + b.length - 1;

    while (j >= 0) {
        if (i >= 0 && a[i] > b[j]) {
            a[end] = a[i];
            i--;
        }  else {
            a[end] = b[j];
            j--;
        }
        end--;
    }
    return a;
}
// console.log(merge([1, 4, 7, 9, 10], [0, 3, 5, 9]));

// (5) распечатать дерево -
class Node {
    constructor(text, nodes = []) {
        this.text = text;
        this.children = nodes;
    }
}

const tree = [
    new Node('Вещи', [new Node('Одежда', [new Node('Мужская'), new Node('Женская')])]),
    new Node('Хобби', [new Node('Велосипеды', [new Node('Горные')]), new Node('Мангалы', [new Node('Железные'), new Node('Стальные')])]),
    new Node('Транспорт'),
]

function leaves(tree) {
    return tree.map((n) => print(n));
}
function print(node = [], start = '') {
    const str = start ? `${start} => ${node.text}` : node.text;
    if (node.children.length) {
        node.children.forEach((n) => {
            print(n, str);
        })
    } else {
        console.log(str);
    }
}
// leaves(tree);

// (6) определить скобочную последовательность  | O(n) +
function isStaples(str) {
    let open = 0;

    for (const s of str.split('')) {
        if (s === '(') open++;
        if (s === ')') open--;
        if (open < 0) {
            return false;
        }
    }

    return open === 0;
}
// console.log(isStaples('))()()(())(('))

// (7) посчитать количесво островов
const grid1 = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['1', '0', '0', '0', '0'],
];
function numIsland(grid) {
    let counter = 0;
    let rowL = grid.length;
    let colL = grid[0].length;
    if (rowL === 0) return 0;

    function mark(grid, R, C) {
        grid[R][C] = 'X';
        if (grid[R][C-1] === '1') { mark(grid, R, C-1) }
        if (grid[R][C+1] === '1') { mark(grid, R, C+1) }
        if (grid?.[R-1]?.[C] === '1') { mark(grid, R-1, C) }
        if (grid?.[R+1]?.[C] === '1') { mark(grid, R+1, C) }
    }

    for (let r = 0; r < rowL; r++) {
        for (let c = 0; c < colL; c++) {
            if (grid[r][c] === '1') {
                counter++
                mark(grid, r, c);
            }
        }
    }

    return counter;
}
// console.log(numIsland(grid1));
