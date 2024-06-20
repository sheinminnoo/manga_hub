const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cron = require('node-cron');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const sendEmail = require('./helpers/sendEmail');

// Load environment variables
dotenv.config();

// Middleware setup
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend application's URL
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

// Nodemailer example route
app.get('/send-email', async (req, res) => {
    try {
        await sendEmail({
            view: 'email',
            data: { name: "AungAung" },
            from: "mgmg@gmail.com",
            to: "aungaung@gmail.com",
            subject: "Hello AungAung"
        });
        return res.send('Email has been sent.');
    } catch (e) {
        return res.status(500).json({ message: e.message, status: 500 });
    }
});

// Import routes
const mangaRoutes = require('./routes/mangaRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const contactRoutes = require('./routes/contactRoutes');
// Use routes
app.use('/api/manga', AuthMiddleware, mangaRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes); // Add comment routes
app.use('/api/contact',contactRoutes);
// Database connection
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("Database is connected.");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log("Server is running on PORT " + PORT);
            // Uncomment and adjust the cron job as needed
            // cron.schedule('* * * * *', () => {
            // console.log('Running a task every minute');
            // });
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

// Test routes
app.get('/', (req, res) => {
    res.send("Your app is running!");
});

app.get('/set-cookie', (req, res) => {
    res.cookie('name', 'SHEIN');
    res.cookie('important-cookie', '2004142', { httpOnly: true });
    return res.json({ msg: "Set Cookie" });
});

app.get('/get-cookie', (req, res) => {
    let cookies = req.cookies;
    return res.json(cookies);
});
