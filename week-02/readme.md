# 問題A
* 安裝的 nodejs 版本
    * nodejs: v20.17.0  (v20是偶數, 代表有支援LTS)
    * npm: 10.8.2
* nvm 與 npm 分別是什麼
    * NVM (Node Version Manager)
        * nvm 相當於 nodejs 的版本管理器, 可以用來查看、更改當前的 nodejs 版本
    * NPM (Node Package Manager)
        * npm 相當於 nodejs 的 library 管理工具, 幫助我們下載程式所需要的 package, 以及管理不同 library 間的相依性
        * 像是這個資料夾底下的'package.json'裡有寫到'"type": "module"', 這告訴 npm 在這個 nodejs 專案中使用 ES Module 語法, 進而使用新的導出導入方式
        * ![圖片載入失敗...](https://i.imgur.com/iY8Oc53.jpg "package.json中的內容")


# 問題C
* (optional) 挑戰題: 有幾種寫法？
    * 其他寫法(一): 
        ```
        // 使用join + eval
        ar expression = ary.join('+');  // 先把陣列用 join 連成字串 ex. 1+5+3+2
        ar sum = eval(expression);  // 再使用 eval 執行這個字串的運算
        ```
    * 其他寫法(二): 
        ```
        // 使用遞迴
        if (ary.length === 0) return 0; // 終止條件
        return ary[0] + sum(ary.slice(1)); // 每次累加, 並移除陣列最前方的元素
        ```

* (optional) 挑戰題: 如果 `sum` 函式的 input 是 n，然後要回傳 1 + 2 + 3 + … + n 的話，一樣不能用 for, while 寫，要怎麼做？
    * 計算方法改高斯求和公式: 
        ```
        var sum = n * (n + 1) / 2;
        ```