// install, import, create and run the server


import express from "express";
import mysql from "mysql2";


const server = express();
server.use(express.json());
// to run, a port number is required

const port = 1023;
const db = mysql.createPool({
    host: "localhost",
    port: 	8889,
    user: "root",
    password: "root",
    database: "Web24FirstDB",
    connectionLimit: 10
});

console.log(db);

server.listen(port, function(){
    console.log("THe server is now running in port no:", port);
});

// name: /hello
// respond with Hello!

server.get('/hello', function(req, res){
    console.log(req.query.name, req.query.age, req.query.city);
    res.json({ response: "Hello, " + req.query.name + " from " + req.query.city + " who is " + req.query.age + " years old" });
});


server.get("/jokes", function(req, res){
    let jokes = [
        {
            id: 1,
            setup: "I hope Elon Musk never gets into a scandal,",
            punchline: "Elongate would go on forever."
        },
        {
            id: 2,
            setup: "What is the most expensive streaming service?",
            punchline: "College."
        }
    ]

    res.json(jokes);
});

server.get("/students", function(req, res){
    let sqlQuery = "CALL `ShowAllStudents`()";
    db.query(sqlQuery, function(error, data){
        if(error){
            res.json({message: error})
        }
        else{
            res.json(data);
        }
    })
});

server.get("/students/inPerson", function(req, res){
    let sqlQuery = "CALL `ShowInPerson`()";
    db.query(sqlQuery, function(error, data){
        if(error){
            res.json({message: error})
        }
        else{
            res.json(data);
        }
    })
});

server.get("/students/:id", function(req, res){
    let sqlQuery = "CALL `FindStudentDetailsByID`(?)";
    db.query(sqlQuery, [req.params.id], function(error, data){
        if(error){
            res.json({message: error})
        }
        else{
            res.json(data);
        }
    })
});

server.get('/login', function(req, res){
    res.json({message: "recieve login credentials" + req.query.username + " " + req.query.password });
});

// POST API's

server.post('/login', function(req, res){
    console.log(req.body.data.username, req.body.data.password);
    res.json({message: "recieve login credentials " + req.body.data.username + " " + req.body.data.password });
});