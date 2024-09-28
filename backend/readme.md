# C. 建立 Express 專案

* 輸入`npm init`後, 資料夾底下出現了 `package.json`
* 輸入`npm install express`後, 資料夾底下多了 `package-lock.json`和`node_modules\`

    * 觀察 package.json 的變化: 

        * 可以很明顯地看到底下多了`dependencies`, 其中內容代表這個專案新增了與 express 框架的相依姓
        * `^4.21.0`代表使用 4.21.0 版本, 其中`^`代表允許自動更新到4.XX.X的最新版本, 但不會更新到5.XX.X的版本<br>
        ![圖片載入失敗...](https://i.imgur.com/9x3tebx.jpg "")


    * 觀察 node_modules 裡面有什麼: 

        * 資料夾裡面包含以下這些<br>
        ![圖片載入失敗...](https://i.imgur.com/EJAfFgp.jpg "")

        * 其中比較值得注意的是 `express/`
            * `index.js`
                * express 的核心檔案, 定義了主要的功能
                * 使用 express 時, 被呼叫會回傳一個對應的功能 function
                * 概念如下: <br>
                ![圖片載入失敗...](https://i.imgur.com/JAnFbFl.jpg "")
                * 範例: 建立基本的 HTTP 伺服器 (出自GPT)
```javascript
                const express = require('express');
                const app = express();

                // 定義一個簡單的路由
                app.get('/', (req, res) => {
                    res.send('Hello World!');
                });

                // 啟動伺服器
                const PORT = 3000;
                app.listen(PORT, () => {
                    console.log(`Server is running on http://localhost:${PORT}`);
                });
```
                * 引入 Express，建立應用程式實例 app。
                * 使用 app.get 方法定義了一個根路由，當用戶訪問 / 時，伺服器會回應 "Hello World!"。
                * 最後，使用 app.listen 啟動伺服器，讓它在指定的端口上運行。

            * `lib/`包含一些 express 主要功能需要用到的東西
                * 如: `router/` (定義路由相關設定), `application.js` (定義一些請求處理和錯誤處理的功能), `request.js`和`response.js` (處理HTTP傳輸用)

            * `package.json`裡面寫到一些 express 的相關依賴設定和詳細資訊

        * `.bin/`資料夾
            * 用來儲存可執行的 command line 工具
            * 當有新的套件被安裝時, 可執行的新指令就會被儲存在這裡


        * 其他資料夾
            * 包括一些 express 本身依賴的其他套件
            * 如: `body-parser/` (解析請求主體), `cookie/` (cookie功能), `debug/` (輔助開發), `send/` (HTTP傳輸)

* 建立 app.js 檔案
* node app.js 啟動 server
* 以瀏覽器開啟 http://localhost:3000/ 或是透過指令 curl http://localhost:3000/ 來測試是否有建置成功
    * 確定有成功<br>
    ![圖片載入失敗...](https://i.imgur.com/ewUyo5n.jpg "")

* 上述程式，把要監聽的 port number 寫死在程式碼中，這是一種比較不好的做法，請研究「環境變數」，找找看要怎麼透過環境變數的設定來修改要監聽的 port number（而不是直接去修改 app.js 這個檔案）
    * 將使用 port 的程式碼修改成透過環境變數來取得<br>
    ![圖片載入失敗...](https://i.imgur.com/pjAUVEG.jpg "")
    * 建立`.env` (environment variables) 文件來儲存port number<br>
    ![圖片載入失敗...](https://i.imgur.com/YDQiUAH.jpg "")
    * 然後安裝`dotenv`套件來讀取`.env`中的port number
    * 最後結果: <br>
    ![圖片載入失敗...](https://i.imgur.com/yT8vxOv.jpg "")
    ![圖片載入失敗...](https://i.imgur.com/or8I4p2.jpg "")

* 注意哪些檔案應該要被放上 github repo 來？ 
    * 依賴的第三方套件 和 .env 環境變數檔 不該上傳
    * 建立`.gitignore`, 讓git提交時自動忽略<br>
    ![圖片載入失敗...](https://i.imgur.com/3qlEgaT.jpg "")



# 其他問題

* package.json 中的 dependencies 與 devDependencies 分別是什麼
    * dependencies 代表正常運行必須的相關套件
    * devDependencies 則代表僅在開發時才會用到的相關套件, 並且正式上線環境不會使用

* package.json 中的 scripts 這個區塊怎麼用？
    * scripts 區塊可以自定義一些 command line 上常用的指令
    * 例子如下: <br>
    ![圖片載入失敗...](https://i.imgur.com/gpJwScG.jpg "")
    * 定義完後就可以使用 `npm run start` 或 `npm run test` 來快速執行這些指令

* Port number 要怎麼以環境變數來設定？
    * (方法如上)

* 關於哪些檔案應該要被放上 github repo 這個問題，描述看看為什麼你選擇上傳某些檔案、選擇不上傳某些檔案，決策的要素是什麼？
    * 上傳到 github repo 上意味著有必要讓團隊裡的所有人看到這些資訊
    * 這代表個人在開發時用的筆記文件和測試資料不應該上傳, 對團隊裡的其他人來說這些是沒有意義的資訊
    * 再來是相關的依賴套件, 列有相關套件的文件有必要讓其他人知道, 但是套件本體上傳可能會導致多人重複上傳佔用空間, 並且讓專案本身多出許多非必要檔案導致難以管理
    * 最後是敏感資料, 像是資料庫密碼、port number、API key 等, 這些資訊如果被上傳到公開的 github repo 上可能會導致資訊安全方面的相關問題, 嚴重一點甚至會導致公司或團隊損失慘重

* 範例程式中用 require，但上週的 Stack 是用 import/export，這兩種分別是 JavaScript 引用模組的兩種方式: CJS vs ESM，這兩者分別怎麼用？
    * CommonJS (CJS)
        * 使用 `require('...')` 引入, 然後使用 `module.exports = ...` 匯出<br>
        ![圖片載入失敗...](https://i.imgur.com/mF070XE.jpg "")
    
    * ES Modules (ESM)
        * 使用 `import ... from (檔案)` 引入, 然後使用 `export ...` 匯出<br>
        ![圖片載入失敗...](https://i.imgur.com/TfBNcAT.jpg "")
    
    * 兩者的比較
| 特性           | CommonJS (CJS)                              | ES Modules (ESM)                           |
|----------------|---------------------------------------------|--------------------------------------------|
| **引入方式**      | `require()`                                | `import`                                   |
| **匯出方式**      | `module.exports` 或 `exports`              | `export` 和 `export default`              |
| **同步/非同步**   | 同步載入                                   | 非同步載入                                   |
| **支持的環境**    | 主要用於 Node.js                           | 瀏覽器和 Node.js                           |
| **靜態分析**      | 不支援靜態分析                             | 支援靜態分析，有助於編譯時優化           |
| **檔案擴展名**    | 無需明確擴展名（可省略 `.js`）             | 需要明確檔案擴展名（例如 `.js`）         |
| **優點**          | - 簡單易用<br>- 廣泛支持 Node.js 環境<br>- 同步載入適合伺服器用      | - 現代標準，易於與瀏覽器開發<br>- 靜態分析優化<br>- 支持 Tree Shaking  |
| **缺點**          | - 不支持非同步載入<br>- 不適合瀏覽器環境   | - 兼容性問題（某些舊版瀏覽器不支援）<br>- 實作上可能較複雜 |

