// function
function doJob(job, time, cb) {
    setTimeout(() => {
      // 只有在這裡，才能知道這個非同步的 setTimeout 已經做完事情了
      let now = new Date();
      cb(`完成工作 ${job} at ${now.toISOString()}`);
    }, time);
  }


// main
// print now time
let now = new Date();
console.log(`開始工作 at ${now.toISOString()}`);

// example
// write your code here
// 以下是使用範例
//   doJob('刷牙', 1000, function (data) {
//     // 表示 doJob 做完了
//     console.log(data);
//   });


// 刷牙 1sec -> 吃早餐 3 sec -> 寫功課 1sec -> 吃午餐 2sec
doJob('刷牙', 1000, function (data) {
  console.log(data);

  doJob('吃早餐', 3000, function (data) {
      console.log(data);

      doJob('寫功課', 1000, function (data) {
          console.log(data);

          doJob('吃午餐', 2000, function (data) {
              console.log(data);

            });
        });
    });
});
  


// 最後期望的輸出:
// 開始工作的時間是 19:07:20，1 秒後完成刷牙，再 3 秒後完成吃早餐，再 1 秒後完成寫功課
// 開始工作 at 2024-09-25T19:07:20.167Z
// 完成工作 刷牙 at 2024-09-25T19:07:21.196Z
// 完成工作 吃早餐 at 2024-09-25T19:07:24.198Z
// 完成工作 寫功課 at 2024-09-25T19:07:25.199Z
// 完成工作 吃午餐 at 2024-09-25T19:07:27.199Z