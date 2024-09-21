function fib(n) {  // TODO: implement fibonacci

    // declare
    var n1 = 0;
    var n2 = 1;
    var sum = 0;

    // check
    if(n < 0){
        console.log(`fib(${n}) = 不存在`);
    }
    else if(n == 0 || n == 1){
        console.log(`fib(${n}) = ${n}`);
    }
    else{
        // loop
        for(var i = 1; i < n; i++){
            sum = n1 + n2;
            n1 = n2; 
            n2 = sum;
        }

        // output
        //return sum;
        console.log(`fib(${n}) = ${sum}`);
    }
    
  }
  
  
  // output
  fib(0); // 0
  fib(1); // 1
  fib(5); // 5
  fib(10); // 55