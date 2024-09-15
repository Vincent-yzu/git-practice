## 說明 blob, tree, commit, branch, head 分別是什麼
1. blob: Git中最基本的資料儲存單元, 每次commit時git會建立一個唯一的blob來儲存暫存資料, 並擁有一個唯一的哈希值 (供tree指向用)
2. tree: 一個指向各個blob和其他tree的目錄, 可以使用tree來顯示整個專案的目錄結構, 以及用來追蹤每個改動的紀錄
3. commit: 每次提交會建立一個commit物件 (.git\objects底下有更改過的痕跡), 代表紀錄這次提交中所更改的全部資訊 (提交訊息、作者、記錄這個暫存所指向的tree物件...)
4. branch: 指向當前所在commit的指標, 並且每次commit後會指向最新的commit
5. head: 指向當前所在branch的指標, 尤其在更改branch名稱時可以在".git\refs\heads\"資料夾底下看到branch名稱的變化

## 紀錄在 git repo 操作過程中，.git 檔案夾裡的變化，看看你可以觀察到什麼
1. "git init"會建立一個".git"資料夾, 初始包含"hooks"、"info"、"objects"、"refs"、"config"、"description"、"HEAD"
2. "nano Hi.txt"後".git"資料夾裡沒有變化
3. "git add Hi.txt"後".git"資料夾裡多了一個檔案叫做"index", 且"objects"裡多了一個"b1"資料夾
4. "git commit -m "測試備註""後, 多了一個檔案"COMMIT_EDITMSG"和資料夾"log", 且"index"、"objects"顯示有修改過
5. "git branch -M main"和"git remote add origin git@github.com:Vincent-yzu/TestRepoRRR.git"後"HEAD"、"config"和"refs"顯示有修改過
6. "git push -u origin main"後"config"和"refs"顯示有修改過, 其中"refs"裡多了"refs\remotes\origin\main"這一個檔案
7. "git branch new-branch"時".git\refs\heads\"底下會多一個"new-branch"的新檔案代表新分支

## commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？
* 應該要簡潔且具體的寫出更改過的部分, 確保未來有需求時可以追溯修改紀錄
* 至於style則可以視當前的團隊需求或專案需求而定, 確保整個團隊有統一的共識即可



## 補充
### 更易懂的blob、tree範例 (by GPT): 

project/
├── README.md
└── src/
    └── main.c

* 對於這個專案，Git 會建立一個 tree 物件表示 project 目錄
* 這個 tree 會包含兩個項目：一個指向 README.md 檔案的 blob，另一個指向 src/ 目錄的 tree
* 而 src/ 的 tree 會包含一個項目，指向 main.c 檔案的 blob。