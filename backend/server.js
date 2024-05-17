const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();

const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors')
app.use(cors())

//routes

const mangaRoutes = require('./routes/mangaRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/manga', mangaRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/users', userRoutes);

const mongoose = require('mongoose');

// connect to the database
let MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("Database is connected.");

        const PORT = process.env.PORT || 3000; 

        app.listen(PORT, () => {
            console.log("Your server is running on PORT " + PORT);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

app.get('/', (req, res) => {
    res.send("Your app is running!");
});
