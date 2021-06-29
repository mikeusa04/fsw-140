const mysql2 = require('mysql2');
const express = require('express');
const customersRouter = express.Router();

const db = mysql2.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'salesorders'
  }
);

//Get all Customers
customersRouter.get('/', (req, res, next) => {
  let sql = `SELECT * FROM CUSTOMERS`;
  db.query(sql, (err, result)=> {
    if(err){
      return next(err)
    }
    res.send(result)
  })
});

//Filter by State
customersRouter.get('/:state', (req, res, next) => {
  let sql = `SELECT * FROM CUSTOMERS WHERE CUSTSTATE LIKE '${req.params.state}'`
  db.query(sql, (err, result) => {
    if(err){
      return next(err)
    }
    res.send(result)
  })
});

//Search by Name
customersRouter.get('/name/:name', (req, res, next) => {
  let sql = `SELECT * FROM CUSTOMERS WHERE CUSTNAME LIKE '${req.params.name}'`
  db.query(sql, (err, result) => {
    if(err){
      return next(err)
    }
    res.send(result)
  })
})

module.exports = customersRouter