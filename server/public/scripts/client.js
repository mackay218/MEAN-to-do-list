const ToDoApp = angular.module('ToDoApp', []);

ToDoApp.controller('ToDoController' , function($http){
    console.log('in ToDoController');

    const tc = this;

    //empty array to hold list items
    tc.listOfItems = [];

    //array to hold priority options 
    tc.priorityLevels = [{level: 1, name: 'high'}, {level: 2, name: 'medium'}, {level: 3, name: 'low'}];

    //array to hold sort options
    tc.categories = ['priority', 'complete']

    /* function to post new to do item from DOM to server */
    //function should be a function expression
    //POST
    tc.addListItem = function(itemToAdd){
        console.log('in addListItem');
        console.log('is client Post:', itemToAdd);
        $http({
            method: 'POST',
            url: '/list',
            data: itemToAdd
        }).then(function(response){
            console.log(itemToAdd);
            //call get request
            getListItems();
            tc.reset();
        }).catch(function(error){
            console.log('error in client post:', error);
            alert('unable to post item');
        });
    }

    //PUT
    /* function to change status of items to completed */
    tc.completeItem = function(itemID){
        $http({
            method: 'PUT',
            url: '/list/itemComplete/' + itemID
        }).then(function(response){
            console.log('client side put:', itemID);
            getListItems();
        }).catch(function(error){
            console.log('PUT request error:', error);
        });
    }; //end completeItem

    //PUT
    /* function to ask for confirmation of delete */
    tc.areYouSure = function(itemID){
        $http({
            method: 'PUT',
            url: '/list/itemConfirm/' + itemID
        }).then( function(response){
            console.log('client side put confirm:', itemID);
            getListItems();
        }).catch(function(error){
            console.log('error in confirm put:', error);
        });
    }; //end areYouSure

    //DELETE
    /* function to delete item */
    tc.deleteItem = function(itemID){
        $http({
            method: 'DELETE',
            url: '/list/' + itemID
        }).then(function(response){
            console.log('deleted:', itemID);
            getListItems();
        }).catch(function(error){
            console.log('DELETE request error', error);
        });
    };//end deleteItem

    //GET 
    /* function to get to do list from server */
    //using a declaritive function
    function getListItems(){
        console.log('in getListItems');

        $http({
            method: 'GET',
            url: '/list'
        }).then(function(response){
            tc.listOfItems = response.data;
        }).catch(function(error){
            console.log('error in client get:', error);
        });
    }; //end getListItems

    tc.form = {};

    /* function to reset form */
    tc.reset = function(){
        console.log('in reset form');
        tc.itemToAdd.instruction.$setPristine;
        tc.itemToAdd.instruction = '';
        //tc.itemToAdd.priority.selectedIndex = 1;
    }//end reset

    //PUT
    /*function to hide confimation dialog elements on page refresh */
    tc.resetConfirm = function(){
        $http({
            method: 'PUT',
            url: '/list'
        }).then(function(response){
            console.log(response);
            getListItems();
        }).catch(function(error){
            console.log('error in client put:', error);
        });
    }; //end resetConfirm

    tc.resetConfirm();

    /*function to sort tasks by category: priority */
    tc.sortChange = function(sortTerm){
        console.log('in sortChange');
        if(sortTerm == 'priority'){
            tc.term = 'priority.level';
        }
        else if(sortTerm = 'complete'){
            tc.term = 'complete';
        }
        console.log('sortTerm:', tc.term);
    }; //end sortChange

}); 

