const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

const app = express();

const dbURI = "mongodb+srv://demha8444:demha8444@cluster0.fi6s3.mongodb.net/todo?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  Todo.find().sort({ createdAt: -1 })
  .then(result => {
    res.render('todo', { todos: result});
  })
  .catch(err => {
    console.log(err);
  });

});

app.post('/', (req, res) => {
  
    const todo = new Todo(req.body);
  
    todo.save()
      .then(result => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  });



  app.get('/item/:id', (req, res) => {
    const id = req.params.id;
    Todo.findById(id)
      .then(result => {
        res.render('details', { todo: result});
      })
      .catch(err => {
        res.redirect('todo')
      });
  });

  app.delete('/item/:id', (req, res) => {
    const id = req.params.id;
    
    Todo.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/' });
      })
      .catch(err => {
        console.log(err);
      });
  });