const request = require('request');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const gamesCollectionUrl = 'mongodb://localhost:27017/games';
const usersCollectionUrl = 'mongodb://localhost:27017/users';

app.use(express.json());
app.use(express.urlencoded());

app.get('/api/getGames', (req,res) => {
    res.header('Access-Control-Allow-Origin','*');
    MongoClient.connect(gamesCollectionUrl, (err,db) => {
        if (err) throw err;
        console.log('Connected to db...');
        const dbo = db.db('games');
        dbo.collection('game').find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
        console.log('Closing db...');
        db.close();
    });
});

app.post('api/insertUser', (req,res) => {
    res.header('Access-Control-Allow-Origin','*');
    let object = req.body;
    console.log(object);
    // MongoClient.connect(usersCollectionUrl, (err,db) => {
    //     if (err) throw err;
    //     console.log('Connected to db...');
    //     const dbo = db.db('games');
    //     dbo.collection('user').insertOne(object, (err,res) => {
    //         if (err) throw err;
    //         console.log('1 document inserted');
    //     });
    //     console.log('Closing db...');
    //     db.close();
    // });
});

//app.use('/',static('dist'));
app.listen(80, () => console.log('Listening on port 80!'));