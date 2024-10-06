# A. 建立 EC2 主機與部署 Web Server

* AWS Web Server 部署部分

    - 確定建立新 instance 成功
    <br>![圖片載入失敗...](https://i.imgur.com/L5dJ4Qa.jpg "")

    - 確定有連線成功
    <br>![圖片載入失敗...](https://i.imgur.com/en4w35L.jpg "")

    - 備註: 
        - 過程中使用 Windows PowerShell 來執行 linux 指令
        - pm2 無法正確到新變更的檔案, 只有強制重新執行才能正確讀取 (附在最後的問題部分)

<br>

* 注意事項
    * /etc 是什麼的縮寫？這裡通常都放哪些檔案？
        - etc 的意思是 "editable text config"
        - 用於存放一些可供使用者修改的系統配置文件
        - 像是 網路相關設定(如 HTTP 相關設定)、應用程式相關配置(如 MySQL 的配置檔案) 和 其他系統設定(如使用者 ID) 等
        - 通常有一些重要設定和配置, 要記得備份

    * /var 這裡通常都放哪些檔案？
        - var 的意思是 "variable"
        - 用來存放會經常更變的檔案
        - 像是 log、尚未寄出的郵件 和 資料庫 等


    * /boot 這裡通常都放哪些檔案？
        - 用於存放 linux 系統開機需要的相關文件
        - 像是 linux kernel 的相關配置 和 bootloader 配置檔


    * $PATH 環境變數的作用是什麼？
        - $PATH 是 linux 在執行指令的預設路徑
        - 通常有許多個事先設定好的預設路徑
        - 範例: 
        - 假設 myapp 這個檔案在`opt/myprogram/bin`底下
        - 然後在 $PATH 中加入這個路徑 `export PATH=$PATH:/opt/myprogram/bin`
        - 這樣就可以直接輸入`myapp`來執行這個檔案省去先cd到冗長的路徑的步驟


    * `which` 指令的作用？
        - which 用來顯示檔案的完整路徑
        - 但僅限於 $PATH 目錄中可查詢到的檔案和指令
        - 範例: 
        - 輸入`which python`
        - 結果為: `/usr/bin/python`  (因這個路徑已被儲存在 $PATH 目錄中)
        - 輸入`which app.js`
        - 結果為: (無結果)  (因`git-pratice/backend/`並未儲存在 $PATH 目錄中)

<br>

# /week-04/readme.md 中該有的問題

1. instance 的 public IP
    - 3.27.224.37

2. 什麼是 instance type?
    - instance type 是雲端平台的虛擬伺服器配置
    - 不同 instance type 的硬體配置皆不同 (包括 CPU、記憶體和網路頻寬等)
    - 要根據需求來決定適合的 instance type (性能越好, 計價越貴)

3. 什麼是 Nginx？有哪些用途與特性？
    - Nginx 是一個 Web 伺服器代理 (負責處理 Web 的 Request 和 Response)
    - 尤其在高流量的網路需求中有良好的效能
    - 用途包括 HTTP 伺服器、反向代理伺服器(將客戶端的需求再轉發到後端) 和 郵件代理伺服器等
    - 特性包括 擅長高流量的處理、低資源消耗、負載均衡比一般雲端平台便宜、能做到很細節的配置設定
    - 在這次的實作中是透過設定 PORT number, 負責將前端客戶端的請求傳到app.js中進行處理, 簡單來說就是溝通管道的概念
    - 以下為示意圖: 
    <br>![圖片載入失敗...](https://miro.medium.com/v2/resize:fit:720/format:webp/1*GvbxOyca9BY_mJOmB-Fi8A.png "")


4. pm2 套件是什麼？有什麼用處？
    - pm2 是一個方便的 nodejs 工具, 提供許多簡短的指令來管理應用程式的運行
    - 用途包括方便使用者同時管理多個進行中的應用程式、日誌查看、負載平衡等
    - 功能像是這次作業中 app.js 的啟動(`pm2 start app.js`)、重新啟動(`pm2 restart app -f`)、查看日誌(`pm2 logs`) 和 環境變數管理等
    - 如: `pm2 start app.js --name app --update-env -f`

5. 步驟 9 中提到的 `proxy` 是什麼意思？為什麼要透過 Nginx 來 `proxy` 到 Express 開發的 Web Server?
    - `proxy`是指 Web 伺服器代理的一種概念, 意思是指處裡客戶端和後端伺服器的中間服務
    - Nginx 作為 Web 伺服器代理的一種, 可以說 Nginx 是一種`proxy`
    - 避免使用者直接訪問後端 Express 伺服器導致安全漏洞, 所以需要有中間代理如 Nginx 的存在
    - 在實作中, Nginx 會負責接收前端的請求, 然後再轉發到後端的 Express 伺服器
    - 在這之中 Nginx 負責管理和路由請求, 而 Express 則負責處理收到請求後的程式邏輯, 彼此分工完成了複雜的傳輸任務
    - 其中`proxy`在這一句中的意思是指 "Nginx 處理請求並轉發的意思"

    * 提示 `Reverse proxy` vs `Forward Proxy`
        - `Reverse proxy`, 反向代理是指客戶端的請求送到中間代理伺服器後, 然後代理伺服器(如 Nginx)再往內傳給後端伺服器
        - `Forward Proxy`, 正向代理是指客戶端的請求送到中間代理伺服器後, 然後代理伺服器再向外面其他的伺服器轉發請求
        - 以下為示意圖: 
        <br>![圖片載入失敗...](https://www.indusface.com/wp-content/uploads/2023/04/Forward-proxy-vs-reverse-proxy-1.png "")

6. 在 readme 中提供步驟 9 的 Nginx 設定檔
    - 輸入`sudo nano /etc/nginx/sites-available/default`後的設定檔內容如下:  (預設註解過長為了不影響排版所以已刪除)
    ```
    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
        proxy_pass http://localhost:4000;  # PORT=4000 
        proxy_http_version 1.1;  # 使用 HTTP/1.1
        proxy_set_header Upgrade $http_upgrade;  # 支援 WebSocket
        proxy_set_header Connection 'upgrade';  # 支援 WebSocket
        proxy_set_header Host $host;  # 保持 Host 標頭
        proxy_cache_bypass $http_upgrade;  # 禁用暫存
        }
    }
    ```

7. Security Group 是什麼？用途為何？有什麼設定原則嗎？
    - Security Group 相當於是私有雲的防火牆, 可針對進出的流量下規則或控制
    - 可控制的內容包括: IP範圍、傳輸協議、PORT number
    - 透過控制流量的進出來對網路安全進行管控
    * 常見的設定原則包括: 
        - 最小權限原則(Principle of Least Privilege)
        - 避免一個 Security Group 通用多個 instance
        - 定期檢查和更新
    - 以下為示意圖: 
    <br>![圖片載入失敗...](https://docs.aws.amazon.com/zh_tw/vpc/latest/userguide/images/security-group-details.png "")

8. 什麼是 sudo? 為什麼有的時候需要加上 sudo，有時候不用？
    - sudo 的意思是 "superuser do", 相當於 Windows 中使用系統管理員身分執行的意思
    - 像是安裝一些系統檔需要更高的權限的時候就可以用 sudo
    - 但是任意使用 sudo 也可能會導致一些檔案的權限被覆寫, 進而可能導致其他人後續無法存取檔案
    - 所以正常來說不該使用 sudo, 等到權限不足且有必要的時候再加上即可

9. Nginx 的 Log 檔案在哪裡？你怎麼找到的？怎麼看 Nginx 的 Log？
    - 通常位於`/var/log/nginx/`
    - 包含 access.log、error.log
    <br>![圖片載入失敗...](https://i.imgur.com/kE6ZbQX.jpg "")
    - "NGINX Access Logs and Error Logs"網站中寫到的 (底下參考資料有連結)
    - 以 error.log 為例
    - `2024/10/04 09:43:59 [error] 4523#4523: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 35.87.186.101, server: _, req>`
    * 格式為: 
        - 日期: 2024/10/04
        - 時間: 09:43:59
        - 日誌分類: [error]
        - Process ID: 4523#4523
        - 連接編號: *1
        - 錯誤訊息: connect() failed (111: Connection refused)
        - 上游連接狀態: while connecting to upstream
        - 客戶端 IP: 35.87.186.101
        - 伺服器: _
        - 請求訊息: req>


10. 其他你在過程中遭遇的問題，有找到解答就記錄下來，沒有可以把問題放著，下次上課討論。如果沒有遇到任何問題，也可以回答「無」
    - 大多數中途遇到的小問題皆已附在上面的內容中, 以下的部分是過程中比較大的問題

    * AWS Web Server 部署過程中 pm2 無法正確讀取新變更的檔案
        - 因為我之前作業環境變數的做法是新增`.env`檔來儲存環境變數
        - 這次在 linux 主機上把 repo 拉下來時忘記新增環境變數檔導致網頁結果顯示 502 失敗
        - 結果補上環境變數檔並且讓 pm2 restart 後結果還是一樣, 查看日誌也發現 app.js 讀取的 PORT 是沒有`.env`時的預設 PORT
        - 後來花了不少時間檢查設定過程是否有誤、上網查資料和詢問 GPT 後才解決問題
        - 最後發現只有讓 pm2 "強制"重新執行才能正確讀取環境變數的更改 (restart 後加上 -f)
        - 一般的 restart 似乎沒辦法讀取已經開始執行後的即時變更



<br>

# 參考資料
* Linux Directories Explained in 100 Seconds: https://youtube.com/watch?v=42iQKuQodW4
* Day 06 Linux的目錄結構: https://ithelp.ithome.com.tw/articles/10323721?sc=rss.iron
* 第7章 Linux的檔案系統 (File System): https://www.cyut.edu.tw/~ywfan/1109linux/201109chapter7files.htm
* 【Linux】 檔案目錄結構筆記: https://watson050308.medium.com/linux-%E6%AA%94%E6%A1%88%E7%9B%AE%E9%8C%84%E7%B5%90%E6%A7%8B-5f9f6e7efeca
* linux 環境變數及 Path 設定: https://zonego.tw/2022/11/29/linux-path/
* Linux which命令: https://www.runoob.com/linux/linux-comm-which.html
* Amazon EC2 執行個體類型: https://aws.amazon.com/tw/ec2/instance-types/?gclid=EAIaIQobChMI1o70u8r0iAMVvNYWBR0jKyVrEAAYASABEgLoXvD_BwE&trk=f8464984-daa7-4909-b7a9-c299cfbbc7fb&sc_channel=ps&ef_id=EAIaIQobChMI1o70u8r0iAMVvNYWBR0jKyVrEAAYASABEgLoXvD_BwE:G:s&s_kwcid=AL!4422!3!595905314555!p!!g!!ec2!17115101019!136234403676
* Nginx - 維基百科，自由的百科全書: https://zh.wikipedia.org/zh-tw/Nginx
* Nginx 是什麼？認識 Web Server 與 Nginx入門教學: https://tw.alphacamp.co/blog/nginx
* What is NGINX? and how to set it up on Mac.: https://medium.com/@VenuThomas/what-is-nginx-and-how-to-set-it-up-on-mac-107a2482a33a
* What is PM2 and how to use it?: https://www.lucentinnovation.com/blogs/technology-posts/what-is-pm2-and-how-to-use-it
* What is Reverse Proxy, How Does It Works, and What are Its Benefits?: https://securityboulevard.com/2023/04/what-is-reverse-proxy-how-does-it-works-and-what-are-its-benefits/
* 使用安全性群組控制AWS 資源的流量: https://docs.aws.amazon.com/zh_tw/vpc/latest/userguide/vpc-security-groups.html
* 安全群組規則: https://docs.aws.amazon.com/zh_tw/vpc/latest/userguide/security-group-rules.html
* NGINX Access Logs and Error Logs: https://www.digitalocean.com/community/tutorials/nginx-access-logs-error-logs
* GPT: https://chatgpt.com/