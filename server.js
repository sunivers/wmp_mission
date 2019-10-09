const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

app.use(express.json());

app.get('/', indexRouter);
app.use('/api', apiRouter);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
