// MVC Library for node.js
// index.js under app
const express = require('express');
const bodyParser = require('body-parser')
const events = require('events')

const brandRouter = require('./routes/brand');

const productController = require('./routes/product');

// middlewares
const appKeyMiddleware = require('./lib/auth/appKeyMiddleware');

const fsErrorMiddleware = require('./lib/errors/fsErrorMiddleware');

//const oktaAuthRequired = require('./lib/auth/oktaAuth');

// create express application
const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log('Middleware 1', req.url)
    req.myData = 'My App Data'
    next(); // forward call to next middleware/router
})

// GET / 
app.get('/', function(req, res) {
    console.log(' home page ')
    res.send('hello node')
})

// custom middleware
app.use(function (req, res, next) {
    console.log('Middleware 2', req.url)
    next(); // forward call to next middleware/router
})

// middleware 
app.use('/api', brandRouter);

app.use('/api/products/:id', productController.getProduct)
app.use('/api/products', productController.getProducts)

app.use(function (req, res, next) {
    console.log('Middleware 3', req.url)
    next(); // forward call to next middleware/router
})

// localhost:8080/info?city=BLR&state=KA&APP_KEY=ABCDEF
app.get('/info', appKeyMiddleware, function(req, res) {
    console.log('info api called')
    const city = req.query.city;
    // const {city, state} = req.query
    res.send(' your city ' + city + ' ' + 
                           req.query.state);
})

app.get('/time', function(req, res) {
    res.json({
        time: new Date()
    })
})

app.get('/throw', function (req, res) {
    //throw new Error('exception raised');
    throw new Error('fs : file not found');
})

app.get('/timer', function (req, res){
    console.log('start ');
    setTimeout( function() {
        console.log('timer');
        return res.json({timeout: true})
    }, 2000)
    console.log('end')
})

app.get('/info2', function(req, res){
    res.write('hello'); // partial content
    res.write('world'); // partial content
    res.end(); // close the connection
})

app.get('/interval', function(req, res){
    // closing timer and connection both needed

    const myEvent = new events.EventEmitter();

    const timer = setInterval(function() {
        let r = Math.random()
        console.log('Interval ', r)

        if (r > 0.3) {
            myEvent.emit('new_number', r)
        } else {
            myEvent.emit('close')
        }

    }, 2000);

    // listen
    myEvent.on('new_number', function(r) {
        res.write(" number " + r + " <br />")
    })

    myEvent.on('close', function() {
        clearInterval(timer)
        res.end();
        console.log('timer, connection closed')
    })
})


app.get("/instance", function(req, res){
    res.json({
        pid: process.pid
    })
})


app.get("/infinite", function(req, res){
    while(true) {
        for(var i; i < 100000; i++) {
            
        }
    }
})




// app.get('/secure', oktaAuthRequired, (req, res) => {
//     res.json(req.jwt);
//   });




app.use(fsErrorMiddleware)

// error middleware, special function with 4 arguments
app.use(function(error, req, res, next) {
    console.log("Error happended here", error)
    //TODO: Log the exception
    res.status(500).json({
        error: 500,
        reason: 'Server error',
        stackTrace: error
    })
})

//common js modules
// default export
module.exports = app;