// Add Express
const express = require("express");
const bodyParser = require('body-parser')
// Initialize Express
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const Bot = require('./models/bot');


// body parser for the post requests
app.use(bodyParser.urlencoded({ extended: true }));

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// addBot
app.post('/addBot/:id', function(req, res) {
  const id = req.params.id ;
  const name = req.body.name
  
  async function connect() {
    await mongoose.connect('mongodb+srv://shepherd:6322@cluster0.xow6jeh.mongodb.net/?retryWrites=true&w=majority')
    .then(dbRes => {
      const bot = new Bot({
        id: id, 
        name: req.body.name,
    })
    bot.save()
    .then(bot => {
      
      res.json({"response":bot});
  })
    })
    
  }
   connect();

  
  
});

// add command
app.post('/addCommand/:id', function(req, res, next) {
  const id = req.params.id ;
  console.log(id)

  console.log(req.body.command)
  async function connect() {
    await mongoose.connect('mongodb+srv://shepherd:6322@cluster0.xow6jeh.mongodb.net/?retryWrites=true&w=majority')
    .then(dbRes => {
      Bot.findOneAndUpdate({id: id}, {command: req.body.command})
  .then(response => {

      res.end()
  })

    })
    
  }
   connect();

  
});

// addResponse
app.post('/addResponse/:id', function(req, res, next) {
  const id = req.params.id ;
  
  async function connect() {
    await mongoose.connect('mongodb+srv://shepherd:6322@cluster0.xow6jeh.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      Bot.findOneAndUpdate({id: id}, {response: req.body.response})
  .then(() => {

      res.end()
  })
    })
    
  }
   connect();

  
});

//bot
app.get('/bot/:id', function(req, res, next) {
  const id = req.params.id ;

  async function connect() {
    await mongoose.connect('mongodb+srv://shepherd:6322@cluster0.xow6jeh.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      Bot.findOne({id: id})
  .then(bot => {
    res.json({"response": bot})
    })
    })
    
  }
   connect();

  
});

//bots
app.get('/bots', function(req, res, next) {
  async function connect() {
    await mongoose.connect('mongodb+srv://shepherd:6322@cluster0.xow6jeh.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      Bot.find()
  .then(bots => {
    res.json({"response": bots})
  })
    })
    
  }
   connect();

 
});


// getCommands
app.get('/getCommands/:id', function(req, res, next) {
  const id = req.params.id ;
  
  async function connect() {
    await mongoose.connect('mongodb+srv://shepherd:6322@cluster0.xow6jeh.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      Bot.findOne({id: id})
  .then(response => {

      res.json({"response": response.command})
  })
    })
    
  }
   connect();

  
});


// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});
