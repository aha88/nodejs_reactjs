// app.js or index.js
require('dotenv').config();  

const express = require('express');
const cors = require('cors');
const port = process.env.APP_PORT || 3000;  
const bodyParser = require('body-parser');  
const myRoutes = require('./routes/myRoutes');
const app = express();
const knex = require('knex');
const knexConfig = require('./knexfile');

// Import and use routes
app.use(bodyParser.json());

//routes
app.use('/',myRoutes);

// cors
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
