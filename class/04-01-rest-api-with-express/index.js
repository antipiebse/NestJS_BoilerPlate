const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/hello',(req,res) => {
    res.send('gogoogogoog');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})