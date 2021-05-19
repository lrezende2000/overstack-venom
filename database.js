require('dotenv').config();
const mongoose = require('mongoose');

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xxc0e.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
const options = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

mongoose.connect(URI, options)
  .then(() => console.log('DB is up'))
  .catch((err) => console.log(err));;
