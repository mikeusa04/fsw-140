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
const mysql2 = require('mysql2');
const app = express();

const db = mysql2.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'salesorders'
  }
);

db.connect((err) => {
  if(err) {
    console.log(err)
  }
  console.log('Successfully connect to SQL DB.')
});

app.use(express.json());

app.use('/employees', require('./routes/employeesRouter'));
app.use('/customers', require('./routes/customersRouter.js'));
app.use('/products', require('./routes/productsRouter'));

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "Unauthorized Error"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
});

app.listen(9000, () => {
  console.log("Server is running on Port : 9000")
});