//requires
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/listItems';

const Schema = mongoose.Schema; 

const ListItemSchema = new Schema({
    instruction: {type: String},
    complete: {type: Boolean, default: false}
});

const ListOfItems = mongoose.model('List', ListItemSchema);

const bodyParser = require('body-parser');


//uses
app.use(bodyParser.json()); // AngularJS

app.use(express.static('server/public'));

// globals
// if process.env.PORT is undefined, use 5000
const PORT = process.env.PORT || 5000;

//attempt to connect
mongoose.connect(mongoURI, { useNewUrlParser: true });

/* function to respond to post request and save list to database */
app.post('/list', (req, res) => {
    console.log('in server side post');

    let listItemFromClient = req.body;
    
    const itemToAdd = new ListOfItems(listItemFromClient);

    itemToAdd.save().then(() => {
        console.log('item added', itemToAdd);
        res.sendStatus(201);
    }).catch( (error) => {
        console.log('error:', error);
        res.sendStatus(500);
    });
});// end post route

app.get('/list', (req, res) => {
    console.log('in server side get');

    ListOfItems.find({}).then( (foundListItems) => {
        res.send(foundListItems);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
}); //end get route


// spin up server
app.listen(PORT, () => {
    console.log('server up on:', PORT);
}) // end spin up server