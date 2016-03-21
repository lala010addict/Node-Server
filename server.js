var express = require('express');
var app = express();
var low = require('lowdb');
var storage = require('lowdb/file-sync');
var db = low('db.json', { storage: storage });
var bodyParser = require('body-parser');
var _ = require('lodash');

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
    var startDateSplit = req.query.start_date.split("-");
    var startDate = new Date(startDateSplit[0], startDateSplit[1] - 1, startDateSplit[2]);
    // console.log(startDate);

    var endDateSplit = req.query.end_date.split("-");
    var endDate = new Date(endDateSplit[0], endDateSplit[1] - 1, endDateSplit[2]);
    // console.log(endDate);
    var results = _.filter(db.object.activity, function(a) {
        var time = new Date(a.time);

        return time >= startDate && time <= endDate

        return hitDateMatches.length > 0;
    });
    // console.log(results);

    var num_sessions = results.length;
    // console.log(num_sessions)


    var findUniq = function(results) {
        var users = [];
        for (var i = 0; i < results.length; i++) {
            console.log(_.indexOf(users, results[i].user_id))
            if (_.indexOf(users, results[i].user_id) === -1) { users.push(results[i].user_id) }

        }
        return users.length;

    }

    var unique_users = findUniq(results);
    // console.log('unique_users', unique_users)
    var avg_sessions_per_user = num_sessions / unique_users;

    var obj = {
        unique_users: unique_users,
        num_sessions: num_sessions,
        avg_sessions_per_user: avg_sessions_per_user
    };

    console.log(obj)

    res.status(200).send(obj)
});




app.listen(3000, function() {
    console.log('App listening on port 3000!');
});