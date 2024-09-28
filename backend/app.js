require('dotenv').config();  // 使用 dotenv
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // 使用環境變數作為 port number, 若無則預設為 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})