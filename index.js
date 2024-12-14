const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:5173"],
  method: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const publicationsRoutes = require('./routes/publications');
app.use(`/publications`, publicationsRoutes);

// Database Connection and Server Setup
mongoose.connect('mongodb+srv://ahmadbadran:thezone51@first-mongo.5kvh3pa.mongodb.net/?retryWrites=true&w=majority', {
  dbName: "Dr-Fadi-Herzallah",
})

  .then(() => {
    console.log("Connected to database!");

    app.listen(3000, () => {
      console.log("Server Is Running On Port 3000");
    });
  })
  .catch((error) => {
    console.log("Connection Failed");
  });
