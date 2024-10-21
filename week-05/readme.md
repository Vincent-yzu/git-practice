# 網域購買與憑證申請

- 從 namecheap 購買成功
<br>![圖片載入失敗...](https://i.imgur.com/2bfxMpH.jpg "")

- 在 zerossl 的驗證卡了很久
- 最後發現驗證要求輸入的"_660d2ea7ec1af5b13f887011f3e5c0a1.vincent112753133.link"必須改成"_660d2ea7ec1af5b13f887011f3e5c0a1"才能通過
<br>![圖片載入失敗...](https://i.imgur.com/nPCHN1h.jpg "")

- 最後把憑證安裝進去、修改 Nginx 的文件後, 並且在 AWS EC2 security group 中新增 HTTPS 就成功了
<br>![圖片載入失敗...](https://i.imgur.com/evin41V.jpg "")

<br>

# 本周問題

1. 你的網址，應該是 https://www.xxx.xxx, 點擊過去應該要可以看到個人作業 4 架設的 Express server （由 Nginx proxy 到 Express）
    - 網址: https://www.vincent112753133.link

2. 你在哪裡購買網域的
    - 比較了 Namecheap 和 GoDaddy 的價錢
    - 最後選擇較便宜的 Namecheap

3. DNS 的 A record 是什麼？
    - A record 是 Address Record 的縮寫, 是一種網域和 IP 的對應紀錄
    - 當網頁導向我們購買的網域時, DNS 會去查詢這個紀錄來再重新導向到我們設定的 IP address
    - 相當於紀錄轉送資訊的概念

4. DNS 的 NS record 是什麼？
    - NS record 是 Name Server Record 的縮寫, 記錄這個網域的伺服器, 讓 DNS 可以查詢到該向哪個伺服器送出請求
    - 概念相當於是網域的負責人名單, 讓 DNS 知道想要這個網域的資料該去哪裡找
    <br>![圖片載入失敗...](https://i.imgur.com/kSH9oeD.jpg "")

5. Domain Name vs FQDN vs URL 這三者分別為何？

    - Domain Name
        - 一個網域的名稱, 通常是讓人查詢方便或好記憶的名字
        - 可能會同時對應到多個 IP address
        - 格式如下: Second-Level Domain (SLD) + Top-Level Domain (TLD)
        - `vincent112753133.link` 或 `example.com`  (後面的`.link`和`.com`是 TLD (Top-Level Domain), 通常是用來標記網站用途的標籤)

    - FQDN (Fully Qualified Domain Name)
        - FQDN 相當於是完整版的 Domain Name, 有 Domain Name 沒有的主機名稱
        - 格式如下: Subdomain + Second-Level Domain (SLD) + Top-Level Domain (TLD)
        - `www.vincent112753133.link`
        - 前面的`www` 是主機名稱 (web server), `vincent112753133.link`是網域名稱

    - URL (Uniform Resource Locator)
        - 是一串為了找到網路上某個特定資源的資訊, 也就是網路上的完整地址
        - 格式如下: (例子來自GPT)
        - `https://www.example.com/path/to/resource?search=keyword`
        - 其中`https`是協議名稱, `www.example.com`就是這個網址的 Domain Name, `/path/to/resource`是後續的檔案路徑, `?search=keyword`則是一些參數
        
6. 為什麼應該要為網站加上憑證？而不是直接用 http 就好？
    - 最主要是安全性的問題
    - HTTPS 比起 HTTP 多了 SSL/TLS 的安全傳輸加密機制, 避免網頁上的資料在傳輸時遭到駭客攔截或竊聽
    - 證書驗證的機制會讓數位憑證認證機構(Certificate Authority, CA)核發證書給通過審核的網站, 告訴使用者者個網站是可信任、安全的, 避免不小心點到相似的釣魚網站用

<br>

# 參考資料
* NameCheap教學：網域註冊購買＋網址後台設定（完整申請）: https://youtu.be/GMolK7XA63c?si=4nY7h76BomspV0uZ
* Add ssl certificate to ec2 instance running nginx server: https://aniketkarne.com/add-ssl-certificate-to-ec2-instance-running-nginx-server-10e3ae9301ed
* What is an NS Record? Set Up Your DNS Name Servers: https://www.cloudns.net/wiki/article/34/
* Understanding The Differences: Domain, URL, and IP: https://cleanbrowsing.org/help/docs/understanding-the-differences-domain-url-and-ip/
* 搞懂 IP、FQDN、DNS、Name Server│鼠年全馬鐵人挑戰 #05: https://its-okay.medium.com/%E6%90%9E%E6%87%82-ip-fqdn-dns-name-server-%E9%BC%A0%E5%B9%B4%E5%85%A8%E9%A6%AC%E9%90%B5%E4%BA%BA%E6%8C%91%E6%88%B0-05-aa60f45496fb
* What is the difference between an FQDN and a URL?: https://www.quora.com/What-is-the-difference-between-an-FQDN-and-a-URL
* 為什麼要使用 HTTPS？: https://www.cloudflare.com/zh-tw/learning/ssl/why-use-https/
* SSL — HTTPS 背後的功臣: https://medium.com/starbugs/security-ssl-https-%E8%83%8C%E5%BE%8C%E7%9A%84%E5%8A%9F%E8%87%A3-df714e4df77b
* GPT: https://chatgpt.com/