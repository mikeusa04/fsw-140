const express = require('express')
const mysql2 = require('mysql2')
const productsRouter = express.Router()

const db = mysql2.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'salesorders'
  }
);

//Get All Products
productsRouter.get('/', (req, res, next) => {
  let sql = `SELECT * FROM PRODUCTS`
  db.query(sql, (err, result) => {
    if(err){
      return next(err)
    }
    res.send(result)
  })
})

//Search by Name
productsRouter.get('/search/:name', (req, res, next) => {
  let sql = `SELECT * FROM PRODUCTS WHERE PRODUCTNAME LIKE '%${req.params.name}%'`
  db.query(sql, (err, result) => {
    if(err){
      return next(err)
    }
    res.send(result)
  })
})


module.exports = productsRouter