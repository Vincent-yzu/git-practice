# 撰寫驗屍報告
- Date: 2024/11/07  14:37
- Summary: 臨時接獲一個假的 Web Server, 需要修復回正常的
- Impact: 無法連線至真正的 Web Server
- Root Causes: 
    1. Nginx 配置文件裡多一個';'
    2. 假的 Web Server (srv) 會佔據真正的 Web Server (myweb) 所需要的 80 port
    3. 防火牆的部分針對 80 port 也被設定成拒絕
    4. 真正的 Web Server 目錄並沒有存取權限 
- Resolution: 
    1. 移除 Nginx 配置文件的多餘字元
    2. 禁止假的 Web Server (srv) 佔據 80 port
    3. 修正防火牆的拒絕規則並保存
    4. 修改真正的 Web Server (myweb) 目錄的存取權限
- Action Items:

| Action Item                                 | Type     | Bug                  |
|---------------------------------------------|----------|----------------------|
| 移除 Nginx 配置文件裡多的 ';'                  | Prevent  | Nginx 配置文件的 ';' 問題 |
| 停止 srv 執行, 並禁止服務自動啟動               | Prevent  | srv 佔據 80 port     |
| 修正防火牆對 80 port 的拒絕規則, 並保存規則避免重新啟動後再次出現問題 | Prevent  | 防火牆拒絕 80 port   |
| 將 myweb 目錄的擁有者改成 www-data (Nginx 和其他 Web Server 文件讀取的預設用戶), 並允許存取 | Prevent | myweb 目錄沒有存取權限 |
<br>

# Lessons Learned
- What went well
    - 順利停止 srv 執行, 沒有其他依賴 srv 的服務
- What went wrong
    - 缺乏查看、修改防火牆規則的經驗, 這部分反覆試了不少次, 花了不少時間
- Where we got lucky
    - 停止並禁止 srv 自動啟動沒有導致更多的衍伸問題


<br>
# Timeline  
- 建立好環境後, 執行`curl localhost`確認目前是假的 Web Server  
<br>![圖片載入失敗...](https://i.imgur.com/LTqTvtw.jpg "")
- 嘗試啟動 nginx, 發現失敗後查看當前問題
<br>![圖片載入失敗...](https://i.imgur.com/8UZ708a.jpg "")
<br>![圖片載入失敗...](https://i.imgur.com/MrmS4gZ.jpg "")
- 移除 Nginx 配置文件裡多的';', 並再次查看當前問題
- 進而發現 80 port 被占據中 (註: 中途把背景改成較清楚的黑色)
<br>![圖片載入失敗...](https://i.imgur.com/oww0Wcy.jpg "")
<br>![圖片載入失敗...](https://i.imgur.com/VEn4Ghe.jpg "")
- 查看佔據 80 port 的服務, 發現了 srv
- 考慮到直接移除 srv 可能會導致更嚴重的衍伸問題所以暫時先停止 srv 的執行
- 再次執行`curl localhost`後發現無法連線至 80 port
<br>![圖片載入失敗...](https://i.imgur.com/zPtqM0u.jpg "")
- 回去再檢查了 nginx 配置文件一遍並沒有發現問題
- 檢查了防火牆規則後發現 80 port 被設定成拒絕
- 移除這條規則後, 為了避免重新啟動不會再次出現問題所以嘗試保存規則
- 一開始使用`sudo iptables-save > /etc/iptables/rules.v4`保存失敗後跳出了權限不足的錯誤
- 檢查了自己的當前的權限並檢查是否有其他安全限制的規則
- 發現皆沒有問題後, 最後嘗試`sudo iptables-save | sudo tee /etc/iptables/rules.v4`才順利保存規則 (tee 前面也需要加上 sudo)
<br>![圖片載入失敗...](https://i.imgur.com/2NhmPLg.jpg "")
<br>![圖片載入失敗...](https://i.imgur.com/eW54Owi.jpg "")
<br>![圖片載入失敗...](https://i.imgur.com/YC1URaT.jpg "")
<br>![圖片載入失敗...](https://i.imgur.com/q8SJTuM.jpg "")
- 修改完防火牆規則後再次執行`curl localhost`, 出現`403 Forbidden`
- 根據 GPT 的說法問題出在 nginx 沒有權限存取 myweb 目錄
- 從 nginx 的配置文件裡找到`include /etc/nginx/sites-enabled/*;`
- 再從 sites-enabled 裡找到配置文件, 發現 myweb 的檔案目錄在`/var/www/html`底下
- 找到位置後修改檔案目錄的擁有者和存取權限
- 再次執行`curl localhost`後就成功了
<br>![圖片載入失敗...](https://i.imgur.com/ZVqHjjl.jpg "")
<br>![圖片載入失敗...](https://i.imgur.com/DGMHBF0.jpg "")
<br>![圖片載入失敗...](https://i.imgur.com/Kx6WoU5.jpg "")
- 檢查老師說的重新啟動系統後問題可能復發的狀況
- 發現再次失敗了, 原因是之前我只有將 srv 停止執行並沒有移除, 重新啟動後 srv 也重新執行了
- 於是這次將 srv 設定成禁止自動啟動, 並再次執行`curl localhost`確認成功
<br>![圖片載入失敗...](https://i.imgur.com/W850Kts.jpg "")
<br>![圖片載入失敗...](https://i.imgur.com/6UeMVld.jpg "")
- 最後再重新啟動確認一次, 確認可以成功, 問題修復完成
<br>![圖片載入失敗...](https://i.imgur.com/AHif1v8.jpg "")
