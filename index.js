// import package
const express = require('express');
const dotenv = require('dotenv');
const createError = require('http-errors');
const initGitIgnore = require('init-gitignore');
const cors = require('cors');
const path = require('path');

// starting configuration and middleware
const app = express();
dotenv.config()  //init env file
app.use(express.static(path.join(__dirname, "public")))//make public folder accessble for node
// app.use('/uploads', express.static('uploads')); //serve upload folder file
initGitIgnore.Node() // statement for init git ignore file

// express middleware
app.use(express.json());  //this middleware will conver req.body into json

// cors middleware
// cors option
const corsOption = {
    origin: "*",  //allow all web site
    /*
    ---Configures the Access-Control-Allow-Origin CORS header. ---

    Boolean - set origin to true to reflect the request origin, as defined by req.header('Origin'), or set it to false to disable CORS.
    String - set origin to a specific origin. For example if you set it to "http://example.com" only requests from "http://example.com" will be allowed.
    RegExp - set origin to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern /example\.com$/ will reflect any request that is coming from an origin ending with "example.com".
    Array - set origin to an array of valid origins. Each origin can be a String or a RegExp. For example ["http://example1.com", /\.example2\.com$/] will accept any request from "http://example1.com" or from a subdomain of "example2.com".
    Function - set origin to a function implementing some custom logic. The function takes the request origin as the first parameter and a callback (which expects the signature err [object], allow [bool]) as the second.
    */
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    /*
    ---Configures the Access-Control-Allow-Headers CORS header.---
    */
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    /*
    allow specifyed methods
    */
    optionSuccessContinue: 200  //specify code for success
}

app.use(cors(corsOption));

// set view engin 
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// routers
app.get('/', async (req, res, next) => {
    res.render("uploadMultipleImage.ejs");
});

require('./routes/uploadMaltipleImage.routes')(app);

// error middleware
/*
this middleware called when node server not found in router 
and give response of not found 
*/
app.use(async (req, res, next) => {
    next(createError.NotFound())
});

app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// server start
app.listen(process.env.PORT, () => {
    console.log('Server Connect');
})