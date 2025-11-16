const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const dotenv = require("dotenv").config();

const bodyParser = require("body-parser");

const app = express()
const port = process.env.PORT || 5000;

// Connect to MongoDB before starting server
connectToMongo();


app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(cors())
app.use(express.json());


// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/offers', require('./routes/offers'))
app.use('/api/studentoffers', require('./routes/studentoffers'))


app.listen(port, '0.0.0.0', () => {
  console.log(`InternDiary backend listening at http://localhost:${port}`)
})