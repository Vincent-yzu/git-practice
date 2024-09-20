// main.js
// TODO 以 Module 的方式匯入，例如:
import Stack from './stack.js';

let stack = new Stack();
stack.print();

console.log(`stack push: `);
stack.push(5);
stack.push(8);
stack.print();

// TODO: 應該還要做哪些測試，以驗證自己開發的 stack 是沒有問題的？

// 其他測試
console.log(`push: 6, 7`);
stack.push(6);
stack.push(7);
stack.print();

console.log(`stack pop: `);
stack.pop();
stack.print();

console.log(`stack peek: `);
console.log(`${stack.peek()}`);

console.log(`stack isEmpty: `);
console.log(`${stack.isEmpty()}`);

console.log(`stack size: `);
console.log(`${stack.size()}`);

console.log(`stack clear: `);
stack.clear();
stack.print();

