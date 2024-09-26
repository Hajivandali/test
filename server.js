// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Class = require('./models/classModel'); // مدل کلاس‌ها

// اتصال به MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// مسیر روت برای بررسی
app.get('/', (req, res) => {
  res.send('Server is running');
});

// API برای جستجو
app.get('/search', async (req, res) => {
  const query = req.query.query;
  console.log('Search query:', query);
  try {
    const result = await Class.find({
      $or: [
        { professor: { $regex: query, $options: 'i' } },
        { course: { $regex: query, $options: 'i' } },
        { building: { $regex: query, $options: 'i' } }
      ]
    });

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json({ message: 'کلاسی یافت نشد' });
    }
  } catch (err) {
    res.status(500).json({ error: 'خطا در ارتباط با سرور' });
  }
});

// راه‌اندازی سرور
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
