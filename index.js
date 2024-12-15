const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv')


const app = express();
dotenv.config()
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors({
  origin: [process.env.ORIGIN1, process.env.ORIGIN2 , "https://fherzallah.github.io"],
  method: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const publicationsRoutes = require('./routes/publications');
app.use(`/publications`, publicationsRoutes);

// Database Connection and Server Setup
mongoose.connect( process.env.MONGO_URI, {
  dbName: "Dr-Fadi-Herzallah",
})

  .then(() => {
    console.log("Connected to database!");

    app.listen(3000, () => {
      console.log(`Server Is Running On Port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log("Connection Failed");
  });
