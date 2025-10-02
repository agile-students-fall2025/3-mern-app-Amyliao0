const express  = require('express');
const morgan   = require('morgan');
const cors     = require('cors');
const path     = require('path');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all static files from /public
// This means GET / will serve back-end/public/index.html
const PUBLIC_DIR = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_DIR));
app.use('/static', express.static(PUBLIC_DIR));

// MongoDB connection
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Models
const { Message } = require('./models/Message');
const { User }    = require('./models/User');

// ✅ About JSON route (assignment requirement)
app.get('/api/about', (req, res) => {
  res.json({
    name: "Amy Liao",
    bio: "I am a computer science student passionate about web development and creating user-friendly applications. I enjoy working with the MERN stack and building projects that solve real-world problems.",
    education: "Currently studying at NYU, pursuing a degree in Computer Science. I have experience with JavaScript, React, Node.js, and MongoDB.",
    interests: "In my free time, I enjoy coding personal projects, learning new technologies, and contributing to open-source software. I'm particularly interested in full-stack development and web scraping.",
    imageUrl: "http://localhost:7002/static/images/profile.JPG",
    contact: {
      email: "yl11020@nyu.edu",
      github: "https://github.com/Amyliao0",
    }
  });
});

// Messages API
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json({ messages, status: 'all good' });
  } catch (err) {
    res.status(400).json({ error: err, status: 'failed to retrieve messages' });
  }
});

app.get('/messages/:messageId', async (req, res) => {
  try {
    const messages = await Message.find({ _id: req.params.messageId });
    res.json({ messages, status: 'all good' });
  } catch (err) {
    res.status(400).json({ error: err, status: 'failed to retrieve message' });
  }
});

app.post('/messages/save', async (req, res) => {
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    });
    res.json({ message, status: 'all good' });
  } catch (err) {
    res.status(400).json({ error: err, status: 'failed to save message' });
  }
});

module.exports = app;
