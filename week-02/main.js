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
// 推入6, 7, 測試是否成功推入
console.log(`push: 6, 7`);
stack.push(6);
stack.push(7);
stack.print();

// 推出一個元素, 測試是否成功推出
console.log(`stack pop: `);
stack.pop();
stack.print();

// 查看最上方的元素, 測試是否正常查看
console.log(`stack peek: `);
console.log(`${stack.peek()}`);

// 檢查是否為空, 測試是否正常檢查為空
console.log(`stack isEmpty: `);
console.log(`${stack.isEmpty()}`);

// 檢查stack大小, 測試是否正確輸出stack大小
console.log(`stack size: `);
console.log(`${stack.size()}`);

// 清空stack, 測試是否能正確清空stack
console.log(`stack clear: `);
stack.clear();
stack.print();

// 清空後推出, 測試是否能正確判斷無法推出
console.log(`stack pop after clear: `);
console.log(`${stack.pop()}`);

// 清空後查看最上方的元素, 測試是否能正確判斷無法查看
console.log(`stack peek after clear: `);
console.log(`${stack.peek()}`);