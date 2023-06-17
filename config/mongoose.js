// require the linrary
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/EmployeeReviewSystemDB');

//when mongo is connected , that connection gives us an access to database
// acquire the connection (to check if it is successfully)
const db=mongoose.connection; 

//if there is an error this will print error
db.on('error', console.error.bind(consolse, 'error connecting to db'));

//if it is up and running print the message
db.once('open', function(){
    console.log('Successfully connected to the database');

});