
const express = require('express');
const bodyParser = require('body-parser');
const {getUsers,createUser} = require('./controlleer')

const app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8082;

// Routes
app.get('/api/fitfuel/user', getUsers)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
