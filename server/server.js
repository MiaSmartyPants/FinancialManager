const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const PORT = 5050;
const cors = require('cors')


app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.post('/userinfo', db.addUserInfo)
app.post('/postgoals', db.addGoal)
app.post('/goals', db.getGoals)
app.post('/addtransaction', db.addTransaction)
app.post('/transactions', db.getTransactions);



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })