const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
// const  = require('')
var mongoose = require('mongoose');

const PORT = process.env.PORT || 3000
const app = express();
app.use(cors())

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())

//default router
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/front-end/index.html");
})
app.use(express.static(__dirname + '/front-end'));
//mongoDB setup
const db = require('./setup/myurl').mongoUrl

//Attempt to connect to DB
mongoose.connect(db).then(() => {
    console.log('mongoDB connect successfull');
}).catch((err) => {
    console.log(`mongoDB not connect ${err} `);
})

//schema
const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    photoURL: String,
    message: String,
})

//collection  
const Message = new mongoose.model("Message", messageSchema);

// insert
app.post('/message', (req, res) => {
    // console.log(req.body);
    var mess = new Message({
        email: req.body.email,
        photoURL: req.body.photoURL,
        message: req.body.message
    })
    mess.save();
    res.send(req.body)
})

// find
app.get('/getMessage', (req, res) => {
    Message.find({}, (err, docs) => {
        mess = docs;
        res.send(docs)
        // console.log(docs);
    });
})



app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})