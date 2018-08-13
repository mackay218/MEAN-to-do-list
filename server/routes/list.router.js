const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

//PUT
/* function to edit object in database */
router.put('/itemComplete/:id', (req, res) =>{
    console.log('update', req.params.id);

   ListOfItems.findOne({_id: req.params.id}).then((foundItem) => {
        console.log('item found:', foundItem);
        //console.log('item complete status:', foundItem.complete);
        if(foundItem.complete == true){
            foundItem.complete = false;
        }
        else if (foundItem.complete == false) {
            foundItem.complete = true;
        }
        console.log('item after check:', foundItem);
        foundItem.save().then((response) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
            console.log('error in router put:', error);
        });
   });
});//end complete item put route

//PUT90
/*function to confirm delete */
router.put('/itemConfirm/:id', (req, res) => {
    console.log('in update confirm:', req.params.id);
    ListOfItems.findOne({_id: req.params.id}).then((foundItem) => {
        console.log('item found:', foundItem.confirm);
        if(foundItem.confirm == true){
            foundItem.confirm = false;
        }
        else if(foundItem.confirm == false){
            foundItem.confirm = true;
        }
     
        foundItem.save().then((response) => {
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500);
        });
    });
});// end confirm delete put route
    
router.put('/', (req, res) => {
    console.log('server reset confirm');
    ListOfItems.find({}).then((foundListItems) => {
        for(let item of foundListItems){
            if(item.confirm == false){
                item.confirm = true;
            }
            item.save().then((response) => {
                res.sendStatus(200);
            }).catch((error) =>{
                res.sendStatus(500);
            });
        }
        
    });
});

//DELETE
/* function to delete item from DOM and database */
router.delete('/:id', (req, res) => {
    ListOfItems.findByIdAndRemove(req.params.id).then((deletedTask) => {
        console.log(deletedTask);
        res.sendStatus(200);
    }).catch((error) =>{
        res.sendStatus(500);
    });
});//end delete route

//GET
/* function to get data from database and send to client */
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