const dotenv = require('dotenv')
dotenv.config()
const mysql = require('mysql2')

let conexion = mysql.createConnection({
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password:process.env.DB_PASS
  });

  conexion.connect((error) => {
    if(error){
        console.log(error) 
    }else{
        console.log("conexion establecida con base de datos")
    }
  })

 
  module.exports = conexion;