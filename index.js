// Import required libraries
const express=require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const passport=require('passport');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session');
const passportLocal=require('./config/passport-local-strategy');
// Import custom modules or routes
const db=require('./config/mongoose');
// Create an Express app
const app=express();


// Middleware setup
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(methodOverride('_method'));


app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine', 'ejs');
app.set('layout', './layouts/main');


// Passport middleware setup 

// setting up a session middleware in an Express application
app.use(session({
    name: 'EmployeeReviewSystem',
    // change the secret before deployment in production mode
    secret: 'empreview',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
     
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



app.use('/',require('./routes'));


// Start the server
const port=8000;
app.listen(port, function(err){

    if(err){
        console.log(`Error running in server : ${err}`);
    }
    console.log(`Server is running in port : ${port}`);
});