const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://billnt0711:Kronos123!@cluster0.bjc4iyw.mongodb.net/BookList";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// import routes
const bookRouter = require('./routes/books');

app.use(bookRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
