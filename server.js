const request = require('request');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const url = 'mongodb://localhost:27017/games';

app.get('/api/getGames', (req,res) => {
    res.header('Access-Control-Allow-Origin','*');
    MongoClient.connect(url, (err,db) => {
        if (err) throw err;
        console.log('Connected to db...');
        const dbo = db.db("games");
        dbo.collection("game").find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
        console.log('Closing db...');
        db.close();
    });
});

//app.use('/',static('dist'));
app.listen(80, () => console.log('Listening on port 80!'));