// SETUP Dependencies
const express = require('express'),
      app     = express();

const mongoose = require('mongoose'),
      cors     = require('cors');

// Linking environment variables
require('dotenv').config()

// Connect to Mongo Database
const LOCAL_DB = process.env.DB_LOCAL,
      ATLAS_DB = process.env.DB_ATLAS;

mongoose.connect(ATLAS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB database suucessfully connected!"))

app.use(cors());
app.use(express.json()); //Used to parse JSON bodies

// ROUTES
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

// Connect to SERVER
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});