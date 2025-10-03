const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');
const path = require('path');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', mainRoutes);
app.use('/', adminRoutes);
app.get('/', (req, res) => {
    // Renders views/index.ejs and passes data to it
    res.render('index', { pageTitle: 'My Dynamic Page' }); });


// Get
app.get('/booking', (req, res) => {
    res.render('booking', { query: req.query });
});


// Serve
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));