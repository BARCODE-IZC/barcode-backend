// record.js
const mongoose = require('mongoose');

const barcodeSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: String, required: true },
  salePrice: { type: String},
  barcodeData: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Add virtual "id" field
barcodeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are serialized
barcodeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => { delete ret._id; }
});

module.exports = mongoose.model('Barcode', barcodeSchema);
