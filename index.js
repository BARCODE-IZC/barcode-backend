// index.js
const express = require('express');
const connectDB = require('./db');
const Barcode = require('./record');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB


// Middleware
app.use(cors());
app.use(express.json());

// Routes

// GET all barcodes
app.get('/api/barcodes', async (req, res) => {
  await connectDB()
  try {
    const records = await Barcode.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new barcode
app.post('/api/barcodes', async (req, res) => {
   await connectDB()
  try {
    const { productName, sku, price, salePrice, barcodeData } = req.body;
    const newRecord = new Barcode({ productName, sku, price, salePrice, barcodeData });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
});

// DELETE barcode by id
app.delete('/api/barcodes/:id', async (req, res) => {
   await connectDB()
  try {
    const { id } = req.params;
    await Barcode.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
