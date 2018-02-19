// ########################CONFIG########################

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/restfulTasksProject/dist' ));

// ########################################################


// ########################MONGOOSE########################

mongoose.connect('mongodb://localhost/restful_task_api')

var TaskSchema = new mongoose.Schema({
  title: String,
  description: {type:String, default: ''},
  completed: {type:String, default:false},
}, {timestamps: true});

mongoose.model('task', TaskSchema);
var Task = mongoose.model('task');
// ########################################################

// ########################Routes########################
// Root Request
//get all tasks
app.get('/tasks', function(req, res) {
    Task.find({}, function(err, data) {
        if (err) {
          console.log('got an error');
        res.json({error: err});
        }
        else {
        console.log('got to the data');
        res.json({data: data});
      }
  })
})

//new task
app.post('/new', function(req, res) {

  var newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,

   })
  newTask.save(function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully added a task');
      res.json({success: results});
      }
  })
})
//delete task
app.delete('/delete/:id', function(req, res) {
   Task.findByIdAndRemove(req.params.id, function(err, results) {
     if(err) {
       console.log(err);
     } else {
       console.log('successfully deleted');
       res.json({success:results})
     }
   })
})
//show one task
app.get('/tasks/:id', function(req, res) {
  Task.findById(req.params.id, function(err, data) {
    if(err) {
      console.log(err);
    } else {
      console.log('successfully displaying one task');
      res.json(data)
    }
  })
})

//update task
app.put('/update/:id', function(req, res) {
    Task.findById(req.params.id, function(err, task) {
      if (err) {
        console.log("error updating task");
      } else {
        task.title = req.body.title,
        task.description = req.body.description,
        task.save(function(err, task) {
          if(err) {
            console.log('something went wrong');
            res.send(err);
          }  else {
          console.log('updated task')
          res.json({success: task})
        }
      })
    }
  })
})

//########################Start Server########################
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Tasks listening on port 8000");
})
