const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const router = require('./Routers/userRouter');
const path = require('path')
const connection = require('./database/db')


app.use(express.static('public'))

app.set('view engine', 'ejs');

app.set("views", path.join(__dirname,"views"))

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use("/", router)

app.listen(5000,function(){
console.log(`servidor creado  http://localhost:${process.env.PORT}`)
})
