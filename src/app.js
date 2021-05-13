const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url - :status'));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`)
});