import express from 'express';
import notes from './routes/notes.js';
import mongoose from "mongoose";
import cors from 'cors';

const app = express()

//etag cache
app.disable('etag');
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});


// mongoose.connect ("mongodb+srv://bibit3_db_user:admin123@bismillah.f5tjqb7.mongodb.net/?appName=bismillah");

mongoose.connect("mongodb://bibit3_db_user:admin123@ac-txqxvt5-shard-00-00.f5tjqb7.mongodb.net:27017,ac-txqxvt5-shard-00-01.f5tjqb7.mongodb.net:27017,ac-txqxvt5-shard-00-02.f5tjqb7.mongodb.net:27017/test?ssl=true&replicaSet=atlas-gyijkk-shard-0&authSource=admin&retryWrites=true&w=majority");

// Post available for immediate use

//app.use((req, res, next)=> {
// if (!true(req)){
// next(new Error('Not Authorized'));
// return;
// }
// next();
//});

app.use(express.json());
app.use(cors());

app.use('/notes', notes);


app.get('/',(req, res)=>{
    res.send ('Hello Bibit')
});

app.get('/admin', (req, res) => {
    res.status(401).send('Bibit Fitriana!');
});

app.get('/say:moma', (req, res) => {
    res.send ('Bibit Fitriana Sign In!')
});

app.get('/say:greeting', (req, res) => {
    const { greeting } = req.params;
    res.send(greeting);
});


//app.use((err,req,res,next)=>{
// res.send('Error Occurred')
//});



app.use((err, req,res, next) => {
    res.status(500);
    res.json({
        result: 'fail',
        error: err.message,
    });
});

app.use((req,res, next) => {
    res.status(404);
    res.send({
        result: 'fail',
        error: `Page not found ${req.path}`
    });
});

app.listen(3000)
