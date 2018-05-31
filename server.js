const request = require('request');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const app = express();

const gamesCollectionUrl = 'mongodb://localhost:27017/games';
const usersCollectionUrl = 'mongodb://localhost:27017/users';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.all("/*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.get('/api/getGames', (req,res) => {
    MongoClient.connect(gamesCollectionUrl, { useNewUrlParser: true }, (err,db) => {
        if (err) throw err;
        const dbo = db.db('games');
        dbo.collection('game').find({}).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
        db.close();
    });
});

app.post('/api/insertUser', (req,res) => {
    let dbObject = req.body;
    MongoClient.connect(usersCollectionUrl, { useNewUrlParser: true }, (err,db) => {
        if (err) throw err;
        const dbo = db.db('games');
        let query = { email: dbObject.email };
        dbo.collection('user').findOne(query, (err,result) => {
            if (err) throw err;
            if (result) {
                res.status(200).send(result);
                db.close();
            }
            else {
                insertUser(dbObject);
                res.status(201).send(req.body);
                db.close();
            }
        });
        
    });
});

app.post('/api/getBacklog', (req,res) => {
    let gameIds = req.body;
        MongoClient.connect(gamesCollectionUrl, {useNewUrlParser: true}, (err,db) => {
            if (err) throw err;
            const dbo = db.db('games');
            let query = constructQuery(gameIds);
            dbo.collection('game').find(query).toArray((err,result) => {
                if (err) throw err;
                res.send(result);
                db.close();
            });
        });
    
});

function insertUser(dbObject) {
    MongoClient.connect(usersCollectionUrl, (err,db) => {
        const dbo = db.db('games');
        dbo.collection('user').insertOne(dbObject, (err,res) => {
            if (err) throw err;
        });
        db.close()
    });
}

function constructQuery(gameIds) {
    let query = {'$or': []};
    gameIds.forEach(id => {
        query.$or.push({'_id': ObjectId(id)}) ;
    });
    return query;
}

//app.use('/',static('dist'));
app.listen(80, () => console.log('Listening on port 80!'));