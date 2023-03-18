require('dotenv').config({path:'./.env/config.env'})
const express= require('express')
const body_parser = require('body-parser')
const app = express()
const path = require('path')


const {connectDB}= require('./database/mongodb')
app.use(body_parser.urlencoded({extended:true}));

// connecting db
connectDB()

// routes
const paystack_api = require('./pay/route')
app.use('/v1', paystack_api)


module.exports = app
