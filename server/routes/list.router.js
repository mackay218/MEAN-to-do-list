const express = require('express');
const router = express.Router();


//require module containing schema
const ListOfItems = require('./../modules/itemSchemaModule.js');

console.log('in router');

//POST
/* function to respond to post request and save list to database */
router.post('/', (req, res) => {
    console.log('in server side post');
    console.log('item to add:', req.body);
    //get data from DOM via client
    let listItemFromClient = req.body;

    //create new instance of schema
    const itemToAdd = new ListOfItems(listItemFromClient);
    console.log('in router post:', itemToAdd);
    //send data to database
    itemToAdd.save().then(() => {
        console.log('item added in router', itemToAdd);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in router:', error);
        res.sendStatus(500);
    });
});// end post route


router.get('/', (req, res) => {
    console.log('in server side get');

    ListOfItems.find({}).then((foundListItems) => {
        res.send(foundListItems);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
}); //end get route

module.exports = router;