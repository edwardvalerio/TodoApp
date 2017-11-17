
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
 mongoose.Promise = require('bluebird');
var data = [{item: 'get milk'}, {item:'go to bank'}, {item: 'walk dog'}];
var uri = 'mongodb://unova87:todo06@ds259305.mlab.com:59305/eddyvtodo';


var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

// connect to DB
mongoose.connect(uri,options, function(error) {
 if(error) {  console.log('error connecting'); }
});

// schema.

var todoSchema = new mongoose.Schema({
  item: String,
  id: String
});

var Todo =  mongoose.model('Todo', todoSchema);

var encodeBody = bodyParser.urlencoded({extended: false });

module.exports = function(app) {

  app.get('/todo', function(req, res) {

  // data from mongo

   Todo.find({}, function(err, data){


     res.render('todo', {todos: data});

   });

  });


     app.get('/', function(req, res) {

  // data from mongo

   Todo.find({}, function(err, data){


     res.render('todo', {todos: data});

   });

  });




  app.post('/todo', encodeBody, function(req, res) {

    var newTodo = Todo(req.body).save(function(err,data){
      if(err) {  throw err; }
      else {
        console.log('saved');
        res.json(data);
      }});



  });


  app.delete('/todo/:id', function(req, res) {

   // delete from mongo.

   Todo.find({id: req.params.id }).remove(function(err,data){

     if(err) throw err;

     res.json(data);

   });





  });

};
