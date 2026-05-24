const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'ShopMate API', version: '1.0.0' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log('ShopMate API running on port ' + process.env.PORT);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));