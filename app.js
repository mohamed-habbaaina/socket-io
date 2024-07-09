const express = require('express')
const app = express()
const port = 3001
const { Server } = require("socket.io");

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const io = new Server({ /* options */ });

io.on("connection", (socket) => {
  // ...
});




io.listen(4000);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
