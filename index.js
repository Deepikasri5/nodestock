// Stock market portfolio
var express = require('express');
const app=express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API KEY pk_d64eaebfd75d46cca270418ec524bfd9
// create call_api function
function call_api(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_d64eaebfd75d46cca270418ec524bfd9', { json: true}, (err, res, body) => {
        if(err) {return console.log(err);}  
        if(res.statusCode === 200){
            //console.log(body);
            finishedAPI(body);
        };
    });

};


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff";

// set handlebar index GET route
app.get('/', function(req, res) {
    call_api(function(doneAPI){
        res.render('home',{
            stock: doneAPI
        });
    }, "fb");
    
});

// set handlebar index POST routes
app.post('/', function(req, res) {
    console.log("hey request is"+ req);
    console.log("hey response is"+ res);
    call_api(function(doneAPI){
        //posted_stuff = req.body.stock_ticker;
        res.render('home',{
            stock: doneAPI,
        });
    }, req.body.stock_ticker);
    
});

//Create about page routes
app.get('/about.html', function(req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, ()=> console.log('Server listening on port'+ PORT));
