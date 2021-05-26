const express = require('express')
const env = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


env.config()
const app = express()
app.use(bodyParser())
let config = process.env;

// const PORT = 3000;

mongoose
  .connect(
    //"mongodb://localhost:27017/test",
    `mongodb://ecommerce1:ecommerce1@localhost:27018/ecommerce1`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(
      `Database connected:`
    );
  });


app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello from express"
    })
    console.log(res)
})

app.post('/data', (req, res) => {
    res.status(200).json({
        message: req.body
    })
})

// app.get
app.listen(config.PORT, () => {
  console.log(`Server is running on ${config.PORT}`); // awoiding hard-code
});