const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

var jwt = require('jsonwebtoken');

app.use(bodyparser.json());


const connection = (x) => {
    return MongoClient.connect('mongodb://localhost:27017/AppTodoMariam', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('AppTodoMariam');
        x(db);
    })
} 

// app.get('/users', (req, res)=>{
//     connection(function(db))
// })



app.post('/auth/login', (req, res) => {
    //res.send(('this is login'));
    connection (db =>
        db.collection('users').findOne({email:req.body.email}, (err,result) => {
            if(result){
                if(req.body.password == result.password) {
                    let token = jwt.sign(result, 'my_pass');
                    res.send({message:'ok', token: token});
                }
                else {
                    res.send({message:'bad pass'});
                }        
            }
            else {
                res.send('user not found');
            }
        })
    )
})

app.post('/auth/register', (req, res) => {
    console.log(req.body)
    connection (db =>{
        db.collection('users').insert(req.body, (err, result)=>{
            res.send(result);
        })
})
})

app.listen(3000, err => {
    console.log('test');
}) 