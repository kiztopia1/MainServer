// Add Express
const express = require("express");

// Initialize Express
const app = express();

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// addBot
app.post('/addBot/:id', function(req, res, next) {
  const id = req.params.id ;

  const bot = new Bot({
      id: id, 
      name: req.body.name,
  })
  bot.save()
  .then(bot => {

      res.end();
  })
});

// add command
app.post('/addCommand/:id', function(req, res, next) {
  const id = req.params.id ;
  console.log(id)
  Bot.findOneAndUpdate({id: id}, {command: req.body.command})
  .then(response => {

      res.end()
  })
});

// addResponse
app.post('/addResponse/:id', function(req, res, next) {
  const id = req.params.id ;
  console.log(id)
  Bot.findOneAndUpdate({id: id}, {response: req.body.response})
  .then(response => {

      res.end()
  })
});

//bot
app.get('/bot/:id', function(req, res, next) {
  const id = req.params.id ;
  Bot.findOne({id: id})
  .then(bot => {
    res.json({"response": bot})
    })
});

//bots
app.get('/bots', function(req, res, next) {
  Bot.find()
  .then(bots => {
    res.json({"response": bots})
  })
});


// getCommands
app.get('/getCommands/:id', function(req, res, next) {
  const id = req.params.id ;
  console.log(id)
  Bot.findOne({id: id})
  .then(response => {

      res.json({"response": response.command})
  })
});


// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});
