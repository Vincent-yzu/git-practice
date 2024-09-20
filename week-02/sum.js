// ary: number array
function sum(ary) {  // TODO: sum all elements in ary (can't use loop)

    // sum
    var n_sum = ary.reduce((sum, n) => {
        return sum + n
    });

    // return
    return n_sum;
}


console.log(sum([1, 5, 3, 2])); // 11