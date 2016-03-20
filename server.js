var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

// Add middlewares
router.use(bodyParser.json({ limit: '10mb' }))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(methodOverride())

app.get('/', function(req, res) {
    res.sendfile('client/index.html');
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});


// Create database
var db

// Expose database
router.db = db