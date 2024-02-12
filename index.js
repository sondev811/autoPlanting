const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mongoose.connection;

connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

connection.once('open', () => {
  console.log('Connected to database');
});

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
      console.error('MongoDB connection error during initialization:', error);
    }
};

connectDB();

const userSchema = new mongoose.Schema({
  macIP: String,
  token: String,
});

const User = mongoose.model('users', userSchema);

app.use(bodyParser.json());

app.post('/getInfo', async (req, res) => {
  const { macIP, token } = req.body;

  try {
    const user = await User.findOne({ macIP, token });
    if (!user) {
      res.status(401).json({ success: false });
      return
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});