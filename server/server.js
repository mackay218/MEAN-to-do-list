//requires
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/listItems';

const Schema = mongoose.Schema; 

const ListItemSchema = new Schema({
    instruction: {type: String}
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
    }).then( (response) => {
    console.log('response:', response);
    
    let listItem = req.body;

    //create new object instance of schema
    const itemToAdd = new ListItemSchema(listItem);
    
    itemToAdd.save().then(() => {
        console.log('item added', itemToAdd);
        res.sendStatus(201);
    }).catch((error) => {
        //error
        console.log(error);
        res.sendStatus(500);
    });

}).catch( (error) => {
    console.log('error:', error);
});// end post route

app.get('/list', (req, res) => {
    console.log('in server side get');
}).then( (response) => {
    ListOfItems.find({}).then( (foundListItems) => {
        res.send(foundListItems);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
}).catch( (error) => {
    console.log('error:', error);
}); //end get route


// spin up server
app.listen(PORT, () => {
    console.log('server up on:', PORT);
}) // end spin up server