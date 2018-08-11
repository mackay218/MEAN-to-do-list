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

