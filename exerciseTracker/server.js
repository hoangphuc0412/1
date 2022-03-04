const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
require('dotenv').config()

const uri= "mongodb+srv://lieunguyen66688:66688@cluster0.rvorm.mongodb.net/urlshortener?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(mongoose.connection.readyState);

const { Schema } = mongoose;
const exSchema = new Schema({username: String});
const Ex = mongoose.model('Ex', exSchema); 


app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/haha', (req, res) => {
  res.json({message: 'Ham ham de dam'})
});

app.post('/api/users', (req, res) => {
  console.log(req.body);
  // const user = req.body.username;
  const ex = new Ex({ username: req.body.username })
      ex.save((err, data) => {
      res.json({
        username: data.username,
        id: data.id
      })
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
