const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session setup for chat memory
app.use(session({
  secret: 'mychatbotsecret',
  resave: false,
  saveUninitialized: true
}));

// Routes
const chatbotRoutes = require('./routes/chatbot');
app.use('/chat', chatbotRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('index'); // simple form to submit a URL
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
