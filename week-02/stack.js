// stack.js
// 完成以下 TODO 的部分，並且以 Module 的方式匯出 (ESM)
export default class Stack {
    // TODO: # 有特別的意思嗎？請以註解回覆。
    // # : 用於宣告這個class的private變數, 僅能在這個class中使用的變數
    #items;

    constructor() {
        this.#items = [];
    }

    // 在 stack 頂部加入新元素
    push(element) {
        this.#items.push(element);
    }

    // 移除並回傳 stack 頂部的元素
    pop() {
        if (this.isEmpty())
            return undefined;
        else
            return this.#items.pop();
    }

    // 回傳 stack 頂部的元素，但不移除它
    peek() {
        if (this.isEmpty())
            return undefined;
        else
            return this.#items[this.#items.length - 1];
    }

    // 檢查 stack 是否為空
    isEmpty() {
        // === 比 == 嚴謹
        return this.#items.length === 0;
    }

    // 回傳 stack 中元素的個數
    size() {
        return this.#items.length;
    }

    // 清空 stack 
    clear() {
        // 直接等於空陣列會導致舊陣列占用記憶體
        // length = 0 會直接清空陣列
        this.#items.length = 0;
    }

    // 印出 stack 內容
    print() {
        console.log(this.#items);
    }
}