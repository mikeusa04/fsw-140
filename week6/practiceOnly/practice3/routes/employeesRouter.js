const mysql2 = require('mysql2');
const express = require('express');
const employeesRouter = express.Router();

const db = mysql2.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'salesorders'
  }
);

//Get all Employees
employeesRouter.get('/all', (req, res, next) => {
  let sql = `SELECT * FROM EMPLOYEES`;
  db.query(sql, (err, result)=> {
    if(err){
      return next(err)
    }
    res.send(result)
  })
});

//Filter by State
employeesRouter.get('/:state', (req, res, next) => {
  let sql = `SELECT * FROM EMPLOYEES WHERE EMPSTATE LIKE '${req.params.state}'`
  db.query(sql, (err, result) => {
    if(err){
      return next(err)
    }
    res.send(result)
  })
})

module.exports = employeesRouter