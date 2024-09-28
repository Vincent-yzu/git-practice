# A. 註冊 AWS 帳號

* 註冊帳號
    * (尚未註冊)

* 什麼是 AWS Region, AZ (availability zones)

    * AWS Region
        * AWS Region 為 AWS 定義的一個較大範圍的地理區域
        * 現存共有34個已上市的 AWS Region , 遍布在以下地理區: 北美洲(8)、南美洲(1)、歐洲(8)、中東(3)、非洲(1)、亞太地區(11)、澳洲+紐西蘭(2) (每個地理區擁有數個 AWS Region)
        * 每個 AWS Region 均由一個地理區域內至少三個相互隔離、物理上分離的可用區域 (AZ) 組成
        * 不同的 AWS Region 在定價、提供的服務和容錯能力上有所不同
            * 目前提供服務最多的是美國東部 (北弗吉尼亞) (us-east-1)
            * 容錯能力最好 (可用區域最多) 的是 亞太 (東京) (ap-northeast-1) 和 美國西部 (北加州) (us-west-1)
        * AWS Region 概念示意圖: 
        ![圖片載入失敗...](https://learn.microsoft.com/en-us/azure/reliability/media/regions-availability-zones.png "")
        ![圖片載入失敗...](https://docs.aws.amazon.com/images/AmazonRDS/latest/UserGuide/images/Con-AZ-Local.png "")

    * AZ (availability zones)
        * 可用區域 (AZ) 是 AWS 在一個區域內所有獨立資料中心的代稱
        * 具有冗餘電源、網路和連接性的特性, 用以應對突發狀況發生時來分散風險
        * 每個 AWS Region 包含多個 AZ
        * 圖例說明: 北加州的可用區域由三組資料中心組成：US-West-1A、US-West-1B 和 US-West-1C
        ![圖片載入失敗...](https://www.w3schools.com/aws/images/availabilityzones.png "")

        

* 如果你要使用 AWS 服務，你會怎麼選擇用哪個 Region，考慮的因素有哪些？
    * 資料需求: 有些重要的資料如金融和電商, 對資料安全性有較高的需求, 因此 AWS Region 的選擇上會以資料冗餘和災難復原等安全性為優先考量
    * 客戶需求: 有些面向客戶的服務對延遲有較高需求, 因此會以地理上較近的 AWS Region 作為考量
    * 服務需求: 有些新的服務僅在特定的 Region 提供, 這時就會選擇特定的 AWS Region 作為考量
    * 成本需求: 短時間對 AWS Region 服務有大量需求時, 選擇較高定價的區域可能導致成本過高, 這時可以選擇較低定價的 AWS Region 作為考量



# B. Callback 練習
* 安裝的 nodejs 版本
    * nodejs: v20.17.0  (v20是偶數, 代表有支援LTS)
    * npm: 10.8.2


# C. 建立 Express 專案
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


# D. 分組
* 安裝的 nodejs 版本
    * nodejs: v20.17.0  (v20是偶數, 代表有支援LTS)
    * npm: 10.8.2


# 參考資料
* AWS Region (https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview?tabs=azure-cli)
* AWS Region (https://www.w3schools.com/aws/aws_cloudessentials_awsregions.php)
* AWS Region (https://www.w3schools.com/aws/aws_cloudessentials_awsregions.php)
* AWS Region (https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html)
* AWS availability zones (https://www.w3schools.com/aws/aws_cloudessentials_awsavailabilityzones.php)
