// ary: number array
function sum(ary) {  // TODO: sum all elements in ary (can't use loop)

    // sum
    // reduce會依序對每個陣列裡的元素進行運算
    // 每次執行 sum = (sum + n), sum為用於累積的變數, n為陣列裡的元素
    var n_sum = ary.reduce((sum, n) => {
        return sum + n
    });

    // return
    return n_sum;
}


// output
console.log(sum([1, 5, 3, 2])); // 11



// (optional) 挑戰題: 有幾種寫法？
// 其他寫法(一): 
// 使用join + eval
// var expression = ary.join('+');  // 先把陣列用 join 連成字串 ex. 1+5+3+2
// var sum = eval(expression);  // 再使用 eval 執行這個字串的運算

// 其他寫法(二): 
// 使用遞迴
// if (ary.length === 0) return 0; // 終止條件
// return ary[0] + sum(ary.slice(1)); // 每次累加, 並移除陣列最前方的元素


// (optional) 挑戰題: 如果 `sum` 函式的 input 是 n，然後要回傳 1 + 2 + 3 + … + n 的話，一樣不能用 for, while 寫，要怎麼做？
// 計算方法改高斯求和公式: 
// var sum = n * (n + 1) / 2;