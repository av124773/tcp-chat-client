# TCP Chat Client

這是一個用 Node.js 實現的簡單 TCP 客戶端，配合[tcp-chat-server](https://github.com/av124773/tcp-chat-server)使用，包含處理意外斷開連接的重新連接機制。該客戶端將在連接斷開後嘗試多次重新連接到服務器，每次重試之間有一定的延遲。

### 如何使用

> [!NOTE]
> 請確保您的電腦已安裝 Node.js。如果尚未安裝，請至 [Node.js 官方網站](https://nodejs.org/) 下載並安裝。

1. **下載程式碼**：使用 `git clone` 或直接下載 ZIP 檔案。

    ```sh
    git clone https://github.com/av124773/tcp-chat-client.git
    ```

2. **進入專案目錄**：在終端機中進入專案目錄。

    ```sh
    cd tcp-chat-client
    ```

3. **啟動客戶端**：執行以下命令來啟動客戶端。預設連線 IP 位址為 `locashost` 埠號為 `4000`。

    ```sh
    npm start
    ```

    或自行設定伺服器的 IP 位址和埠號 (請按順序輸入)
    
    ```sh
    npm start [host] [path]

    ex:
    npm start 127.0.0.1 4000
    ```

4. **開始聊天**：現在您可以在聊天室中開始聊天了！輸入訊息並按 Enter 以發送給其他使用者。

5. **切斷連線**：輸入 `/exit` 就可以切斷與伺服器的連線。

### 功能特色

- 重連機制：當意外斷線時，客戶端會自動重新連線，值到最大重試次數。
- 退出指令：客戶端可以簡易指令退出與伺服器的連接。

### 技術細節

- 使用 Node.js 的 `net` 模組建立 TCP 連線。
- 使用事件驅動的程式設計模式處理連線、訊息接收和斷線事件。

> [!WARNING]
> 這是一個學習用程式，未實作安全性和擴展性功能。在實際應用中，請考慮實作更多安全和效能方面的功能。
