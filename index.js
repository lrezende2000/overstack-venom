require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./src/routes');
const app = express();

const PORT = process.env.PORT || 8080;

require('./database');

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url - :status'));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});