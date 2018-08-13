//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const listRouter = require('./routes/list.router.js');

//uses
app.use(bodyParser.json()); // AngularJS

app.use('/list', listRouter);

app.use(express.static('server/public'));

// globals
// if process.env.PORT is undefined, use 5000
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/listItems';

//attempt to connect
mongoose.connect(mongoURI, { useNewUrlParser: true });

/*success or failure*/
//success
mongoose.connection.on('open', () => {
    console.log('Connected to Mongo');
});
//failure
mongoose.connection.on('error', (error) => {
    console.log('ERROR CONNECTING TO MONGO', error);
});

// spin up server
app.listen(PORT, () => {
    console.log('server up on:', PORT);
}) // end spin up server