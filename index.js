const express=require('express');
const app=express();
const port=8000;


app.use(express.urlencoded());


app.listen(port, function(err){

    if(err){
        console.log(`Error running in server : ${err}`);
    }
    console.log(`Server is running in port : ${port}`);
});

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs')
app.set('layout', './layouts/main');