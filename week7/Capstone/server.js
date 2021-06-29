/*in order to make this program work you have to install express.js, go to
client directory
1. npx create-react-app my-app

go to client folder and install axios 
1. npm i axios

go to package.json in client folder 
1.go all the way down
2.put proxy like this
 },
 "proxy": "http://localhost:9000"
}
because we are using a react-router in this ex. then we need to install it
1. npm i react-router-dom

install mysql2 in the main folder (practice1)
1.npm i mysql2

the npm i mysql is not working but if u want to fix it go to windows search bar, mysql installer-community,
open it, click on Reconfiguer, hit next, check mark the Use Legacy...etc then next, put ur password then next,
execute, finish.

1.npm i cors
-------------above installation for React
-------------Below for MongoDB
-------------Mix above and below for React and MongoDB
1. FullStackSQL folder, open its terminal
2. npm init -y then hit enter
3. in the new path type 
4. npm i express then hit enter or npm i --save express

now install nodemon.js
1. same assignment1 folder, open its terminal
2. npm install nodemon then hit enter

now everytime you want to run the program go to
1. open its terminal
2. nodemon then the file name like (nodemon server.js then enter)

 
1. go to the folder where you want to install it
2. open its terminal
3. npm i uuid

install boolean
1. npm i boolean

install morgan
1. npm i morgan

DO NOT INSTALL ANY OF THESE BELOW BECAUSE YOU ARE USING MySQL HERE INSTEAD OF MONGOOSE
install mongoose
1. npm i mongoose
because we creating token here for security and verification we need to install token
1. npm i jsonwebtoken
to create a hidden file to encript the password install dotenv
1. npm i dotenv
to work with token once it's been generated install express-jwt
1. npm i express-jwt
because we are hashing the password we need to install bcrypt
1. npm i bcrypt

to run this program go  to client directory, open its terminal, cd my-app,type npm start then enter, go assignment1 open its terminal,
type nodemon server.js then enter
*/




const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');
const morgan = require('morgan');


const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hr',
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database Connection Successful!")
})

app.get("/get", (req, res) => {
  let sqlSelect = "SELECT * FROM hr.employees;";
  db.query(sqlSelect, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});


app.post("/post", (req, res) => {
  // let sql = "INSERT INTO hr.employees SET ?";
  let post = {
      FIRST_NAME: req.body.FIRST_NAME,
      LAST_NAME: req.body.LAST_NAME,
     PHONE_NUMBER: req.body.PHONE_NUMBER,
     EMAIL: req.body.EMAIL,
     HIRE_DATE:  "2021-04-25",
     JOB_ID: "IT_PROG",
     SALARY: "17000.00",
     COMMISSION_PCT: "0",
     MANAGER_ID: "100",
     DEPARTMENT_ID: "90"

    //  EMPLOYEE_ID: req.body.EMPLOYEE_ID
  };
  let sql = "INSERT INTO employees SET ?";
  db.query(sql, post, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result)
  });
});

app.delete("/delete/:EMPLOYEE_ID", (req, res) => {
  let sql = `DELETE FROM hr.employees WHERE EMPLOYEE_ID = '${req.params.EMPLOYEE_ID}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send("Successfully Removed Employee!")
  });
});


app.put("/edit/:employeeId", (req, res) => {
  let updateFIRST_NAME = req.body.FIRST_NAME;
  let updateLAST_NAME = req.body.LAST_NAME;
  let updatePHONE_NUMBER = req.body.PHONE_NUMBER;
  let updateEMAIL = req.body.EMAIL;
  let udpateEMPLOYEE_ID = req.body.EMPLOYEE_ID;
  let sql = `UPDATE hr.employees SET 
  FIRST_NAME = '${updateFIRST_NAME}',
  LAST_NAME = '${updateLAST_NAME}',
  PHONE_NUMBER = '${updatePHONE_NUMBER}',
  EMAIL = '${updateEMAIL}',
  EMPLOYEE_ID = '${udpateEMPLOYEE_ID}'
      WHERE EMPLOYEE_ID = '${req.params.employeeId}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});

app.listen(9000, () => {
  console.log("Server is listening on localhost 9000")
})  