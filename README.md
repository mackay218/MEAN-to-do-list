# MEAN-to-do-list

This is a To Do list app built in the MEAN stack.

Tasks can be added to the list and given a priority level.

Tasks currently in the list can be set to 'completed' 
by checking a box or 'undone' by unchecking the box.

Tasks can be deleted after completing confirmation dialog.

Tasks can be sorted / re-ordered in the list by 'completed' status 
or priority level.

## BUILT WITH
Mongodb
ExpressJS
AngularJS
NodeJS

## GETTING STARTED

Install Node Express and Mongoose in the project.
Make sure Mongo connects by running 'mongod' in a seperate terminal 
before starting the project with npm start.

## Completed Features

- [x] .gitignore
- [x] set up node - test connection
    - install node and express
- [x] install mongoose
- [x] source scripts and stylesheets
- [x] set up mongoose
- [x] set up post route client side
- [x] create item and sent to database
- [x] set up get route client side
- [x] set up post and get routes server side
- [x] use angular to append to DOM
- [x] change style for completed list items
- [x] add check box to trigger 'PUT' route and style change
- [x] schema in module
- [x] routes in router
- [x] create 'PUT' route for complete/checkbox list item
- [x] create 'DELETE' route and buttons 
- [x] reset form

    CSS
- [x] Background color of the page
- [x] font family and size
- [x] text color &or background color of tasks to show whether or not they have been        completed

    STRETCH GOALS
- [x] Implement Bootstrap to take the visuals of the page up a notch.
- [x] Create an 'are you sure: yes / no' option when [x] deleting a task. Once again, you can interpret this however you would      like.
- [x] Move the inputs into a form and use ng-submit so that the user can hit enter to       add a new task.
- [x] Add front-end validation to the 'make-a-task' form.
- [x] Add a category field for the task. Allow users to filter by task category.
    -dropdown menu for priority level in form
    - priority: {level: 1, name: 'high'} in schema;
    - apply class to list item inner container to change border color;
    - change ul to table sort by value in table cells
        -hide table cells by giving them a class with opacity and width set to 0;
    -second dropdown menu for sorting in list container
        -orderBy: 
            -priority or complete/undone
- [x] Adjust the logic so that completed tasks are brought to the bottom of the page,       where the remaining tasks left to complete are brought to the top of the list.

Next Steps

- [] check all/ complete all check box
- [] multiple lists
- [] login / database of users with personal to do lists 
    not accessible by other users.

Authors

- Daniel MacKay

Acknowledgments
