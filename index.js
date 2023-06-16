const express=require('express');
const app=express();
const port=8000;
const bodyParser = require('body-parser');
const expressLayouts=require('express-ejs-layouts');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./assets'));



app.listen(port, function(err){

    if(err){
        console.log(`Error running in server : ${err}`);
    }
    console.log(`Server is running in port : ${port}`);
});

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs')
app.set('layout', './layouts/main');

app.use('/',require('./routes'));