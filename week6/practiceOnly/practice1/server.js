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
const morgan = require('morgan');
const app = express();
const mysql2 = require('mysql2');

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Database
const db = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'todoApp'
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL Database Connection Established Successfully!');
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE todoApp'
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }

        console.log(result);
        res.send('todoApp Database Created Successfully!');

    })
})

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE todos (id INT auto_increment, title VARCHAR(50), description VARCHAR(250), imageURL VARCHAR(250), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }

        console.log(result);
        res.send('todoApp table Created Successfully!');

    })
})

app.get('/inserttodo1', (req, res) => {
    let todo = {title: 'Goto the beach', description: 'Explore and pickup sea shells', imageURL: 'https://images.unsplash.com/photo-1614357235247-99fabbee67f9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'};
    let sql = 'INSERT INTO todos SET ?'
    db.query(sql, todo, (err, result) => {
        if(err) {
            throw err;
        }

        console.log(result);
        res.send('todoApp inserted 1 Successfully!');

    })
})

app.get('/inserttodo2', (req, res) => {
    let todo = {title: 'Clean the dishes', description: 'The dishes need done', imageURL: 'https://images.unsplash.com/photo-1514852451047-f8e1d1cd9b64?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2012&q=80'};
    let sql = 'INSERT INTO todos SET ?'
    db.query(sql, todo, (err, result) => {
        if(err) {
            throw err;
        }

        console.log(result);
        res.send('todoApp inserted 2 Successfully!');

    })
})

app.get('/gettodos', (req, res) => {
    let sql = 'SELECT * FROM todos';
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }

        console.log(result);
        res.send(result);

    })
})

app.get('/gettodos/:id', (req, res) => {
    let sql = `SELECT * FROM todos WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }

        console.log(result);
        res.send('SELECT Command With WHERE Clause Executed Successfully');

    })
})

app.get('/updatetodostitle/:id', (req, res) => {
    const newTitle = 'Changed!';
    let sql = `UPDATE todos SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }

        console.log(result);
        res.send('Update Command Executed Successfully');

    })
})

app.get('/updatetodosdescription/:id', (req, res) => {
    const newdescription = 'Changed!';
    let sql = `UPDATE todos SET description = '${newdescription}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }

        console.log(result);
        res.send('Update Command Executed Successfully');

    })
})

app.get('/deletetodo/:id', (req, res) => {
    let sql = `DELETE FROM todos WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }

        console.log(result);
        res.send('Delete Command Executed Successfully');

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