var express = require('express');
var path = require('path');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var botsRouter = require('./routes/bots');
var botRouter = require('./routes/bot')
const addBotRouter = require('./routes/addBot')
const addCommand = require('./routes/addCommand')
const addResponse = require('./routes/addResponse')
const getCommand = require('./routes/getCommand')
var app = express();



// db
const mongoose = require('mongoose');
const Bot = require('./models/bot');
async function connect() {
  await mongoose.connect('mongodb+srv://shepherd:6322@cluster0.xow6jeh.mongodb.net/?retryWrites=true&w=majority')
  .then(res => {
    console.log('connected')
  })
  
}
 connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bots', botsRouter);
app.use('/bot', botRouter);
app.use('/addBot', addBotRouter);
app.use('/addCommand', addCommand);
app.use('/addResponse', addResponse);
app.use('/getCommand', getCommand);

//



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
