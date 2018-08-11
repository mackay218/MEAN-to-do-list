const ToDoApp = angular.module('ToDoApp', []);

ToDoApp.controller('ToDoController' , function($http){
    console.log('in ToDoController');

    const tc = this;

    //empty array to hold list items
    tc.listOfItems = [];

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
    } //end completeItem


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
    }

    /* function to get to do list from server */
    //using a declaritive function
    //GET 
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
    }
    getListItems();
    
}); 

