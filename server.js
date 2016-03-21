var express = require('express');
var app = express();
var low = require('lowdb');
var storage = require('lowdb/file-sync');
var db = low('db.json', { storage: storage });
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendfile('client/index.html');
});



app.post('/activity', function(req, res) {
    console.log(req.body)
    if (req.body.user_id !== null && req.body.session_id !== null) {
        db('activity').push({
            user_id: req.body.user_id,
            session_id: req.body.session_id,
            time: new Date()
        });
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});



app.get('/stats', function(req, res) {
	console.log(req.query);
	var startDate = req.query.start_date
	var endDate = req.query.start_date
    // console.log(db.object.activity)
    res.sendStatus(200);
});







// [2015-10-08T00:00:01] GET /stats?start_date=2015-10-05&end_date=2015-10-06 ->
//   {
//     num_sessions: 4,
//     unique_users: 3,
//     avg_sessions_per_user: 1.33
//   }










app.listen(3000, function() {
    console.log('App listening on port 3000!');
});