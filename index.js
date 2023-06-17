const express=require('express');
const db=require('./config/mongoose');
const app=express();
const port=8000;
const bodyParser = require('body-parser');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./assets'));



app.listen(port, function(err){

    if(err){
        console.log(`Error running in server : ${err}`);
    }
    console.log(`Server is running in port : ${port}`);
});

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

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs')
app.set('layout', './layouts/main');

app.use('/',require('./routes'));