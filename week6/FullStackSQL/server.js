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
install mysql2 in the main folder (FullStackSQL)
1.npm i mysql2
the npm i msql is not working but if u want to fix it go to windows search bar, mysql installer-community,
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
const app = express();
const morgan = require('morgan');
const mysql2 = require('mysql2');

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// create a Database connection
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicles',
    default: 'vehicles', // this will make u connect to vehicles database only and not to the entire databases
});

// Connect
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL Database Connection Established Succesfully');
});

// Create a DB
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE vehicles"
    // Run the SQL Command
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('vehicles Database Created Successfully!');
        //console.log('Database Created Successfully')
    })
})

// Create Table
app.get('/createTable', (req, res) => {
    let sql = "CREATE TABLE inventory (id INT auto_increment, make VARCHAR(50), model VARCHAR(50), year INT, PRIMARY KEY(id))" // we made the id column as a primary key
    // Run the SQL Command
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('Table inventory Created Successfully!');
        //console.log('Table Created Successfully')
    })
})

// Insert row1
app.get('/insertrow1', (req, res) => {
    let post = {make: 'Ford', model: 'Raptor', year: 2019};
    let sql = "INSERT INTO inventory SET ?"
    // Run the SQL Command
    db.query(sql, post, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(`${post.make} Inserted Successfully`);
        //or res.send('First Row Inserted Successfully')
        //console.log('First Row Inserted Successfully')
    })
})

// Insert row2
app.get('/insertrow2', (req, res) => {
    let post = {make: 'Dodge', model: 'Charger', year: 2021};
    let sql = "INSERT INTO inventory SET ?"
    // Run the SQL Command
    db.query(sql, post, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(`${post.make} Inserted Successfully`);
        //or res.send('Second Row Inserted Successfully')
        //console.log('Second Row Inserted Successfully')
    })
})

// SELECT Command or Get All Vehicles
app.get('/getAll', (req, res) => {
    let sql = 'SELECT * FROM inventory';
    // Run the SQL Command
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(result);
        //console.log('SELECT Command Executed Successfully')
    })
})

// Get By id
app.get('/getVehicle/:id', (req, res) => {
    let sql = `SELECT * FROM inventory WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(`${sql} - Executed`);
    })
})

// Update
app.get('/updaterowmake/:id', (req, res) => {
    let newMake = 'Changed!';
    let sql = `UPDATE inventory SET make = '${newMake}' WHERE id = ${req.params.id}`;
    //Run the SQL Command
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(`${sql} - Executed`);
        //console.log('UPDATE Command Executed Successfully!')
    })
})

// Update
app.get('/updaterowmodel/:id', (req, res) => {
    let newModel = 'Changed!';
    let sql = `UPDATE inventory SET model = '${newModel}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(`${sql} - Executed`);
        //console.log('UPDATE Command Executed Successfully!')
    })
})

app.get('/deleterow/:id', (req, res) => {
    let sql = `DELETE FROM inventory WHERE id = ${req.params.id}`;
    // Run the SQL Command
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(`${sql} - Executed`);
        //console.log('DELETE Command Executed Successfully!')
    })
})

// Error Handling
app.use((err, req, res, next) => {
    return res.send({errMsg: err.message});
});

// Listen to port 9000
app.listen(9000, () => {
    console.log('Server listening to port 9000');
});