var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

// ports openshift

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// set up templating
app.set('view engine', 'ejs');
// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

//listen to port
app.listen(port, ip);
console.log('listening to port 8080');
