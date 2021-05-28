const express = require('express')
const env = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./router/index')

env.config()
const app = express()
app.use(bodyParser())
app.use('/api', userRoutes)

let config = process.env;

// const PORT = 3000;

mongoose
  .connect( 
    `mongodb://${config.MONGO_USER}:${config.MONGO_PASS}@${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log(`Database connected:  `);
  });

  
// app.get
app.listen(config.PORT, () => {
  console.log(`Server is running on ${config.PORT}`); // awoiding hard-code
});